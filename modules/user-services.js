// usersService.js
/// 
/// Calls repo to add/get users
/// 
class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    addUser(user) {
        return this.usersRepository.add(user);
    }

    getUsers(page, limit) {
        const users = this.usersRepository.getAll();
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        return users.slice(startIndex, endIndex);
    }
}

//module.exports = UsersService;
export default UsersService;