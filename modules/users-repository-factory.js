// usersServiceFactory.js
import UsersService from './user-services.js';

class UsersServiceFactory {
    static create(usersRepository) {
        return new UsersService(usersRepository);
    }
}

//module.exports = UsersServiceFactory;
export default UsersServiceFactory;