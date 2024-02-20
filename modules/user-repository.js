
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
//
// Create and get users from file
//

class UsersRepository {
    constructor(filePath) {
        this.filePath = filePath;
        //this.createFileIfNotExists();
    }

    createFileIfNotExists() {
        console.log(this.filePath);
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, '[]');
        }
    }

    getAll() {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data);
    }

     // Add a new user to the file
    add(user) {
        const { name, email, address } = user;
        const errors = [];

        // Validate email
        if (!email || !this.validateEmail(email)) {
            errors.push('Email is required and should have a valid format.');
        }

        // Validate name
        if (!this.validateName(name)) {
            errors.push('Name must have more than 6 characters and should not contain special characters.');
        }

        const users = this.getAll();

        if (users.some(u => u.email === email)) {
            errors.push('A user with this email already exists.');
        }

        if (errors.length > 0) {
            throw { status: 400, message: 'Validation errors', errors };
        }

        users.push({ id: uuidv4(), name, email, address });
        fs.writeFileSync(this.filePath, JSON.stringify(users));
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