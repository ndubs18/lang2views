import fs from 'fs';
import path from 'path';
import { Videos, Video } from './video.js';

export interface ClientSettings {
    youtubeAccessSectionValue: null | string,
    useSameDescriptionSectionValue: null | boolean,
    useSameTagsSectionValue: null | boolean,
    description: null | string,
    tags: null | string,
    monthlyPlanInput: null | boolean,
    numLongFormatInput: null | number,
    numShortsInput: null | number,
    levelOfPostProcessing: null | number,
    estimatedPriceInput: null | string,
    trelloListId: null | string,
}

export interface Client {
    channelUrl: string,
    channelName: string,
    channelId: string,
    description: string,
    videos: Videos | null,
    clientSettings: null | ClientSettings
}

export class Clients {
    private _clients: Client[]
    private clientFile: string

    constructor(clientFile:string){
        this.clientFile = clientFile;
        this._clients = this.readClientsFromFile(clientFile);
    }

    public markClientVideoComplete(channelId:string, videoId:string){
        for(let client of this._clients){
            if(client.channelId == channelId){
                if(client.videos){
                    client.videos.markComplete(videoId);
                    client.videos.removeVideo(videoId);
                    this.deleteFolderRecursive(`clients/${client.channelId}/${videoId}`);
                } else {
                    client.videos = new Videos('clients/'+client.channelId+'/videos.json');
                    client.videos.markComplete(videoId);
                    client.videos.removeVideo(videoId);
                    this.deleteFolderRecursive(`clients/${client.channelId}/${videoId}`);
                }
                client.videos.writeVideosToFile();
            }
        }
    }

    public getClientVideoPath(channelId:string, videoId:string){
        let clientVideo = this.getClientVideo(channelId,videoId);
        for(let client of this._clients){
            if(client.channelId == channelId){
                return `./clients/${channelId}/${clientVideo.id}/${clientVideo.name.trim().replaceAll(' ', '_')}`
            }
        }
    }

    public updateClientVideo(channelId:string, video:Video){
        for(let client of this._clients){
            if(channelId === client.channelId){
                if(client.videos){
                    client.videos.updateVideo(video);
                } else {
                    client.videos = new Videos('clients/'+client.channelId+'/videos.json');
                    client.videos.updateVideo(video);
                }
            }
        }
    }

    public getClientSettings(channelId: string): ClientSettings | null {
        for (let client of this._clients) {
            if (client.channelId === channelId) {
                return client.clientSettings;
            }
        }
        return null;
    }

    public removeClientVideo(channelId:string, videoId:string){
        let match = false;
        for(let client of this._clients){
            if(client.channelId == channelId){
                if(client.videos){
                    for(let video of client.videos.videos){
                        if(video.id == videoId){
                            match = true;
                            this.deleteFolderRecursive(`./clients/${client.channelId}/${video.id}`);
                            client.videos.removeVideo(video.id);
                            client.videos.writeVideosToFile();
                        }
                    }
                } else {
                    client.videos = new Videos('clients/'+client.channelId+'/videos.json');
                    for(let video of client.videos.videos){
                        if(video.id == videoId){
                            match = true;
                            this.deleteFolderRecursive(`./clients/${client.channelId}/${video.id}`);
                            client.videos.removeVideo(video.id);
                            client.videos.writeVideosToFile();
                        }
                    }
                }
            }
        }
        if(!match){
            return 'Video not found';
        }
    }

    public getClientVideo(channelId:string, videoId:string):Video{
        for(let client of this._clients){
            if(client.channelId == channelId){
                if(client.videos == null){
                    client.videos = new Videos('clients/'+client.channelId+'/videos.json');
                    for(let video of client.videos.videos){
                        if(video.id == videoId){
                            return video;
                        }
                    }
                } else {
                    for(let video of client.videos.videos){
                        if(video.id == videoId){
                            return video
                        }
                    }
                }
            }
        }
        return null;
    }

    public getClient(channelId:string):Client{
        let match = false;
        for(let client of this._clients){
            if(client.channelId == channelId){
                match = true;
                return client;
            }
        }
    }

    public updateClientSettings(channelId:string, settings:ClientSettings){
        let match = false;
        for(let client of this._clients){
            if(client.channelId == channelId){
                match = true;
                client.clientSettings = settings;
                break;
            }
        }
        if(!match){
            return 'Client not found.';
        } else {
            return 'Client updated.';
        }
    }

