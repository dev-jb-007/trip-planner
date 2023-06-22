const User=require('../models/user');
const sendMail=require("../config/sendMail");
const axios = require('axios');
async function verify(token) {
    let response=await axios.get('https://oauth2.googleapis.com/tokeninfo?id_token='+token)
    return response.data;
}
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
        let type=req.headers.type;
        let isError=false;
        if(!token||!type){
            throw new Error("Please Authenticate");
        }
        if(type==="google"){
            let response=await verify(token);
            const user=await User.findOne({email:response.email});
            if(user){
                res.status(200).json({
                    name:user.name,
                    email:user.email,
                    token
                });
            }
            else{
                throw new Error('Please Register');
            }
        }
        else{
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
        if(isError==true){
            throw new Error("Please Authenticate");
        }
    }
    catch(err){
        console.log(err);
        err.status=403;
        next(err);
    }
}
exports.googleAuth=async (req,res,next)=>{
    try{
        let token=req.headers.authentication;
        verify(token).then(async (data)=>{
            const user=await User.findOne({email:data.email});
            if(user){
                res.send({
                    name:user.name,
                    email:user.email,
                    token
                });
            }
            else{
                let temp=new User({name:data.name,email:data.email,isVerified:true});
                await temp.save();
                res.send({
                    name:user.name,
                    email:user.email,
                    token
                })
            }
        }).catch(err=>{
            err.status=403;
            next(err);
        });
    }
    catch(err){
        err.status=403;
        next(err);
    }
}