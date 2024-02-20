// cusers controller
class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }

    addUser(req, res) {
        const { name, email, address } = req.body;
        const user = { name, email, address };

        try {
            const newUser = this.usersService.addUser(user);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    getUsers(req, res) {
        const { page = 1, limit = 10 } = req.query;

        try {
            const users = this.usersService.getUsers(page, limit);
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor.' });
        }
    }
}

//module.exports = UsersController;
export default UsersController;