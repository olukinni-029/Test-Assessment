module.exports = app => {
const users = require("../controller/userController.js");
const router = require('express').Router();

router.post('/SignUp',users.createUser);
router.post('/login',users.userLogin);
router.get('/',users.getAllUser);
router.get('/:userId',users.viewUser);

app.use('/api/users',router)
};