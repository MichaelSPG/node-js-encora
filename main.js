import express from 'express';
import dotenv from 'dotenv';

import usersRouter from './controllers/user-controller-router.js';
import bodyparser  from 'body-parser';

const app = express();
const PORT = 5050;

dotenv.config(); // Loads the environment values from .env

app.use(bodyparser.urlencoded({extended: false}));
app.use(express.json());

app.use('/user', usersRouter); // Usa el enrutador de usuarios

app.listen(PORT, () => {
    console.log(`Encora demo server runnina at http://localhost:${PORT}`);
});