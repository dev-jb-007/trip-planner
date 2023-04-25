const User=require('../models/user');
const sendMail=require("../config/sendMail");
exports.signup=async (req,res,next)=>{
    try{
        let user=new User(req.body);
        let token=await user.createAuthToken();
        await user.save();
        let token2=await user.createAuthToken();
        sendMail.sendEmailVerificationMail(user.email,user.name,"http://localhost:4200/user/verification?token="+token2);
        res.status(200).json({
            name:user.name,
            email:user.email,
            token,
            err:false
        });
    }
    catch(err){
        err.status=403;
        next(err);
    }
}
exports.verifyEmail=async (req,res,next)=>{
    try{
        let token=req.body.token;
        var base64Payload = token.split(".")[1];
        var payloadBuffer = Buffer.from(base64Payload, "base64");
        const {_id} = JSON.parse(payloadBuffer.toString());
        const user=await User.findById(_id);
        
        if(!user){
            throw new Error('User Not Found');
        }
        user.isVerified=true;
        await user.save();
        res.status(200).json({
            status:"Done"
        })
    }
    catch(err){
        err.status=403;
        next(err);
    }
}
exports.login=async (req,res,next)=>{
    try{
        let user=await User.findOne({email:req.body.email});
        if(user.password==req.body.password){
            let token=await user.createAuthToken();
            res.status(200).json({
                name:user.name,
                email:user.email,
                token
            })
        }
        else{
            throw new Error('Invalid Credentials');
        }
    }
    catch(err){
        err.status=403;
        next(err);
    }
}
exports.autoLogin=async (req,res,next)=>{
    try{
        let token=req.headers.authentication;
        var base64Payload = token.split(".")[1];
        var payloadBuffer = Buffer.from(base64Payload, "base64");
        const {_id} = JSON.parse(payloadBuffer.toString());
        const user=await User.findById(_id);
        if(!user){
            throw new Error('User Not Found');
        }
        res.status(200).json({
            name:user.name,
            email:user.email,
            token
        });
    }
    catch(err){
        err.status=403;
        next(err);
    }
}