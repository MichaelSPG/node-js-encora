// usersRouter.js
const express = require('express');
const UsersController = require('./user-controller');

const router = express.Router();
const usersController = new UsersController();

router.post('/', (req, res) => usersController.addUser(req, res));
router.get('/', (req, res) => usersController.getUsers(req, res));

module.exports = router;