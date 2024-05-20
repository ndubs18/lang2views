import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import { google } from 'googleapis';

export class YouTube {
    async getVideoList(apiKey:string, channelId: string, pageToken:string|null){
        const youtube = google.youtube({
            version: 'v3',
            auth: apiKey, // Your API key
        });

        try{
            const response = await youtube.search.list({
                // type: ['video'],
                part: ['snippet', 'id'],
                channelId: channelId,
                maxResults: 50, // Adjust as needed
                pageToken: pageToken // Pass pageToken if it exists
            });

            console.log(response);

            // Extract videos
            let videos = [];
            for(let item of response.data.items){
                videos.push({
                    name: item.snippet.title,
                    id:item.id.videoId,
                    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                    thumbnail:item.snippet.thumbnails.default
                })
            }

            return { 
                videos: videos,
                nextPageToken: response.data.nextPageToken,
                prevPageToken: response.data.prevPageToken
            };
        }catch(e){
            console.error(e);
        }
    }

    async downloadVideoAndAudio(videoURL:string, videoName:string, callback:Function){
        await ytdl(videoURL, {quality: 'highest'}).pipe(await fs.createWriteStream(`${videoName}.mp4`)).on('finish', async () => {
            let stream = ytdl(videoURL, {
                quality:'highestaudio'
            })
            await ffmpeg(stream).audioBitrate(128).output(videoName+'.mp3').on('end', async () => {
                console.log('complete');
                callback();
            }).on('error', (err) => {
                console.log(err);
                callback(err);
            }).on('progress', (p) => {
                console.log(p);
            }).run();
        }).on('error', (err) => {
            console.error(err);
            callback(err);
        });
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

    
   