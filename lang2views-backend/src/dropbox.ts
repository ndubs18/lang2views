import { Client, Clients } from './clients.js'
import { Dropbox as DropboxConnection } from 'dropbox';
//import { Video, Videos } from './videos.js'

// TODO: This whole class is filled with stubs right now in anticipation of Videos class being filled out.
// Once that's done this file needs to have its stubs uncommented (& updated in cases where anticipated names
// may have differed from actual names).

export class Dropbox {
    private basePath: string = null;
    private db: DropboxConnection = null;

    constructor(accessToken: string, basePath: string) {
        this.db = new DropboxConnection({ accessToken: accessToken });
        this.basePath = basePath;
    }

    async createClientFolders(channelId: string) {
        //const client = Clients.retrieveClient(channelId);
        //const clientName = client.channelName;
        const clientName = "Test Channel Name"

        const path = this.basePath + clientName;
        let response = await this.db.filesCreateFolderV2({ path: path });
        console.log(response);
        let batchResponse = await this.db.filesCreateFolderBatch({ paths: [path + 'Shorts', path + 'Long Format'] });
        console.log(batchResponse);
        return batchResponse;
    }

    async createVideoFolder(videoId: string) {
        //const video: Video = Videos.retrieveVideo(videoId);
        //const videoTitle = video.title;
        //const videoNumber = video.number;
        const videoNumber = "00";
        const videoTitle = "Test Title";
        //const client: Client = Clients.retrieveClient(video.channelId);

        //const path = `${this.basePath}/${client.channelName}/${video.format}`
        const path = `${this.basePath}/Test Channel Name/Shorts/${videoNumber}. ${videoTitle}`;

        let response = await this.db.filesCreateFolderV2({ path: path })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.error(error);
                if (error.error.error_summary.includes('/path/conflict/folder')) {
                    return "Could not create folder: folder already exists"
                }

                return "Could not create folder"
            });
            return response;
    }
}