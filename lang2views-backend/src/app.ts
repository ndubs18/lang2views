import express from 'express';
import path from 'path';
import { YouTube } from './youtube.js';
import { Whisper } from './whisper.js';
import { Bing } from './bing.js';
import { Users } from './users.js'
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
    let url = req.body.url;
    let videoName = req.body.videoName;
    await youtube.downloadVideo(url, videoName);
    await youtube.downloadAudio(url, videoName, async (err) => {
        if(!err){
            res.send('Download Complete')
        } else {
            console.log(err);
        }
    });
})

// YouTube upload API
app.get('/youtube/upload/*', (req,res) => {

})

// Whisper transcription API
app.post('/whisper/transcribe', async (req,res) => {
    // Need to pass secret key for Whisper API usage
    const filePath = req.body.filePath;
    const whisperKey = req.body.whisperKey;
    const decodedKey = Buffer.from(whisperKey, 'base64').toString('utf-8');
    let whisper = new Whisper(decodedKey);
    try{
        let response = await whisper.transcribeAudio(filePath);
        res.send(response);
    } catch(e){
        res.send(e);
    }
})

// Bing tranlation API
app.post('/bing/translate', async (req,res) => {
    let bing = new Bing();
    const text = req.body.translateText;
    let response = await bing.translateText(text);
    res.send(response);
})

// Login API
app.post('/user/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let users = new Users(userFile);
    let result = users.authenticate({username:username,password:password});
    res.send(result);
})

app.post('/user/createUser', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    let users = new Users(userFile);
    let result = users.createNewUser({username:username,password:password});
    users.writeUsersToFile();
    res.send(result);
})

app.post('/user/updateUser', (req, res) => {
    const oldUsername = req.body.oldUsername;
    const oldPassword = req.body.oldPassword;
    const username = req.body.username;
    const password = req.body.password;
    let users = new Users(userFile);
    let result = users.updateUser({username:oldUsername, password:oldPassword},{username:username,password:password});
    users.writeUsersToFile();
    res.send(result);
})

app.post('/user/removeUser', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let users = new Users(userFile);
    let result = users.removeUser({username:username, password:password});
    if(result){
        res.send('User removed.')
        users.writeUsersToFile();
    } else {
        res.send('User not found.')
    }
})

app.listen(port, () => {
    console.log(`lang2views listening on port ${port}`)
})