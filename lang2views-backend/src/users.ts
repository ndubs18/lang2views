import fs from 'fs';

interface User {
    username: string;
    password: string;
}

export class Users {
    private userFile:string = 'users.json'
    private users:User[] = []

    constructor(){
        this.users = this.readUsersFromFile(this.userFile);
    }

    // Add new user to user list
    createNewUser(username:string, password:string){
        this.users.push({
            username:username,
            password:password
        });
    }

    // Check users for username and password match ( Login )
    login(username:string, password:string):boolean{
        for(let user of this.users){
            if(user.username == username){
                if(user.password == password){
                    return true;
                } else {
                    return false;
                }
            }
        }
        return false;
    }

    // Function to read users from the JSON file
    readUsersFromFile(filePath: string): User[] {
        try {
            // Read the JSON file
            const fileData = fs.readFileSync(filePath, 'utf-8');
            
            // Parse JSON data into an array of User objects
            const users: User[] = JSON.parse(fileData);
            
            return users;
        } catch (error) {
            console.error('Error reading users from file:', error);
            return [];
        }
    }
    // Function to write users from the JSON file
    writeUsersToFile(): void {
        try {
            // Convert users array to JSON string
            const jsonData = JSON.stringify(this.users, null, 2); // null and 2 for formatting
            
            // Write JSON string to the file
            fs.writeFileSync(this.userFile, jsonData, 'utf-8');
            
            console.log('Users data has been written to the file successfully.');
        } catch (error) {
            console.error('Error writing users to file:', error);
        }
    }
}