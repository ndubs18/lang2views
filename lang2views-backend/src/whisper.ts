import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data'
import path from 'path';
import env from 'dotenv';

export class Whisper {
    private sk:string = null;
    constructor(){
        this.sk = process.env.WHISPER_KEY;
    }

    async transcribeAudio(filePath: string, fileName: string): Promise<string[]> {
        const targetSizeInBytes = 25 * 1024 * 1024; // 25MB

        // Check file size
        const fileSizeInBytes = fs.statSync(filePath).size;

        let filesToTranscribe: string[] = [];
        // Split file won't split the file if it is under 25MB
        if (fileSizeInBytes/* > targetSizeInBytes*/) {
            // Split the file if it's larger than 25MB
            const outputFolder = path.join(path.dirname(filePath), 'parts');
            filesToTranscribe = this.splitFile(filePath, outputFolder, targetSizeInBytes);
        } else {
            // If the file size is within the limit, use the original file
            filesToTranscribe = [filePath];
        }

        // Transcribe each file chunk and collect the results
        const transcriptions = [];
        for (const file of filesToTranscribe) {
            const transcription = await this.transcribeChunk(file, fileName);
            transcriptions.push(transcription);
        }

        // Stitch the transcriptions together
        return transcriptions;
    }


    async transcribeChunk(filePath:string, fileName:string){
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

    // Splitting the file to achieve total size below 25MB
    splitFile(inputFile: string, outputFolder: string, targetSizeInBytes: number): string[] {
        const fileSizeInBytes: number = fs.statSync(inputFile).size;
        const numChunks: number = Math.ceil(fileSizeInBytes / targetSizeInBytes);
        const splitFileNames: string[] = [];

        if(!fs.existsSync(outputFolder)){
            fs.mkdirSync(outputFolder);
        }

        // Calculate the chunk size
        const chunkSize: number = Math.ceil(fileSizeInBytes / numChunks);

        // Read the input file as binary data
        const buffer: Buffer = fs.readFileSync(inputFile);

        for (let i = 0; i < numChunks; i++) {
            // Calculate start and end offsets for each chunk
            const startOffset: number = i * chunkSize;
            const endOffset: number = Math.min(startOffset + chunkSize, fileSizeInBytes);

            // Extract chunk from the buffer
            const chunk: Buffer = buffer.slice(startOffset, endOffset);

            // Write the chunk to a separate file
            const splitFileName: string = path.join(outputFolder, `part_${i}.txt`);
            fs.writeFileSync(splitFileName, chunk);

            // Store the file name
            splitFileNames.push(splitFileName);
        }

        return splitFileNames;
    }


    // Stitching the transcriptions
    stitchTranscriptions(transcriptions: string[]): string {
        return transcriptions.join('\n');
    }
}