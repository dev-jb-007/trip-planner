const User=require('../models/user');
const axios = require('axios');
async function verify(token) {
    let response=await axios.get('https://oauth2.googleapis.com/tokeninfo?id_token='+token)
    return response.data;
}
exports.isAuth=async(req,res,next)=>{
    try{
        let token=req.headers.authentication;
        let type=req.headers.type;
        if(type=='google'){
            verify(token).then(async (data)=>{
                const user=await User.findOne({email:data.email});
                if(user){
                    next(user);
                }
                else{
                    throw new Error('Please Register');
                }
            }).catch(err=>{
                throw new Error('Please Authenticate');
            });
        }
        else{
            var base64Payload = token.split(".")[1];
            var payloadBuffer = Buffer.from(base64Payload, "base64");
            const {_id} = JSON.parse(payloadBuffer.toString());
            const user=await User.findById(_id);
            if(!user){
                throw new Error('Please Authenticate');
            }
            else{
                next(user);
            }
        }
    }
    catch(err){
        next(err);
    }
}
