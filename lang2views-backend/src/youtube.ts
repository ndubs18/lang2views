import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import { google } from 'googleapis';


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

    async getChannelFromId(apiKey: string, channelId: string) {
        const youtube = google.youtube({
            version: 'v3',
            auth: apiKey, // Your API key
        });
        try {
            const response = await youtube.channels.list({
                part: ['snippet', 'statistics'],
                id: [channelId],
            });
            return response.data.items;
        } catch (error) {
            console.error('Error fetching channel information:', error.message);
        }
      }
      async getChannelFromUsername(apiKey, channelUsername) {
        const youtube = google.youtube({
            version: 'v3',
            auth: apiKey,
        })
        try {
            const response = await youtube.channels.list({
                part: ['id'],
                forHandle: channelUsername,
            });
            const channelId = response.data.items[0]?.id;
            return channelId;
        } catch (error) {
            console.error('Error:', error.message);
            return null;
        }
      }
}

    
   