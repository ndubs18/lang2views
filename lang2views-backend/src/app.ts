import express from 'express';
import path from 'path';
import { YouTube } from './youtube';
import { Whisper } from './whisper';
import { Bing } from './bing';
import { Users } from './users'
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Front end is served by vite? -- we may need to revisit the inital server response.
app.get('/', (req, res) => {
    // let filePath = path.resolve('.', 'lang2views-frontend', 'index.html')
    // res.sendFile(filePath);
})

// YouTube download API
app.post('/youtube/download', async (req,res) => {
    let youtube = new YouTube();
    let url = req.body.url;
    await youtube.downloadVideo(url, 'testVideo');
    await youtube.downloadAudio(url,'testVideo', async (err) => {
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
app.post('/whisper/trancsribe', (req,res) => {
    // Need to pass secret key for Whisper API usage
    let whisper = new Whisper('');
    const filePath = req.body.filePath;
    let response = whisper.transcribeAudio(filePath);
    res.send(response);
})

// Bing tranlation API
app.post('/bing/translate', (req,res) => {
    let bing = new Bing();
    const text = req.body.translateText
    let response = bing.translateText(text);
    res.send(response);
})

// Login API
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let users = new Users();
    let result = users.login(username,password);
    res.send(result);
})

app.post('/createUser', (req,res) => {
    const username = req.body.username;
    const password = req.body.username;
    let users = new Users();
    users.createNewUser(username,password);
    users.writeUsersToFile();
    res.send('User Created');
})

app.listen(port, () => {
    console.log(`lang2views listening on port ${port}`)
})