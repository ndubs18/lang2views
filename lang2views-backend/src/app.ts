import express from 'express';
import cors from 'cors';
import { YouTube } from './youtube.js'
import { Whisper } from './whisper.js';
import { Bing } from './bing.js';
import { Trello, CreateCardRequest, UpdateCardRequest } from './trello.js';
import { DaVinci, VideoAndAudioNames } from './davinci.js';
import { Users } from './users.js';
import { Clients, ClientSettings } from './clients.js';
import fs from 'fs';
import { DropboxConnection } from './dropboxConnection.js'
import { GoogleDocs } from './googledoc.js'
import dotenv from 'dotenv'
import multer from 'multer';
import { Readable } from 'stream'

import { Request } from 'express';

interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}

declare global {
    namespace Express {
        interface Request {
            file: MulterFile;
        }
    }
}

const upload = multer();

dotenv.config();

const app = express();
const port = 3000;

const userFile = 'users.json';
export const clientFile = 'clients.json';

const dropbox = new DropboxConnection()
const authenticatedYoutube = new YouTube();
const trello = new Trello(process.env.TRELLO_API_KEY, process.env.TRELLO_TOKEN);

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

/*
* Add client API
* Requires url (YouTube channel URL)
* Adds client to server and to JSON file based on the youtube url recieved
*/
app.post('/client/add', async (req, res) => {
    logEndpointCalled(req.url);
    const url = req.body.url;
    const apiKey = process.env.GOOGLE_KEY;
    if (url) {
        if (await dropbox.isAuthenticated()) {
            let youtube = new YouTube();
            let clients = new Clients(clientFile);
            let channelId = "";
            if (url.includes('/channel/')) {
                channelId = getChannelIdFromUrl(url);
            } else {
                let channel = getChannelUsernameFromUrl(url);
                channelId = await youtube.getChannelFromUsername(apiKey, channel);
            }

            let result = await youtube.getChannelFromId(apiKey, channelId);
            if (result[0]) {
                await clients.addClient({
                    channelUrl: url,
                    channelName: result[0].snippet.title,
                    channelId: result[0].id,
                    description: result[0].snippet.description,
                    clientSettings: null,
                    videos: null
                })
                await clients.writeClientsToFile();

                let dropboxUrl = await dropbox.createClientFolders(channelId);
                res.send({
                    dropboxUrl: dropboxUrl,
                    message: 'Client created: ' + JSON.stringify(result)
                });
            } else {
                res.send({ message: 'Channel not found.' })
            }
        } else {
            res.send({ message: 'Please authenticate Dropbox first.' });
        }
    } else {
        res.send({ message: 'Invalid request body: Please send url.' })
    }
})

/*
* Remove client api
* Requies clientId
* Removes client from server and from JSON file.
*/
app.post('/client/remove', async (req, res) => {
    logEndpointCalled(req.url);
    const channelId = req.body.channelId;
    if (channelId) {
        let clients = new Clients(clientFile);
        clients.removeClient(channelId);
        await clients.writeClientsToFile();
        res.send({ message: 'Client removed.' });
    } else {
        res.send({ message: 'Invalid request body: Please send clientId.' })
    }
})

/*
* Get specific client API
* Used to send single client to front end
*/
app.post('/client/get', async (req, res) => {
    logEndpointCalled(req.url);
    const channelId = req.body.channelId;
    if (channelId) {
        let clients = new Clients(clientFile);
        res.send(JSON.stringify(clients.getClient(channelId)));
    } else {
        res.send({ message: 'Invalid request body: Please send clientId.' })
    }
})

/*
* Get all clients API
* Used to send all clients to front end when client page loads or the data changes (add client or remove client)
*/
app.get('/client/getAll', async (req, res) => {
    logEndpointCalled(req.url);
    let clients = new Clients(clientFile);
    let clientsWithFinishedVideoNumbers = [];
    for (let i = 0; i < clients.clients.length; ++i) {
        let finishedVideos = clients.getFinishedVideoNumbers(clients.clients[i].channelId);
        clientsWithFinishedVideoNumbers.push(Object.assign(finishedVideos, clients.clients[i]));
    }
        
    res.send(JSON.stringify(clientsWithFinishedVideoNumbers));
})

