
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

//
// Create and get users from file
//

class UsersRepository {
    constructor(filePath) {
        this.filePath = filePath;
    }

    getAll() {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data);
    }

    add(user) {
        const users = this.getAll();

        if (users.some(u => u.email === user.email)) {
            throw new Error('Ya existe un usuario con este email.');
        }

        users.push({ id: uuidv4(), ...user });
        fs.writeFileSync(this.filePath, JSON.stringify(users));
        return user;
    }
}

//module.exports = UsersRepository;
export default UsersRepository;