    public addClientVideo(channelId:string, video:Video){
        for(let client of this._clients){
            if(client.channelId == channelId){
                if(!fs.existsSync('clients')){
                    fs.mkdirSync('clients');
                }
                if(!fs.existsSync('clients/'+client.channelId)){
                    fs.mkdirSync('clients/'+client.channelId);
                }
                if (!fs.existsSync('clients/' + client.channelId)) {
                    fs.mkdirSync('clients/' + client.channelId + '/videos.json');
                }
                let videoNumber = 0;
                if(client.videos == null){
                    client.videos = new Videos('clients/'+client.channelId+'/videos.json');
                } 
                videoNumber = client.videos.addVideo(video);
                client.videos.writeVideosToFile();
                return videoNumber;
            }
        }
    }

    public getClientVideos(channelId:string){
        for(let client of this._clients){
            if(client.channelId === channelId){
                if(client.videos == null){
                    client.videos = new Videos('clients/'+client.channelId+'/videos.json');
                    return client.videos.videos;
                } else {
                    return client.videos.videos;
                }
            }
        }
    }

    public async downloadClientVideo(channelId:string,videoId:string){
        for(let client of this._clients){
            if(client.channelId === channelId){
                if(client.videos == null){
                    client.videos = new Videos('clients/'+client.channelId+'/videos.json');
                    await client.videos.downloadVideo(videoId,'clients/'+client.channelId)
                } else {
                    await client.videos.downloadVideo(videoId,'clients/'+client.channelId)
                }
            }
        }
    }

    public async downloadClientVideos(channelId:string){
        for(let client of this._clients){
            if(client.channelId == channelId){
                if(client.videos == null){
                    client.videos = new Videos('clients/'+client.channelId+'/videos.json');
                    await client.videos.downloadVideos('clients/'+client.channelId)
                }else {
                    await client.videos.downloadVideos('clients/'+client.channelId)
                }
            }
        }
    }

    public getFinishedVideoNumbers(channelId: string) {
        for (let client of this._clients) {
            if (client.channelId == channelId) {
                if (client.videos == null) {
                    client.videos = new Videos('clients/' + client.channelId + '/videos.json');
                }
                return client.videos.getFinishedNumbers();
            }
        }
    }

    get clients():Client[]{
        return this._clients;
    }

    public addClient(newClient: Client){
        for(let client of this._clients){
            if(client.channelId === newClient.channelId){
                return 'Client already exists.';
            }
        }
        if(!fs.existsSync('./clients')){
            fs.mkdirSync('./clients');
        }
        fs.mkdirSync('clients/'+newClient.channelId);
        this._clients.push(newClient);
        return 'Client created.';
    }
    public removeClient(channelId: string){
        // Find the index of the user with the specified username
        const index = this._clients.findIndex(client => client.channelId === channelId);

        // If the user is found, remove it from the array
        if (index !== -1) {
            let client = this._clients[index];
            this.deleteFolderRecursive('clients/'+client.channelId);
            this._clients.splice(index, 1);
            return true;
        } else {
            console.log(`User ${channelId} not found.`);
            return false;
        }
    }
    // Function to read users from the JSON file
    private readClientsFromFile(filePath: string): Client[] {
        try {
            if(fs.existsSync(this.clientFile)){
                // Read the JSON file
                const fileData = fs.readFileSync(filePath, 'utf-8');
                
                // Parse JSON data into an array of User objects
                const users: Client[] = JSON.parse(fileData);
                
                return users;
            } else {
                console.log('file not found: ' + this.clientFile)
                return [];
            }
        } catch (error) {
            console.error('Error reading clients from file:', error);
            return [];
        }
    }
    // Function to overwrite users to the JSON file
    public writeClientsToFile(): void {
        try {
            // Convert users array to JSON string
            const jsonData = JSON.stringify(this._clients, null, 2); // null and 2 for formatting
            
            // Write JSON string to the file
            fs.writeFileSync(this.clientFile, jsonData, 'utf-8');
            
            console.log('Users data has been written to the file successfully.');
        } catch (error) {
            console.error('Error writing clients to file:', error);
        }
    }
    private deleteFolderRecursive(folderPath) {
        if (!fs.existsSync(folderPath)) {
          console.log('Folder does not exist:', folderPath);
          return;
        }
      
        // Get list of files in the folder
        const files = fs.readdirSync(folderPath);
      
        // Iterate through each file
        files.forEach((file) => {
          const filePath = path.join(folderPath, file);
      
          // Check if the file is a directory
          if (fs.statSync(filePath).isDirectory()) {
            // Recursively delete subdirectories
            this.deleteFolderRecursive(filePath);
          } else {
            // Delete the file
            fs.unlinkSync(filePath);
            console.log('Deleted file:', filePath);
          }
        });
      
        // After deleting all files, delete the folder itself
        fs.rmdirSync(folderPath);
        console.log('Deleted folder:', folderPath);
    }
}