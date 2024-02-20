import { Console } from "console";

// cusers controller
class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }

    async addUser(req, res) {
        const { name, email, address } = req.body;
        const user = { name, email, address };

        try {
            const newUser = await this.usersService.addUser(user);
            res.status(201).json({success: true, message: newUser, errors : []});
        } catch (error) {
            res.status(400).json({ message: {}, success: false, errors : [`${error}`]});
        }
    }

    async getUsers(req, res) {
        const { page = 1, limit = 10 } = req.query;
        try {
            const users = await this.usersService.getUsers(page, limit);
            res.json({success: true, message: users, errors : []});
        } catch (error) {
            res.status(500).json({ message: {}, success: false, errors : [`${error}`]});
        }
    }

    setUsersService(usersService) {
        this.usersService = usersService;
    }
}

//module.exports = UsersController;
export default UsersController;