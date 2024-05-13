import fs from 'fs';

export interface Client {
    channelUrl: string,
    channelName: string,
    channelId: string,
    description: string,
    clientSettings: null | {

    }
}

export class Clients {
    clients: Client[]
    clientFile: string
    constructor(clientFile:string){
        this.clientFile = clientFile;
        this.clients = this.readClientsFromFile(clientFile);
    }
    addClient(newClient: Client){
        for(let client of this.clients){
            if(client.channelId === newClient.channelId){
                return 'Client already exists.';
            }
        }
        this.clients.push(newClient);
        return 'Client created.';
    }
    removeClient(channelId: string){
        // Find the index of the user with the specified username
        const index = this.clients.findIndex(client => client.channelId === channelId);

        // If the user is found, remove it from the array
        if (index !== -1) {
            this.clients.splice(index, 1);
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
            console.error('Error reading users from file:', error);
            return [];
        }
    }
    // Function to overwrite users to the JSON file
    public writeClientsToFile(): void {
        try {
            // Convert users array to JSON string
            const jsonData = JSON.stringify(this.clients, null, 2); // null and 2 for formatting
            
            // Write JSON string to the file
            fs.writeFileSync(this.clientFile, jsonData, 'utf-8');
            
            console.log('Users data has been written to the file successfully.');
        } catch (error) {
            console.error('Error writing users to file:', error);
        }
    }
}