import { docs } from "@googleapis/docs";
import { google } from 'googleapis'
import { GoogleAuth } from 'google-auth-library';

//right now it takes a string to write to google docs
//can integreate to read from a file if needed

export class GoogleDocs {
    private auth: GoogleAuth;

    constructor() {
        // Set up the Google Auth library with the environment variables
        const googleServiceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
        this.auth = new GoogleAuth({
            credentials: {
                client_email: googleServiceAccount.client_email,
                private_key: googleServiceAccount.private_key.replace(/\\n/g, '\n'),
            },
            projectId: googleServiceAccount.project_id,
            scopes: process.env.GOOGLE_DOCS_SCOPES.split(", "),
        });
    }

    public async createGoogleDoc(title) {
        const client = await docs({
            version: 'v1',
            auth: this.auth
        });

        const driveClient = await google.drive({
            version: 'v3',
            auth: this.auth
        })

        return await client.documents.create({
            requestBody: {
                title: title,
            },
        })
        .then(async function (response) {
            console.log(response);

            const documentId = response.data.documentId;
            console.log("Created document with ID:", documentId);

            // Share the document with a specific user
            const userEmail = process.env.DRIVE_SHARE_EMAIL;
            await driveClient.permissions.create({
                fileId: documentId,
                requestBody: {
                    role: 'writer',
                    type: 'user',
                    emailAddress: userEmail,
                },
            });

            console.log(`Shared document with ${userEmail}`);

            return documentId;
        })
        .catch(function (error) {
            console.log("The API returned an error: " + error)
            return "Could not create document.";
        });
    }

    public async writeToGoogleDoc(documentId, text) {
        const client = await docs({
            version: 'v1',
            auth: this.auth
        });

        const requests = [{
            insertText: {
                location: {
                index: 1,
                },
                text: text,
            },
        }];
        return client.documents.batchUpdate({
            documentId: documentId,
            requestBody: {
                requests: requests,
            },
        }).then(function (response) {
            console.log(response);

            console.log("Wrote to document successfully.");
            return "Wrote to document successfully.";
        })
        .catch(function (error) {
            console.log("The API returned an error: " + error)
            return "Could not write to document.";
        });
    }
}
