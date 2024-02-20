// usersServiceFactory.js
const UsersService = require('./users-services.js');

class UsersServiceFactory {
    static create(usersRepository) {
        return new UsersService(usersRepository);
    }
}

module.exports = UsersServiceFactory;