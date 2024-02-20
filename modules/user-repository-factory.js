// UsersRepositoryFactory.js
import UsersRepository  from './user-repository.js';
//const UsersRepository = require('./user-repository');

class UsersRepositoryFactory  {
    static create(filePath) {
        return new UsersRepository(filePath);
    }
}

//module.exports = UsersRepositoryFactory ;
export default UsersRepositoryFactory ;