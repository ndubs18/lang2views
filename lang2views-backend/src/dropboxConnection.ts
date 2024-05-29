import { clientFile } from './app.js'
import { Clients } from './clients.js'
import { Dropbox } from 'dropbox';
import { Video } from './video.js'

export class DropboxConnection {
    private basePath: string = '/Lang2views/Client Projects';
    private dbx: any = null;
    private clientId: string = process.env.DBX_APP_KEY;
    private clientSecret: string = process.env.DBX_APP_SECRET;

    constructor() {
        this.dbx = new Dropbox({
            clientId: this.clientId,
            clientSecret: this.clientSecret,
        });
    }

    async getAuthUrl() {
        return await this.dbx.auth.getAuthenticationUrl('http://localhost:3000/dropbox/authsuccess', null, 'code');
    }

    handleTokenFromCode(code: string) {
        return this.dbx.auth.getAccessTokenFromCode('http://localhost:3000/dropbox/authsuccess', code)
            .then((token) => {
            this.dbx.auth.setAccessToken(token.result.access_token);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async isAuthenticated() {
        return await this.dbx.usersGetCurrentAccount()
            .then(function (response) {
                console.log(response);
                return true;
            })
            .catch((error) => {
                return false;
            });
    }

    async createClientFolders(channelId: string) {
        let clients = new Clients(clientFile);
        const client = clients.getClient(channelId);
        const clientName = client.channelName;

        const path = this.basePath + '/' + clientName;
        let response = await this.dbx.filesCreateFolderV2({ path: path })
            .then(function (response) {
                console.log(response);
                return 'https://www.dropbox.com/home' + response.result.metadata.path_lower;
            })
            .catch(function (error) {
                console.error(error);
                if (error.hasOwnProperty('error') &&
                    error.error.hasOwnProperty('error_summary') &&
                    error.error.error_summary.includes('/path/conflict/folder')) {
                    return "Could not create folder: folder already exists"
                }

                return "Could not create folder"
            });

        if (!response.includes('Could not create folder')) {
            let batchResponse = await this.dbx.filesCreateFolderBatch({ paths: [path + '/Shorts', path + '/Long Formats'] })
                .then(function (response) {
                    return response;
                })
                .catch(function (error) {
                    console.error(error);
                    if (error.hasOwnProperty('error') &&
                        error.error.hasOwnProperty('error_summary') &&
                        error.error.error_summary.includes('/path/conflict/folder')) {
                        return "Could not create folder: folder already exists"
                    }

                    return "Could not create subfolders"
                });
            console.log(batchResponse);
        }
        
        return response;
    }

    async createVideoFolder(channelId: string, video: Video, videoNumber: number) {
        let clients = new Clients(clientFile);
        const client = clients.getClient(channelId);
        const videoTitle = video.name;
        const videoFormat = video.format == 'short' ? 'Shorts' : 'Long Formats'

        const path = `${this.basePath}/${client.channelName}/${videoFormat}/${videoNumber}. ${videoTitle}`
        console.log(path)

        let response = await this.dbx.filesCreateFolderV2({ path: path })
            .then(function (response) {
                console.log(response);
                return 'https://www.dropbox.com/home' + response.result.metadata.path_lower;
            })
            .catch(function (error) {
                console.error(error);
                if (error.hasOwnProperty('error') &&
                    error.error.hasOwnProperty('error_summary') &&
                    error.error.error_summary.includes('/path/conflict/folder')) {
                    return "Could not create folder: folder already exists"
                }

                return "Could not create folder"
            });

        return response
    }
}