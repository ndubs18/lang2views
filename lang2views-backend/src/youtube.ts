import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import fs from 'fs';
import { google } from 'googleapis';
import { Clients } from './clients.js';
import { Videos } from './video.js';
import { TranslationServiceClient } from '@google-cloud/translate';
import { GoogleAuth } from 'google-auth-library';

// If ffmpeg is installed locally this will give you issues. Just comment out line below
ffmpeg.setFfmpegPath(ffmpegPath.path);

const clientFile = 'clients.json';

export class YouTube {
    private oAuth2Client;
    async translate(text:string,lang:string){
        // Set up the Google Auth library with the environment variables
        const googleServiceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
        const auth = new GoogleAuth({
            credentials: {
            client_email: googleServiceAccount.client_email,
            private_key: googleServiceAccount.private_key.replace(/\\n/g, '\n'),
            },
            projectId: googleServiceAccount.project_id,
        });
        const translate = new TranslationServiceClient({ auth });
        try {
            const request = {
              parent: `projects/${googleServiceAccount.project_id}/locations/global`,
              contents: [text],
              mimeType: 'text/plain', // mime types: text/plain, text/html
              targetLanguageCode: lang,
            };
        
            // Translates the text into the target language
            const [response] = await translate.translateText(request);
            const translation = response.translations[0].translatedText;
            console.log(`Text: ${text}`);
            console.log(`Translation: ${translation}`);
            return translation;
        } catch (error) {
            console.error('ERROR:', error);
            throw error;
        }

    }
    checkAuth(){
        if(this.oAuth2Client.credentials){
            return true
        }
        return false;
    }
    upload(filePath:string, callback:Function){
        const youtube = google.youtube({ version: 'v3', auth: this.oAuth2Client });
        const videoFilePath = filePath;
        const fileSize = fs.statSync(videoFilePath).size;
        youtube.videos.insert(
            {
            part: ['snippet,status'],
            requestBody: {
                snippet: {
                title: 'Test Video',
                description: 'This is a test video upload via YouTube Data API',
                tags: ['youtube', 'api', 'upload'],
                categoryId: '22', // See https://developers.google.com/youtube/v3/docs/videoCategories/list
                },
                status: {
                privacyStatus: 'private', // 'private', 'public' or 'unlisted'
                },
            },
            media: {
                body: fs.createReadStream(videoFilePath),
            },
            },
            {
            onUploadProgress: (evt) => {
                const progress = (evt.bytesRead / fileSize) * 100;
                console.log(`${Math.round(progress)}% complete`);
            },
            },
            (err, response) => {
                callback(err, response)
            }
        );
    }

    loadAuthClient(){
        // Load client secrets from a local file.
        // let content = fs.readFileSync(CLIENT_SECRET_PATH);
        // const credentials = JSON.parse(content.toString());
        let credentials = JSON.parse(process.env.CLIENT_SECRET);
        const { client_id, client_secret, redirect_uris } = credentials.web;
        this.oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        return this.oAuth2Client;
    }
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
                    let finalized = false;
                    if(fs.existsSync(`./clients/${channelId}`)){
                        let clients = new Clients(clientFile);
                        let client = clients.getClient(channelId);
                        if(client.videos){
                            if(client.videos.isFinished(video.id)){
                                finalized = true;
                            }
                        } else {
                            client.videos = new Videos('clients/'+client.channelId+'/videos.json');
                        }
                    }
                    videos.push({
                        id: video.id,
                        name: video.snippet.title,
                        url: `https://www.youtube.com/watch?v=${video.id}`,
                        thumbnail: video.snippet.thumbnails.default,
                        duration: parseISODuration(video.contentDetails.duration),
                        format: classifyVideoDuration(video.contentDetails.duration, 60),
                        finalized: finalized
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
                // // Merge video and audio using ffmpeg
                // await ffmpeg()
                // .input(videoName+'.mp4')
                // .input(videoName+'.mp3')
                // .outputOptions('-c:v copy')  // Copy the video codec
                // .outputOptions('-c:a aac')   // Ensure the audio is in AAC format
                // .output(`${videoName}_merged.mp4`)
                // .on('end', () => {
                //     console.log('Merging complete');
                //     callback();
                // })
                // .on('error', (err) => {
                //     console.error(err);
                //     callback(err);
                // })
                // .run();
                callback();
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

    
   