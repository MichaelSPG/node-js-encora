// usersRouter.js
import express from 'express';
import UsersController from'./user-controller.js';
import UsersControllerFactory from'../modules/users-repository-factory.js';
import UsersRepository from'../modules/user-repository.js';


const router = express.Router();


class UsersRouter {
    constructor() {
        this.router = express.Router();
        this.usersController = new UsersController();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.post('/', (req, res) => this.usersController.addUser(req, res));
        this.router.get('/', (req, res) => this.usersController.getUsers(req, res));
    }

    getRouter() {
        return this.router;
    }
}


//module.exports = router;
export default UsersRouter;