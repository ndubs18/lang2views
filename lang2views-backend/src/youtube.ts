import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';


export class YouTube {
    async downloadAudio(videoURL:string, videoName:string, callback:Function){
        let stream = ytdl(videoURL, {
            quality:'highestaudio'
        })
        await ffmpeg(stream).audioBitrate(128).save(`${videoName}.mp3`).on('end', async () => {
            console.log('complete');
            callback();
        }).on('error', (err) => {
            console.log(err);
            callback(err);
        }).on('progress', (p) => {
            console.log(p);
        });
    }

    async downloadVideo(videoURL:string, videoName:string):Promise<ytdl.videoInfo>{
        let videoInfo = await ytdl.getInfo(videoURL);
        await ytdl(videoURL).pipe(fs.createWriteStream(`${videoName}.mp4`));
        return videoInfo;
    }
}

    
   