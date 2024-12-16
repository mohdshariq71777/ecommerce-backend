const express = require('express');
const router = express.Router();
const authController=require('../controllers/auth')
/* GET users listing. */
router.post('/signup',authController.signup);
router.post('/login',authController.login)
module.exports = router;
