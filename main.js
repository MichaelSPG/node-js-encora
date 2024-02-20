import express from 'express';
import dotenv from 'dotenv';
import UsersServiceFactory  from'./modules/user-services-factory.js';
import UsersRepositoryFactory  from'./modules/user-repository-factory.js';
import UsersRouter  from './controllers/user-controller-router.js';
import bodyparser  from 'body-parser';
import path  from 'path';

const app = express();
const PORT = 5050;
const usersRouter = UsersRouter;

dotenv.config(); // Loads the environment values from .env


// Create instances using factories
const basePath = process.cwd();
const usersJsonPath = path.join(basePath,  process.env.USERS_JSON_PATH || 'encorea-demo-users.json');;
const usersRepository = UsersRepositoryFactory.create(usersJsonPath);

const usersService = UsersServiceFactory.create(usersRepository);


usersRouter.setUsersService(usersService);
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.json());

app.use('/user', usersRouter.getRouter()); // Usa el enrutador de usuarios

app.listen(PORT, () => {
    console.log(`Encora demo server runnina at http://localhost:${PORT}`);
});
