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

            // Extract video IDs from the search results
            const videoIds = response.data.items.map(item => item.id.videoId).filter(id => id);

            let videos = [];
            if (videoIds.length > 0) {
                const videoDetailsResponse = await youtube.videos.list({
                  part: ['snippet', 'contentDetails'],
                  id: [ videoIds.join(',') ]
                  
                });
              
                // Process the video details
                for(let video of videoDetailsResponse.data.items){
                    videos.push({
                        id: video.id,
                        name: video.snippet.title,
                        url: `https://www.youtube.com/watch?v=${video.id}`,
                        thumbnail: video.snippet.thumbnails.default,
                        duration: parseISODuration(video.contentDetails.duration),
                        format: classifyVideoDuration(video.contentDetails.duration, 60)
                    })
                }

                return { 
                    videos: videos,
                    nextPageToken: response.data.nextPageToken,
                    prevPageToken: response.data.prevPageToken
                };
            }
        }catch(e){
            console.error(e);
        }
    }

    async downloadVideoAndAudio(videoURL:string, videoName:string, callback:Function){
        await ytdl(videoURL).pipe(await fs.createWriteStream(`${videoName}.mp4`)).on('finish', async () => {
            let stream = ytdl(videoURL, {
                quality:'highestaudio'
            })
            await ffmpeg(stream).audioBitrate(128).output(videoName+'.mp3').on('end', async () => {
                // Merge video and audio using ffmpeg
                await ffmpeg()
                .input(videoName+'.mp4')
                .input(videoName+'.mp3')
                .outputOptions('-c:v copy')  // Copy the video codec
                .outputOptions('-c:a aac')   // Ensure the audio is in AAC format
                .output(`${videoName}_merged.mp4`)
                .on('end', () => {
                    console.log('Merging complete');
                    callback();
                })
                .on('error', (err) => {
                    console.error(err);
                    callback(err);
                })
                .run();
            }).on('error', (err) => {
                console.log(err);
                callback(err);
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

/**
 * Parses an ISO 8601 duration string and converts it to an object.
 * @param {string} duration - The ISO 8601 duration string (e.g., "PT9M24S").
 * @returns {object} An object with days, hours, minutes, and seconds.
 */
export function parseISODuration(duration) {
    const regex = /P(?:([\d.]+)D)?T(?:([\d.]+)H)?(?:([\d.]+)M)?(?:([\d.]+)S)?/;
    const matches = duration.match(regex);
    return {
      days: parseFloat(matches[1]) || 0,
      hours: parseFloat(matches[2]) || 0,
      minutes: parseFloat(matches[3]) || 0,
      seconds: parseFloat(matches[4]) || 0
    };
  }
  
  /**
   * Converts a duration object to total seconds.
   * @param {object} durationObj - An object with days, hours, minutes, and seconds.
   * @returns {number} The total duration in seconds.
   */
  export function durationToSeconds(durationObj) {
    const { days, hours, minutes, seconds } = durationObj;
    return ((days * 24 * 60 * 60) +
            (hours * 60 * 60) +
            (minutes * 60) +
            seconds);
  }
  
  /**
   * Compares a video duration with a given threshold to classify it.
   * @param {string} isoDuration - The ISO 8601 duration string of the video.
   * @param {number} thresholdSeconds - The threshold in seconds to classify the video.
   * @returns {string} "short" if the video is shorter than the threshold, "long" otherwise.
   */
  export function classifyVideoDuration(isoDuration, thresholdSeconds) {
    const parsedDuration = parseISODuration(isoDuration);
    const totalSeconds = durationToSeconds(parsedDuration);
    return totalSeconds < thresholdSeconds ? 'short' : 'long';
  }

    
   