// 
import UsersService  from './user-services.js';

class UsersRepositoryFactory {
    static create(usersRepository) {
        return new UsersService(usersRepository);
    }
}

//module.exports = UsersService;
export default UsersRepositoryFactory;