/*
* Get client settings
*/
app.get("/client/getSettings", (req, res) => {
    logEndpointCalled(req.url);
    const channelId: string = req.query.channelId as string;
  
    if (channelId) {
        let clients = new Clients(clientFile);
        const settings: ClientSettings | null =
            clients.getClientSettings(channelId);
    
        if (settings) {
            res.json(settings);
        } else {
            res.status(404).send("Client settings not found for the given channelId");
        }
    } else {
        res.status(400).send("Invalid request. Please provide a channelId");
    }
});

// WIP
// API to update client settings from client settings page
app.post('/client/updateSettings', async (req, res) => {
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
    logEndpointCalled(req.url);
    const settings: ClientSettings = req.body.settings;
    const channelId: string = req.body.channelId;

    if (settings && channelId) {
        let clients = new Clients(clientFile);
        let result = clients.updateClientSettings(channelId, settings)
        res.send({ message: result })
        await clients.writeClientsToFile();
    } else {
        res.send({ message: 'Invalid request body. Please send client settings and channelId' });
    }
});

// WIP
// When user adds video from first screen to be shown on second video screen
// Needs to also generate:
// - the dropbox folder path for specific video
// - The trello ticket
// - the empty google doc (for transcription)
app.post('/client/addVideo', async (req, res) => {
    logEndpointCalled(req.url);
    const channelId = req.body.channelId;
    let video = req.body.video
    /*
    * Video {
        name:string,
        url:string,
        id:string,
        thumbnail:any,
        duration:any,
        format:string
    }
    TRELLO TICKET
    params: {
    key: this.key,
    token: this.token,
    idList: cardData.idList,
    name: cardData.name,
    desc: cardData.desc,
    pos: cardData.pos,
    due: cardData.due,
    labels: cardData.labels
    }
    */

    let clients = new Clients(clientFile);
    if (channelId && video) {
        if (clients.getClientVideo(channelId, video.id) == null) {
            let client = clients.getClient(channelId);
            if (client.clientSettings && client.clientSettings.trelloListId) {
                let clientTrelloListId = client.clientSettings.trelloListId
                if (video.name && video.url && video.id && video.thumbnail && video.duration && video.format) {
                    if (await dropbox.isAuthenticated()) {
                        const docs = new GoogleDocs();

                        const cardData: Omit<CreateCardRequest, 'key' | 'token'> = {
                            idList: clientTrelloListId,
                            name: video.name,
                            pos: 'bottom',
                        };

                        let videoNumber = await clients.addClientVideo(channelId, video)
                        let dropboxUrl = await dropbox.createVideoFolder(channelId, video, videoNumber);
                        let documentId = await docs.createGoogleDoc(`${videoNumber}. ${video.name} - Script`)
                        const card = await trello.createCard(cardData/*, getCustomFields(video)*/);

                        video.number = videoNumber;
                        video.trelloCard = card;
                        video.dropboxURL = dropboxUrl;
                        video.documentId = documentId
                        clients.updateClientVideo(channelId, video)
                        res.send({
                            trelloCard: card,
                            dropboxUrl: dropboxUrl,
                            message: "Video added."
                        });
                    } else {
                        res.send({ message: 'Please authenticate Dropbox first.' });
                    }
                } else {
                    res.send({ message: 'Invalid request body. Video format invalid.' });
                }
            } else {
                res.send({ message: 'No Trello list ID found for this client. Make sure to set a Trello list ID in this client\'s settings.' });
            }
        } else {
            res.send({ message: 'Video is already added.' })
        }
    } else {
        res.send({ message: 'Invalid request body.' });
    }
})

/*
* Remove Video API
* Requires channelId and videoId
* removes video from client and cleans up any remaining files on server
*/
app.post('/client/removeVideo', (req, res) => {
    logEndpointCalled(req.url);
    const channelId = req.body.channelId;
    const videoId = req.body.videoId;

    if(channelId && videoId){
        let clients = new Clients(clientFile);
        clients.removeClientVideo(channelId,videoId);
        res.send({ message: 'Video removed.' });
    } else {
        res.send({ message: 'Invalid request body. Please send channelId and videoId' });
    }
});

/*
* Get videos that have been added for a client
*/
app.post('/client/getAddedVideos', async (req, res) => {
    logEndpointCalled(req.url);
    const channelId = req.body.channelId;
    if (channelId) {
        const result = new Clients(clientFile).getClientVideos(channelId);
        res.send(JSON.stringify(result));
    } else {
        res.send({ message: 'Invalid request body: Please send channelId.' });
    }

})

