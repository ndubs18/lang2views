import fs from 'fs';
import { YouTube } from './youtube.js';

export interface Video {
    id:string,
    name:string,
    url:string,
    // thumbnail:any,
}

export class Videos {
    private videos:Video[];
    private videoFile:string;

    constructor(videoFile:string){
        this.videoFile = videoFile;
        let vidoes = this.readVideosFromFile(this.videoFile);
        this.videos = vidoes;
    }

    public getVideos(){
        return this.videos;
    }

    public addVideo(newVideo:Video){
        let match = false;
        for(let video of this.videos){
            if(video.id === newVideo.id){
                match = true;
                break;
            }
        }
        if(!match){
            this.videos.push(newVideo);
        }
    }

    public addVideos(newVideos:Video[]){
        for(let newVideo of newVideos){
            //this.videos.push(video);
            let match = false;
            for(let video of this.videos){
                if(video.id === newVideo.id){
                    match = true;
                    break;
                }
            }
            if(!match){
                this.videos.push(newVideo);
            }
        }
    }

    public resetVideos(videos:Video[]){
    }

    public downloadVideo(videoId:string,filePath:string){
        return new Promise(async (resolve, reject) => {
            let youtube = new YouTube();
            for(let video of this.videos){
                if(video.id == videoId){
                    await youtube.downloadVideoAndAudio(video.url,filePath+'/'+video.name.trim(), (err) => {
                        if(!err){
                            console.log(video.name + ' download complete.');
                            resolve('Download complete.');
                        } else {
                            console.error(err);
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
            for(let i = 0; i < this.videos.length; ++i){
                started++;
                await youtube.downloadVideoAndAudio(this.videos[i].url,filePath+'/'+this.videos[i].name.trim(), (err) => {
                    if(!err){
                        console.log(this.videos[i].name + ' download complete.');
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
            const jsonData = JSON.stringify(this.videos, null, 2); // null and 2 for formatting
            
            // Write JSON string to the file
            fs.writeFileSync(this.videoFile, jsonData, 'utf-8');
            
            console.log('Video data has been written to the file successfully.');
        } catch (error) {
            console.error('Error writing videos to file:', error);
        }
    }
}