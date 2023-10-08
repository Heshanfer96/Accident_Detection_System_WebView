const express = require('express');
const router = express.Router();
const controller = require('../controller/UserController');
const auth =require('../middleware/auth/auth');

module.exports = function () {

    router.post('/register',controller.addUsers );

    router.post('/login',controller.loginUser );

    router.get('/authtest',auth,controller.authtest)

    return router;
}