/*
* YouTube video list
* apiKey & channelId are required
* Send up to 50 videos at a time to front end. 
* Also sends next and prev page tokens to navigate back or forwards 50 videos
*/
app.post('/client/getVideoPage', async (req, res) => {
    logEndpointCalled(req.url);
    const apiKey = process.env.GOOGLE_KEY;
    const channelId = req.body.channelId;
    const pageToken = req.body.pageToken;

    if (channelId) {
        let youtube = new YouTube();
        let result = await youtube.getVideoList(apiKey, channelId, pageToken);
        res.send(JSON.stringify(result));
    } else {
        // res.send('Invalid request body: Please send apiKey and channelId.');
        res.send({ message: 'Invalid request body: Please send channelId.' });
    }

})

/*
* Client upload API
* Requires channelId and videoId
* checks for authorization then trys to upload desired video to authorized channel
*/
app.post('/client/upload',upload.single('file'), async (req, res) => {
    logEndpointCalled(req.url);
    const channelId = req.body.channelId;
    const videoId = req.body.videoId;
    let clients = new Clients(clientFile);
    let file = req.file;

    if (channelId && videoId && file && file.buffer) {
        if (file) {
            if (authenticatedYoutube.checkAuth()) {
                console.log("Starting upload.")
                await authenticatedYoutube.upload(Readable.from(file.buffer), (err, response) => {
                    if (err) {
                        res.send({ message: 'Error uploading video', error: err });
                    } else {
                        console.log(`Video ${videoId} uploaded! Marking as complete.`)
                        clients.markClientVideoComplete(channelId, videoId);
                        res.send({ message: 'Video uploaded!', youtubeUrl: `https://www.youtube.com/watch?v=${response.data.id}` });
                    }
                })
            } else {
                res.send({ message: 'Please authorize the youtube channel first.' });
            }
        } else {
            res.status(400).send({ message: 'No file uploaded.' });
        }
    } else {
        res.send({ message: 'Invalid request body.' })
    }
});

// Export FCPXML timeline file for editing in DaVinci
app.post('/client/postProcess', async (req,res) => {
    logEndpointCalled(req.url);
    const channelId = req.body.channelId;
    const videoId = req.body.videoId;

    if(channelId && videoId) {
        if (await dropbox.isAuthenticated()) {
            let clients = new Clients(clientFile);
            let davinci = new DaVinci();

            let video = await clients.getClientVideo(channelId, videoId);

            const videoContentFilePath = `./clients/${channelId}/${video.id}`;
            const videoNameInFilePath = video.name.replaceAll(' ', '_');

            // For DaVinci
            // When you import the .fcpxml file, it will ask for the directory of the files.
            // This needs to be done manually by the employee.
            // The file names here SHOULD be the same as the ones that the employees would download from Dropbox
            const fileNames: VideoAndAudioNames = {
                videoName: `${videoNameInFilePath}.mp4`,
                originalAudioName: `${videoNameInFilePath}.mp3`
            };

            // For DaVinci
            // Second argument is the output path for the XML
            // The second argument might need to be changed? I'm not sure where it needs to be saved right now
            davinci.exportXMLToFile(
                davinci.generateTimelineXML(fileNames),
                videoContentFilePath + '/davinciTimeline.fcpxml'
            );

            const dropboxPath = dropbox.getPathFromVideoFolderUrl(video.dropboxURL);
            let response = await dropbox.uploadFile(dropboxPath + '/davinciTimeline.fcpxml',
                videoContentFilePath + '/davinciTimeline.fcpxml',
                fs.createReadStream(videoContentFilePath + `/davinciTimeline.fcpxml`)
            );

            console.log("Files uploaded to Dropbox.")

            res.send({ dropboxUrl: response, message: 'davinciTimeline.fcpxml uploaded to Dropbox.' });
        } else {
            res.send({ message: 'Please authenticate Dropbox first.' });
        }
    } else {
        res.send({ message: 'Invalid request body. Please send channelId and videoId.' });
    }
})

