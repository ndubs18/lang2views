import { Users } from '../users';
import fs from 'fs';

const userFile = 'testUsers.json';

describe('Users Tests', () => {
    afterEach(() => {
        // Delete test user file after each test
        jest.clearAllMocks();
        if(fs.existsSync(userFile)){
            fs.unlink(userFile, (err) => {
                if(err){

                }
            });
        }

    })
    beforeEach(() => {
        // Create 50 test users before each test
        let users = new Users(userFile);
        let testUsers = createTestUsers();

        for(let testUser of testUsers){
            users.createNewUser(testUser);
        }
        users.writeUsersToFile();
    })
    it('Add User', () => {
        let users = new Users(userFile);

        let result = users.createNewUser({username:'testUser', password:'testPassword'});
        expect(result).toEqual('User created');
        result = users.createNewUser({username:'testUser1', password:'testPassword1'});
        expect(result).toEqual('Username already exists.');
        result = users.createNewUser({username:'testUser2', password:'testPassword2'});
        expect(result).toEqual('Username already exists.');
        users.writeUsersToFile();

        let resultUsers = readUsersFromFile(userFile);
        let testUsers = createTestUsers();
        testUsers.push({username:'testUser',password:'testPassword'})
        expect(resultUsers).toEqual(testUsers);
    })
    it('Remove User', () => {
        let users = new Users(userFile);
        
        let result = users.removeUser({username:'testUser1',password:'testPassword1'});
        expect(result).toEqual(true);
        users.writeUsersToFile();

        let resultUsers = readUsersFromFile(userFile);
        let testUsers = createTestUsers();
        removeTestUser(testUsers,{username:'testUser1',password:'testPassword1'})

        expect(resultUsers).toEqual(testUsers);

        // User not found
        result = users.removeUser({username:'testUser51',password:'testPassword51'});
        expect(result).toEqual(false);
    })
    it('Change User', () => {
        let users = new Users(userFile);

        let result = users.updateUser({username:'testUser1',password:'testPassword1'},{username:'testUser51',password:'testPassword51'});
        expect(result).toEqual('User edited.')
        result = users.updateUser({username:'testUser2',password:'testPassword2'},{username:'testUser3',password:'testPassword3'});
        expect(result).toEqual('New username already exists.')
        users.writeUsersToFile();

        let resultUsers = readUsersFromFile(userFile);
        let testUsers = createTestUsers();
        testUsers[0].username = 'testUser51';
        testUsers[0].password = 'testPassword51';
        expect(resultUsers).toEqual(testUsers);
    })
    it('Authenticate', () => {
        let users = new Users(userFile);

        // Success
        let result = users.authenticate({username:'testUser3',password:'testPassword3'});
        expect(result).toEqual(true);

        // Incorrect Password
        result = users.authenticate({username:'testUser2',password:'testPassword3'});
        expect(result).toEqual(false);

        // User not found
        result = users.authenticate({username:'testUser51',password:'testPassword51'});
        expect(result).toEqual(false);
    })
})

// Function to read users from the JSON file
function readUsersFromFile(filePath: string): {username,password}[] {
    try {
        // Read the JSON file
        if(fs.existsSync(userFile)){
            const fileData = fs.readFileSync(filePath, 'utf-8');
            // Parse JSON data into an array of User objects
            const users = JSON.parse(fileData);

            for(let user of users){
                const decodedPassword = Buffer.from(user.password, 'base64').toString('utf-8');
                user.password = decodedPassword;
            }
            
            return users;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error reading users from file:', error);
        return [];
    }
}

function createTestUsers():{username,password}[]{
    // Create 50 test users
    let users = []
    for(let i = 1; i < 51; ++i){
        users.push({username:`testUser${i}`,password:`testPassword${i}`})
    }
    return users;
}

function removeTestUser(users:{username,password}[],{username,password}){
    // Find the index of the user with the specified username
    const index = users.findIndex(user => user.username === username);

    // If the user is found, remove it from the array
    if (index !== -1) {
        users.splice(index, 1);
        return true;
    } else {
        console.log(`User ${username} not found.`);
        return false;
    }
}
