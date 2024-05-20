import express from 'express';
import cors from 'cors';
import { YouTube } from './youtube.js';
import { Whisper } from './whisper.js';
import { Bing } from './bing.js';
import { Users } from './users.js';
import { Clients, ClientSettings } from './clients.js';
const app = express();
const port = 3000;

const userFile = 'users.json';
const clientFile = 'clients.json';

// Middleware to parse JSON bodies
app.use(express.json());

// Allow requests from the frontend on a different port (e.g., http://localhost:3000)
app.use(cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

// Hello World!
app.get('/', (req, res) => {
    res.send('Hello World!');
})

// WIP
// API to update client settings from client settings page
app.post('/client/updateSettings', (req, res) => {
    /*
    export interface ClientSettings {
    youtubeAccessSectionValue: null | string,
    useSameDescriptionSectionValue: null | boolean,
    useSameTagsSectionValue: null | boolean,
    description: null | string,
    tags: null | string,
    monthlyPlanInput: null | boolean,
    numLongFormatInput: null | number,
    numShortsInput: null | number,
    levelOfPostProcessing: null | string,
    estimatedPriceInput: null | string
    */
    const settings:ClientSettings = req.body.settings;
    const channelId:string = req.body.channelId;

    if(settings && channelId){
        let clients = new Clients(clientFile);
        clients.updateClientSettings(channelId, settings)
    } else {
        res.send('Invalid request body. Please send client settings and channelId');
    }
});

// WIP
// Organize step after video has been added
// This transcribes the video and adds it to the google doc
// Translates video and adds it to google doc
// updates trello ticket
// adds all video files to dropbox (transcription and tranlsation test files, mp4, mp3)
app.post('/client/oragnizeVideo', async (req,res) => {
    const channelId = req.body.channelId;
    const videoId = req.body.videoId;

    if(channelId){
        let clients = new Clients(clientFile);

        let videos = JSON.stringify(await clients.getClientVideos(channelId));
        console.log(videos);
        await clients.downloadClientVideo(channelId,videoId);

        res.send(videos);

    } else {
        res.send('Invalid request body.');
    }
})

// WIP
// When user adds video from first screen to be shown on second video screen
// Needs to also generate:
// - the dropbox folder path for specific video
// - The trello ticket
// - the empty google doc (for transcription)
app.post('/client/addVideo', async (req,res) => {
    const channelId = req.body.channelId;
    const name = req.body.name;
    const url = req.body.url;
    const id = req.body.id;

    let clients = new Clients(clientFile);
    if(channelId && name && url && id){
        await clients.addClientVideo(channelId,{
            name:name,
            id:id,
            url:url
        })
        res.send('video added.');
    } else {
        res.send('Invalid request body.')
    }
})

/*
* YouTube video list
* apiKey & channelId are required
* Send up to 50 videos at a time to front end. 
* Also sends next and prev page tokens to navigate back or forwards 50 videos
*/
app.post('/client/getVideoPage', async (req,res) => {
    // const apiKey = req.body.apiKey;
    const apiKey = 'AIzaSyCCWblK-SdjvIRO6xBSQHHoKyLCxwJcnEU'
    const channelId = req.body.channelId;
    const pageToken = req.body.pageToken;
    
    if(/* apiKey && */channelId){
        let youtube = new YouTube();
        let result = await youtube.getVideoList(apiKey,channelId,pageToken);
        res.send(JSON.stringify(result));
    } else {
        // res.send('Invalid request body: Please send apiKey and channelId.');
        res.send('Invalid request body: Please send channelId.');
    }

})


/*
* Remove client api
* Requies clientId
* Removes client from server and from JSON file.
*/
app.post('/client/remove', async (req, res) => {
    const channelId = req.body.channelId;
    if(channelId){
        let clients = new Clients(clientFile);
        clients.removeClient(channelId);
        await clients.writeClientsToFile();
        res.send('client removed');
    } else {
        res.send('Invalid request body: Please send clientId.')
    }
})

/*
* Get all clients API
* Used to send all clients to front end when client page loads or the data changes (add client or remove client)
*/
app.post('/client/getAll', async (req, res) => {
    let clients = new Clients(clientFile);
    res.send(JSON.stringify(clients.clients));
})

/*
* Add client API
* Requires url (YouTube channel URL)
* Adds client to server and to JSON file based on the youtube url recieved
*/
app.post('/client/add', async (req, res) => {
    const url = req.body.url;
    // const apiKey = req.body.apiKey;
    const apiKey = 'AIzaSyCCWblK-SdjvIRO6xBSQHHoKyLCxwJcnEU'
    if(url /* && apiKey */){
        let youtube = new YouTube();
        let clients = new Clients(clientFile);
        if(url.includes('/channel/')){
            let channelId = getChannelIdFromUrl(url);
            let result = await youtube.getChannelFromId(apiKey, channelId);
            if(result[0]){
                await clients.addClient({
                    channelUrl: url,
                    channelName: result[0].snippet.title,
                    channelId: result[0].id,
                    description: result[0].snippet.description,
                    clientSettings: null,
                    videos:null
                })
                await clients.writeClientsToFile();
                res.send('Client created: ' + JSON.stringify(result));
            } else {
                res.send('Channel not found.')
            }
            res.send(JSON.stringify(result));
        } else {
            let channel = getChannelUsernameFromUrl(url);
            let channelId = await youtube.getChannelFromUsername(apiKey, channel);
            let result = await youtube.getChannelFromId(apiKey, channelId);
            if(result[0]){
                await clients.addClient({
                    channelUrl: url,
                    channelName: result[0].snippet.title,
                    channelId: result[0].id,
                    description: result[0].snippet.description,
                    clientSettings: null,
                    videos:null
                })
                await clients.writeClientsToFile();
                res.send('Client created: ' + JSON.stringify(result));
            } else {
                res.send('Channel not found.')
            }

        }
    } else {
        res.send('Invalid request body: Please send url.')
    }
})

/*
* Login API
* Requires email & password
* Checks all user emails for match, then verifies passwords match.
*/
app.post('/user/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if(email && password){
        let users = new Users(userFile);
        let result = users.authenticate({username:email,password:password});
        res.send(result);
    } else {
        res.send('Invalid request body: Please send email and password');
    }
})

