import fs from 'fs';
import { YouTube } from './youtube.js';

export interface Video {
    id:string,
    name:string,
    url:string,
    thumbnail:any,
    duration:any,
    format: string,
    number: number | string,
    finalized:boolean,
    trelloCard:string | null,
    dropboxURL: string | null,
    documentId: string | null,
}

export class Videos {
    private _videos:Video[];
    private videoFile:string;

    constructor(videoFile:string){
        this.videoFile = videoFile;
        let vidoes = this.readVideosFromFile(this.videoFile);
        this._videos = vidoes;
    }

    get videos():Video[]{
        return this._videos;
    }

    public isFinished(videoId:string){
        for(let video of this._videos){
            if(video.id == videoId){
                return video.finalized;
            }
        }
    }

    public markComplete(videoId:string){
        for(let video of this._videos){
            if(video.id === videoId){
                video.finalized = true;
            }
        }
    }

    public updateVideo(updateVideo:Video){
        let match = false;
        for(let i = 0; i < this._videos.length; ++i){
            if(this._videos[i].id === updateVideo.id){
                this._videos[i] = updateVideo;
                match = true;
            }
        }
        this.writeVideosToFile();
    }

    public addVideo(newVideo:Video){
        let match = false;
        for(let video of this._videos){
            if(video.id === newVideo.id){
                match = true;
                break;
            }
        }
        if(!match){
            this._videos.push(newVideo);
            return this._videos.length;
        }
        return -1;
    }

    public addVideos(newVideos:Video[]){
        for(let newVideo of newVideos){
            //this._videos.push(video);
            let match = false;
            for(let video of this._videos){
                if(video.id === newVideo.id){
                    match = true;
                    break;
                }
            }
            if(!match){
                this._videos.push(newVideo);
            }
        }
    }

    public removeVideo(videoId){
        // Find the index of the user with the specified username
        const index = this._videos.findIndex(video => video.id === videoId);

        // If the user is found, remove it from the array
        if (index !== -1) {
            let video = this._videos[index];
            this._videos.splice(index, 1);
            return true;
        } else {
            console.log(`User ${videoId} not found.`);
            return false;
        }
    }

    public downloadVideo(videoId:string,filePath:string){
        return new Promise(async (resolve, reject) => {
            let youtube = new YouTube();
            for(let video of this._videos){
                if(video.id == videoId){
                    let folderName = filePath + '/' + video.id.trim().replaceAll(' ', '_');
                    if(!fs.existsSync(folderName)){
                        fs.mkdirSync(folderName);
                    }
                    await youtube.downloadVideoAndAudio(video.url,folderName+'/'+video.name.trim().replaceAll(' ', '_'), (err) => {
                        if(!err){
                            console.log(video.name + ' download complete.');
                            resolve('Download complete.');
                        } else {
                            console.error(err);
                            reject(err);
                        }
                    })
                }
            }
        })
    }

    public downloadVideos(filePath:string){
        return new Promise(async (resolve, reject) => {
            let youtube = new YouTube();

            let started = 0;
            let completed = 0;
            for(let i = 0; i < this._videos.length; ++i){
                started++;
                await youtube.downloadVideoAndAudio(this._videos[i].url,filePath+'/'+this._videos[i].name.trim(), (err) => {
                    if(!err){
                        console.log(this._videos[i].name + ' download complete.');
                        completed++;

                        if(started == completed){
                            resolve('Download complete.');
                        }
                    } else {
                        console.error(err);
                    }
                })
            }
        })
    }

    // Function to read users from the JSON file
    private readVideosFromFile(filePath: string): Video[] {
        try {
            if(fs.existsSync(this.videoFile)){
                // Read the JSON file
                const fileData = fs.readFileSync(filePath, 'utf-8');
                
                // Parse JSON data into an array of User objects
                const users: Video[] = JSON.parse(fileData);
                
                return users;
            } else {
                console.log('file not found: ' + this.videoFile)
                return [];
            }
        } catch (error) {
            console.error('Error reading vidoes from file:', error);
            return [];
        }
    }
    // Function to overwrite users to the JSON file
    public writeVideosToFile(): void {
        try {
            // Convert users array to JSON string
            const jsonData = JSON.stringify(this._videos, null, 2); // null and 2 for formatting
            
            // Write JSON string to the file
            fs.writeFileSync(this.videoFile, jsonData, 'utf-8');
            
            console.log('Video data has been written to the file successfully.');
        } catch (error) {
            console.error('Error writing videos to file:', error);
        }
    }
}