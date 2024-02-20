
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

//
// Create and get users from file
//

class UsersRepository {
    constructor(filePath) {
        this.filePath = filePath;
        this.createFileIfNotExists();
        this.writeLock = false;
    }

    createFileIfNotExists() {
        
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([]));
        }
    }

    async getAll() {
        const data = await readFileAsync(this.filePath, 'utf8');
        return JSON.parse(data);
    }

     // Add a new user to the file
     async add(user) {
        let users;
        user.email = user.email.trim().toLowerCase();
        user.name = user.name.trim();
        user.address = user.address.trim();

        const { name, email, address } = user;
        
        // Validate name
         if (!this.validateName(name)) {
            throw Error ('Name must have more than 6 characters and should not contain special characters.');
        }

        // Validate email
        if (!email || !this.validateEmail(email)) {
            throw Error ('Email is required and should have a valid format.');
        }
       
        while (this.writeLock) {
            await new Promise(resolve => setTimeout(resolve, 100));            
        }
        this.writeLock = true;
        try {
            users = await this.getAll();
            if (users.some(u => u.email === email)) {
                throw new Error('A user with this email already exists.');
            }
            users.push({ id: uuidv4(), name, email, address });
            await writeFileAsync(this.filePath, JSON.stringify(users));
        } finally {
            this.writeLock = false;
        }
        return user;
    }

    // Validate email format
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate name
    validateName(name) {
        return name.length > 6 && /^[a-zA-Z0-9\s]+$/.test(name);
    }
}

//module.exports = UsersRepository;
export default UsersRepository;