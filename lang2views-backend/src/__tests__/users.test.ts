import { Users } from '../users';
import fs from 'fs';

const userFile = 'testUsers.json';

describe('Users Tests', () => {
    // Delete test user file after each test
    afterEach(() => {
        jest.clearAllMocks();
        fs.unlink(userFile, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return;
            }
            console.log('File deleted successfully');
        });
    })
    beforeEach(() => {
        // Create 50 test users before each test
        let users = new Users(userFile);
        for(let i = 1; i < 51; ++i){
            users.createNewUser({username:`testUser${i}`,password:`testPassword${i}`})
        }
        users.writeUsersToFile();
    })
    it('WriteFileSync Throw', async () => {
        let users = new Users(userFile);
        // Create a spy on fs.writeFileSync
        const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync');
        // Mock the behavior of writeFileSync to throw an error
        writeFileSyncSpy.mockImplementation(() => {
            throw new Error('Mocked error');
        });
        users.writeUsersToFile();
        writeFileSyncSpy.mockRestore();
    })
    it('Add User', async () => {
        let users = new Users(userFile);

        users.createNewUser({username:'testUser', password:'testPassword'});
        users.createNewUser({username:'testUser1', password:'testPassword1'});
        users.createNewUser({username:'testUser2', password:'testPassword2'});
        users.writeUsersToFile();
    })
    it('Remove User', () => {
        let users = new Users(userFile);
        
        users.removeUser({username:'testUser1',password:'testPassword1'});
        users.writeUsersToFile();

        // User not found
        users.removeUser({username:'testUser51',password:'testPassword51'});
    })
    it('Change User', () => {
        let users = new Users(userFile);

        users.updateUser({username:'testUser1',password:'testPassword1'},{username:'testUser51',password:'testPassword51'});
        users.updateUser({username:'testUser2',password:'testPassword2'},{username:'testUser3',password:'testPassword3'});
        users.writeUsersToFile();
    })
    it('Authenticate', () => {
        let users = new Users(userFile);

        // Success
        let result = users.authenticate({username:'testUser3',password:'testPassword3'});
        console.log(result);

        // Incorrect Password
        result = users.authenticate({username:'testUser2',password:'testPassword3'});

        // User not found
        result = users.authenticate({username:'testUser51',password:'testPassword51'});
    })
})