// WIP
// Organize step after video has been added
// This transcribes the video and adds it to the google doc
// Translates video and adds it to google doc
// updates trello ticket
// adds all video files to dropbox (transcription and tranlsation text files, mp4, mp3)
app.post('/client/organizeVideo', async (req, res) => {
    logEndpointCalled(req.url);
    const channelId = req.body.channelId;
    const videoId = req.body.videoId;
    const lang = req.body.lang;

    if(channelId && videoId && lang){
        if (await dropbox.isAuthenticated()) {
            let clients = new Clients(clientFile);
            let whisper = new Whisper();
            let youtube = new YouTube();

            let filePath = await clients.getClientVideoPath(channelId, videoId) + '.mp3';
            let video = await clients.getClientVideo(channelId, videoId);
            console.log("Starting video download.")
            await clients.downloadClientVideo(channelId, videoId);
            console.log("Video downloaded.");

            let transcriptions = await whisper.transcribeAudio(filePath, video.name.trim().replaceAll(' ', '_'));
            console.log("Audio transcribed.");
            let translation = [];
            for(let transcription of transcriptions){
                translation.push(await youtube.translate(transcription, lang))
            }
            console.log("Transcription translated.");

            const videoContentFilePath = `./clients/${channelId}/${video.id}`;
            await fs.writeFileSync(videoContentFilePath + '/transcription.txt', transcriptions.join('\n'));
            await fs.writeFileSync(videoContentFilePath + '/translation.txt', translation.join('\n'));

            const docs = new GoogleDocs();
            docs.writeToGoogleDoc(video.documentId, translation.join('\n'));
            console.log("Docs script written to.");

            const videoNameInFilePath = video.name.replaceAll(' ', '_');

            const dropboxPath = dropbox.getPathFromVideoFolderUrl(video.dropboxURL);
            await dropbox.uploadFile(dropboxPath + '/transcription.txt', videoContentFilePath + '/transcription.txt', transcriptions.join('\n'));
            await dropbox.uploadFile(dropboxPath + '/translation.txt', videoContentFilePath + '/translation.txt', translation.join('\n'));
            await dropbox.uploadFile(
                dropboxPath + `/${videoNameInFilePath}.mp3`,
                videoContentFilePath + `/${videoNameInFilePath}.mp3`,
                fs.createReadStream(videoContentFilePath + `/${videoNameInFilePath}.mp3`
                ));
            await dropbox.uploadFile(
                dropboxPath + `/${videoNameInFilePath}.mp4`,
                videoContentFilePath + `/${videoNameInFilePath}.mp4`,
                fs.createReadStream(videoContentFilePath + `/${videoNameInFilePath}.mp4`
                ));
            await dropbox.uploadFile(
                dropboxPath + `/${videoNameInFilePath}_merged.mp4`,
                videoContentFilePath + `/${videoNameInFilePath}_merged.mp4`,
                fs.createReadStream(videoContentFilePath + `/${videoNameInFilePath}_merged.mp4`
                ));
            console.log("Files uploaded to Dropbox.")

            res.send(JSON.stringify({
                dropboxUrl: video.dropboxURL,
                scriptUrl: `https://docs.google.com/document/d/${video.documentId}/edit`,
                trelloUrl: video.trelloCard,
            }));
        } else {
            res.send({ message: 'Please authenticate Dropbox first.' });
        }
    } else {
        res.send({ message: 'Invalid request body. Please send channelId, videoId, and lang (desired translation language).' });
    }
})

/*
* Dropbox login endpoint
* Authorizes creation of client/video folders to the lang2views DB account
*/
app.get('/dropbox/auth', async (req, res) => {
    logEndpointCalled(req.url);
    const authUrl = await dropbox.getAuthUrl();
    res.send({ authUrl: authUrl });
});

/*
* Dropbox authorization callback
* After user logs into company account it redirects back here to save the token
* NOT USED BY US
*/
app.get('/dropbox/authsuccess', (req, res) => {
    const code = req.query.code as string;
    dropbox.handleTokenFromCode(code)
    
    res.send('Authentication successful! You can now close this tab.');
});

// Dropbox API test (client folder creation)
app.post('/dropbox/createClientFolders', async (req, res) => {
    const channelId = req.body.channelId;

    if (channelId) {

        let result = await dropbox.createClientFolders(channelId);

        res.send({ url: result });
    } else {
        res.send({ message: 'Invalid request body.' })
    }
});

