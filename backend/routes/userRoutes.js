const express=require('express');
const userController=require('../controllers/userController');
const router=express();

router.post('/signup',userController.signup)
router.post('/login',userController.login)
router.get('/autoLogin',userController.autoLogin)
router.post('/verifyEmail',userController.verifyEmail);
module.exports=router;