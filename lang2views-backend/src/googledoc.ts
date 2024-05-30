import { google } from "googleapis";
const docs = google.docs("v1");

//right now it takes a string to write to google docs
//can integreate to read from a file if needed

export class GoogleDocs {
  public createGoogleDoc(api, title, text) {
    docs.documents.create(
      {
        requestBody: {
          title: title,
        },
      },
      (err, res) => {
        if (err) return console.log("The API returned an error: " + err);
        const documentId = res.data.documentId;
        console.log("Created document with ID:", documentId);
        this.writeToGoogleDoc(api, documentId, text);
      }
    );
  }
  public writeToGoogleDoc(api, documentId, text) {
    const requests = [
      {
        insertText: {
          location: {
            index: 1,
          },
          text: text,
        },
      },
    ];
    docs.documents.batchUpdate(
      {
        documentId: documentId,
        requestBody: {
          requests: requests,
        },
      },
      (err, res) => {
        if (err) return console.log("The API returned an error: " + err);
        console.log("The document was updated.");
      }
    );
  }
}
