import express from 'express';
import path from 'path';
import { YouTube } from './youtube';
const app = express();
const port = 3000;

// Serve the app
app.get('/', (req, res) => {
    let filePath = path.resolve('.', 'lang2views-frontend', 'index.html')
    res.sendFile(filePath);
})

// YouTube download API
app.get('/youtube/download/*', async (req,res) => {
    let youtube = new YouTube();
    let url = req.url.slice(23,req.url.length);
    await youtube.downloadVideo(url, 'testVideo');
    await youtube.downloadAudio(`https://www.youtube.com/${url}`,'testVideo', async (err) => {
        if(!err){
            console.log('Download complete...')
        } else {
            console.log(err);
        }
    });
})

// YouTube upload API
app.get('/youtube/upload/*', (req,res) => {

})

// Whisper transcription API
app.get('/whisper/trancsribe/*', (req,res) => {

})

// Bing tranlation API
app.get('/bing/translate/*', (req,res) => {

})

app.listen(port, () => {
    console.log(`lang2views listening on port ${port}`)
})