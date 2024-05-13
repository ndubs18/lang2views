import express from 'express';
import { YouTube } from './youtube.js';
import { Whisper } from './whisper.js';
import { Bing } from './bing.js';
import { Users } from './users.js'
import cors from "cors"
const app = express();
const port = 3000;

const userFile = 'users.json';

// Middleware to parse JSON bodies
app.use(express.json());

// Front end is served by vite? -- we may need to revisit the inital server response.
app.get('/', (req, res) => {
    // let filePath = path.resolve('.', 'lang2views-frontend', 'index.html')
    // res.sendFile(filePath);
    res.send('Hello World!');
})

// YouTube download API
app.post('/youtube/download', async (req,res) => {
    let youtube = new YouTube();
    const url = req.body.url;
    const videoName = req.body.videoName;
    if(url && videoName){
        await youtube.downloadVideo(url, videoName);
        await youtube.downloadAudio(url, videoName, async (err) => {
            if(!err){
                res.send('Download Complete')
            } else {
                console.log(err);
            }
        });
    } else {
        res.send('Invalid request body: Please send url and vidoeName')
    }
})

// YouTube upload API
app.get('/youtube/upload/*', (req,res) => {

})

// Whisper transcription API
app.post('/whisper/transcribe', async (req,res) => {
    // Need to pass secret key for Whisper API usage
    const filePath = req.body.filePath;
    const whisperKey = req.body.whisperKey;
    if(filePath && whisperKey){
        const decodedKey = Buffer.from(whisperKey, 'base64').toString('utf-8');
        let whisper = new Whisper(decodedKey);
        try{
            let response = await whisper.transcribeAudio(filePath);
            res.send(response);
        } catch(e){
            res.send(e);
        }
    } else {
        res.send('Invalid request body: Please send filePath and whisperKey')
    }
})

// Bing tranlation API
app.post('/bing/translate', async (req,res) => {
    let bing = new Bing();
    const text = req.body.translateText;
    if(text){
        let response = await bing.translateText(text);
        res.send(response);
    } else {
        res.send("Invalid request body: Please send translateText")
    }
})

// Login API
app.post('/user/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(username && password){
        let users = new Users(userFile);
        let result = users.authenticate({username:username,password:password});
        res.send(result);
    } else {
        res.send('Invalid request body: Please send username and password');
    }
})

app.post('/user/createUser', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(username && password){
        let users = new Users(userFile);
        let result = users.createNewUser({username:username,password:password});
        users.writeUsersToFile();
        res.send(result);
    } else {
        res.send('Invalid request body: Please send username and password');
    }
})

app.post('/user/updateUser', (req, res) => {
    const oldUsername = req.body.oldUsername;
    const oldPassword = req.body.oldPassword;
    const username = req.body.username;
    const password = req.body.password;
    if(oldUsername && oldPassword && username && password){
        let users = new Users(userFile);
        let result = users.updateUser({username:oldUsername, password:oldPassword},{username:username,password:password});
        users.writeUsersToFile();
        res.send(result);
    } else {
        res.send('Invalid request body: Please send username and password');
    }
})

app.post('/user/removeUser', (req, res) => {
    const username = req.body.username;
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
        res.send('Invalid request body: Please send username and password');
    }
})

app.listen(port, () => {
    console.log(`lang2views listening on port ${port}`)
})