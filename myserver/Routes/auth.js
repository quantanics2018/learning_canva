const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

// router.post('/login', authController.login);

router.post('/user_login', authController.login);

router.post('/apidate',authController.getdata);

router.post('/user_registeration',authController.signup);

module.exports = router;
