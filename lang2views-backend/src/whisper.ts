import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data'

export class Whisper {
    private sk:string = null;
    constructor(secretKey:string){
        this.sk = secretKey;
    }
    async transcribeAudio(filePath:string){
        let formData = new FormData();
        formData.append('model', 'whisper-1');
        formData.append('file', await fs.createReadStream(filePath), { filename:'testVideo.mp3', contentType: '.mp3'});
        let response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData,
        {
            headers: {
                Authorization: `Bearer ${this.sk}`,
                "Content-Type": `multipart/form-data; boundary=${await formData.getBoundary()}`
            }
        })
        console.log(response);
        return response.data.text;
    }
}