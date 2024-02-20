// usersService.js
/// 
/// Calls repo to add/get users
/// 
class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    async addUser(user) {
        return await this.usersRepository.add(user);
    }

    async getUsers(page, limit) {
       
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const users = await this.usersRepository.getAll();
        return users.slice(startIndex, endIndex);
    }
}

//module.exports = UsersService;
export default UsersService;