//Trello API test (Create a new card)
app.post('/trello/create', async (req, res) => {
    const id = '66592779f0dc5550393c9fa4'

    const cardData: Omit<CreateCardRequest, 'key' | 'token'> = {
        idList: id,
        name: "test",
        pos: 'bottom',
    };

    const card = await trello.createCard(cardData/*, getCustomFields(video)*/);

    res.send(card)
});

// Trello API test (Update an existing card)
app.put('/trello/update', async (req, res) => {
    const cardData: Omit<UpdateCardRequest, 'key' | 'token'> = req.body;
    if (!cardData.id) {
        return res.status(400).json({ error: 'id is required' });
    }
    try {
        const card = await trello.updateCard(cardData);
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update card' });
    }
});

/*
* YouTube login endpoint
* Authorizes uploading to client's localized youtube channel
*/
app.get('/youtube/auth', (req, res) => {
    logEndpointCalled(req.url);
    const oauth = authenticatedYoutube.loadAuthClient();
    const authUrl = oauth.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/youtube.upload'],
    });
    res.send({ authUrl: authUrl });
});

/*
* YouTube authorization callback
* After user logs in with client channel it redirects back here to save the token
* NOT USED BY US
*/
app.get('/youtube/oauth2callback', (req, res) => {
    logEndpointCalled(req.url);
    const code = req.query.code;
    const oauth = authenticatedYoutube.loadAuthClient();
    oauth.getToken(code, (err, token) => {
        if (err) return res.status(400).send('Error retrieving access token');
        oauth.setCredentials(token);
        process.env.CLIENT_TOKEN = token;
        res.send('Authentication successful! You can now close this tab.');
    });
});

/*
* Login API
* Requires email & password
* Checks all user emails for match, then verifies passwords match.
*/
app.post('/user/login', (req, res) => {
    logEndpointCalled(req.url);
    const email = req.body.email;
    const password = req.body.password;
    if(email && password){
        let users = new Users(userFile);
        let result = users.authenticate({username:email,password:password});
        res.send(result);
    } else {
        res.send({ message: 'Invalid request body: Please send email and password' });
    }
})

/*
* Create User API
* Requires email & password
* Creates new user in server and JSON file based on information recieved
*/
app.post('/user/createUser', (req,res) => {
    logEndpointCalled(req.url);
    const username = req.body.email;
    const password = req.body.password;
    if(username && password){
        let users = new Users(userFile);
        let result = users.createNewUser({username:username,password:password});
        users.writeUsersToFile();
        res.send(result);
    } else {
        res.send({ message: 'Invalid request body: Please send email and password' });
    }
})

/*
* Update User API
* Requires oldEmail, oldPassword, email & password
* Updates a users information based on new email and password recieved. old email and password must match.
* Updates server and JSON file
*/
app.post('/user/updateUser', (req, res) => {
    logEndpointCalled(req.url);
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
        res.send({ message: 'Invalid request body: Please send email and password' });
    }
})

/*
* Remove User API
* Requires email & password
* Removes user from server and JSON file
*/
app.post('/user/removeUser', (req, res) => {
    logEndpointCalled(req.url);
    const username = req.body.email;
    const password = req.body.password;
    if(username && password){
        let users = new Users(userFile);
        let result = users.removeUser({username:username, password:password});
        if(result){
            res.send({ message: 'User removed.' })
            users.writeUsersToFile();
        } else {
            res.send({ message: 'User not found.' })
        }
    } else {
        res.send({ message: 'Invalid request body: Please send email and password' });
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

function getFormattedDuration(duration: any) {
    return `${duration.days == 0 ? '' : duration.days + ':'}`
         + `${duration.hours == 0 && duration.days == 0 ? '' : duration.hours + ':'}`
         + `${duration.minutes + ':'}`
         + `${duration.seconds}`;
}

function logEndpointCalled(endpoint) {
    const now = new Date();
    console.log(`Endpoint ${endpoint} called at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.`);
}

/*
function getCustomFields(video: any) {
    return {
        customFields: [
            {
                idCustomField: process.env.VIDEO_LENGTH_ID,
                value: { text: getFormattedDuration(video.duration) }
            },
            {
                idCustomField: process.env.ORIGINAL_VIDEO_ID,
                value: { text: video.url }
            },
            {
                idCustomField: process.env.SCRIPT_IN_SPANISH_ID,
                value: { text: getDocumentLink(video.documentId) }
            }
        ]
    }

}
*/


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
