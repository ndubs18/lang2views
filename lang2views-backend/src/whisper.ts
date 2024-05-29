import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data'
import env from 'dotenv';

export class Whisper {
    private sk:string = null;
    constructor(){
        this.sk = process.env.WHISPER_KEY;
    }
    async transcribeAudio(filePath:string, fileName:string){
        let formData = new FormData();
        formData.append('model', 'whisper-1');
        formData.append('file', await fs.createReadStream(filePath), { filename:`${fileName}.mp3`, contentType: '.mp3'});
        let response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData,
        {
            headers: {
                Authorization: `Bearer ${this.sk}`,
                "Content-Type": `multipart/form-data; boundary=${await formData.getBoundary()}`
            }
        })
        return response.data.text;
    }
}