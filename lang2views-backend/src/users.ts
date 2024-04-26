import fs from 'fs';

interface User {
    username: string;
    password: string;
}

export class Users {
    private users:User[] = []
    private userFile:string = '';

    constructor(userFile:string){
        this.users = this.readUsersFromFile(userFile);
        this.userFile = userFile;
    }

    // Add new user to user list
    public createNewUser(newUser:User){
        let match = false;
        for(let user of this.users){
            if(user.username === newUser.username){
                match = true;
            }
        }
        if(match === false){
            const encodedPassword = Buffer.from(newUser.password).toString('base64');
            this.users.push({
                username:newUser.username,
                password:encodedPassword
            });
            return 'User created';
        } else {
            return 'Username already exists.';
        }
    }
    // Update user in list
    public updateUser(oldUser:User, newUser:User){
        let match = false;
        for(let user of this.users){
            if(user.username === newUser.username){
                match = true;
            }
        }
        if(!match){
            const encodedPassword = Buffer.from(newUser.password).toString('base64');
            for(let user of this.users){
                if(user.username === oldUser.username){
                    user.username = newUser.username;
                    user.password = encodedPassword;
                    return 'User edited.';
                }
            }
        } else {
            return 'New username already exists.'
        }
    }
    public removeUser(removeUser:User){
        // Find the index of the user with the specified username
        const index = this.users.findIndex(user => user.username === removeUser.username);

        // If the user is found, remove it from the array
        if (index !== -1) {
            this.users.splice(index, 1);
            return true;
        } else {
            console.log(`User ${removeUser.username} not found.`);
            return false;
        }
    }
    // Check users for username and password match ( Login )
    public authenticate(loginUser:User):boolean{
        for(let user of this.users){
            if(user.username === loginUser.username){
                const encodedPassword = Buffer.from(loginUser.password).toString('base64');
                if(user.password == encodedPassword){
                    return true;
                } else {
                    return false;
                }
            }
        }
        return false;
    }
    // Function to read users from the JSON file
    private readUsersFromFile(filePath: string): User[] {
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
    // Function to overwrite users to the JSON file
    public writeUsersToFile(): void {
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