/*
* Create User API
* Requires email & password
* Creates new user in server and JSON file based on information recieved
*/
app.post('/user/createUser', (req,res) => {
    const username = req.body.email;
    const password = req.body.password;
    if(username && password){
        let users = new Users(userFile);
        let result = users.createNewUser({username:username,password:password});
        users.writeUsersToFile();
        res.send(result);
    } else {
        res.send('Invalid request body: Please send email and password');
    }
})

/*
* Update User API
* Requires oldEmail, oldPassword, email & password
* Updates a users information based on new email and password recieved. old email and password must match.
* Updates server and JSON file
*/
app.post('/user/updateUser', (req, res) => {
    const oldUsername = req.body.oldEmail;
    const oldPassword = req.body.oldPassword;
    const username = req.body.email;
    const password = req.body.password;
    if(oldUsername && oldPassword && username && password){
        let users = new Users(userFile);
        let result = users.updateUser({username:oldUsername, password:oldPassword},{username:username,password:password});
        users.writeUsersToFile();
        res.send(result);
    } else {
        res.send('Invalid request body: Please send email and password');
    }
})

/*
* Remove User API
* Requires email & password
* Removes user from server and JSON file
*/
app.post('/user/removeUser', (req, res) => {
    const username = req.body.email;
    const password = req.body.password;
    if(username && password){
        let users = new Users(userFile);
        let result = users.removeUser({username:username, password:password});
        if(result){
            res.send('User removed.')
            users.writeUsersToFile();
        } else {
            res.send('User not found.')
        }
    } else {
        res.send('Invalid request body: Please send email and password');
    }
})

app.listen(port, () => {
    console.log(`lang2views listening on port ${port}`)
})

function getChannelUsernameFromUrl(url) {
    const match = url.match(/\/@([^\/?#]+)/);
    return match ? match[1] : null;
}

function getChannelIdFromUrl(url) {
    const match = url.match(/(?:\/channel\/|\/c\/|\/user\/|\/@)([A-Za-z0-9_-]{1,})/);
    return match ? match[1] : null;
}

// // YouTube download API
// app.post('/youtube/download', async (req,res) => {
//     let youtube = new YouTube();
//     const url = req.body.url;
//     const videoName = req.body.videoName;
//     if(url && videoName){
//         await youtube.downloadVideo(url, videoName);
//         await youtube.downloadAudio(url, videoName, async (err) => {
//             if(!err){
//                 res.send('Download Complete')
//             } else {
//                 console.log(err);
//             }
//         });
//     } else {
//         res.send('Invalid request body: Please send url and vidoeName')
//     }
// })

// // Whisper transcription API
// app.post('/whisper/transcribe', async (req,res) => {
//     // Need to pass secret key for Whisper API usage
//     const filePath = req.body.filePath;
//     const whisperKey = req.body.whisperKey;
//     if(filePath && whisperKey){
//         const decodedKey = Buffer.from(whisperKey, 'base64').toString('utf-8');
//         let whisper = new Whisper(decodedKey);
//         try{
//             let response = await whisper.transcribeAudio(filePath);
//             res.send(response);
//         } catch(e){
//             res.send(e);
//         }
//     } else {
//         res.send('Invalid request body: Please send filePath and whisperKey')
//     }
// })

// // Bing tranlation API
// app.post('/bing/translate', async (req,res) => {
//     let bing = new Bing();
//     const text = req.body.translateText;
//     if(text){
//         let response = await bing.translateText(text);
//         res.send(response);
//     } else {
//         res.send("Invalid request body: Please send translateText")
//     }
// })