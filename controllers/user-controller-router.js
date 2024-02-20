// usersRouter.js
import express from 'express';
import UsersController from'./user-controller.js';



const router = express.Router();


class UsersRouter {
    constructor() {
        this.router = express.Router();        
        this.usersController = new UsersController();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.post('/', async (req, res) => await this.usersController.addUser(req, res));
        this.router.get('/', async (req, res) => await this.usersController.getUsers(req, res));
    }

    getRouter() {
        return this.router;
    }

    setUsersService(usersService) {
        this.usersController.setUsersService(usersService);
    }

}


//module.exports = router;
export default new UsersRouter();