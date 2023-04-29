const express=require('express');
const userController=require('../controllers/userController');
const isAuth=require('../middlewares/isAuth');
const router=express();

router.post('/signup',userController.signup);
router.post('/login',userController.login);
router.get('/autoLogin',userController.autoLogin);
router.post('/verifyEmail',userController.verifyEmail);
router.get('/googleAuth',userController.googleAuth);
module.exports=router;