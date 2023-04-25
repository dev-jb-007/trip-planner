const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const jwt=require('jsonwebtoken');
const userSchema=new Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    password:{
        type:String
    },
})
userSchema.methods.createAuthToken=async function(){
    const user=this;
    const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
    return token;
}
module.exports=mongoose.model('user',userSchema);
