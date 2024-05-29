import { clientFile } from './app.js'
import { Clients } from './clients.js'
import { Dropbox } from 'dropbox';
import fs from 'fs';
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

    async uploadFile(dropboxPath: string, filePath: string, contents: any) {
        // https://github.com/dropbox/dropbox-sdk-js/blob/main/examples/javascript/upload/index.html
        const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;
        let fileSize = fs.statSync(filePath).size

        if (fileSize < UPLOAD_FILE_SIZE_LIMIT) { // File is smaller than 150 MB - use filesUpload API
            await this.dbx.filesUpload({ path: dropboxPath, contents: contents })
                .then(function (response) {
                    console.log(response);
                    return 'https://www.dropbox.com/home' + response.result.path_lower;
                })
                .catch(function (error) {
                    console.error(error.error || error);
                    return "Could not upload file at path " + dropboxPath
                });
        // TODO: THIS IS CURRENTLY UNTESTED. Hypothetically this will work to upload a video > 150MB,
        // but currently we can't *transcribe* videos larger than 25MB due to Whisper API limits.
        // Need to revisit, test, and possibly fix this after we have workarounds for Whisper limits.
        } else { // File is bigger than 150 MB - use filesUploadSession API
            const maxBlob = 12 * 1024 * 1024; // 8MB - Dropbox JavaScript API suggested chunk size

            var workItems = [];
            var offset = 0;

            while (offset < fileSize) {
                var chunkSize = Math.min(maxBlob, fileSize - offset);
                workItems.push(contents.slice(offset, offset + chunkSize));
                offset += chunkSize;
            }

            const task = workItems.reduce((acc, blob, idx, items) => {
                if (idx == 0) {
                    // Starting multipart upload of file
                    return acc.then(function () {
                        return this.dbx.filesUploadSessionStart({ close: false, contents: blob })
                            .then(response => response.result.session_id)
                    });
                } else if (idx < items.length - 1) {
                    // Append part to the upload session
                    return acc.then(function (sessionId) {
                        var cursor = { session_id: sessionId, offset: idx * maxBlob };
                        return this.dbx.filesUploadSessionAppendV2({ cursor: cursor, close: false, contents: blob }).then(() => sessionId);
                    });
                } else {
                    // Last chunk of data, close session
                    return acc.then(function (sessionId) {
                        var cursor = { session_id: sessionId, offset: fileSize - blob.size };
                        var commit = { path: dropboxPath, mode: 'add', autorename: true, mute: false };
                        return this.dbx.filesUploadSessionFinish({ cursor: cursor, commit: commit, contents: blob });
                    });
                }
            }, Promise.resolve());

            task.then(function (response) {
                console.log(response);
                return 'https://www.dropbox.com/home' + response.result.path_lower;
            })
                .catch(function (error) {
                    console.error(error);
                    return "Could not upload file at path " + dropboxPath
            });
        }
    }

    getPathFromVideoFolderUrl(folderUrl: string) {
        // Assuming video folder URL has format:
        // '[url beginning]/home/lang2views/client projects/[channel name]/[format]/[video number]. [video title]'
        // then we only need the part after '/home'
        let position = folderUrl.search('/home') + 5;
        return folderUrl.slice(position);
    }
}