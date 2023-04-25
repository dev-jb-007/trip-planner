const express=require('express');
const app=express();
const mongoose=require('mongoose');
var cors = require('cors');
require('dotenv').config();


//Routers Imports
const userRoutes=require("./routes/userRoutes");


//Middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//DataBase Connections
mongoose.connect(process.env.MONGODB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Succesfully Connected to Database");
}).catch(err=>{
    console.log(err);
});

app.get('/',(req,res)=>{
    res.send("Hello");
})

//Routes
app.use('/user',userRoutes);

app.use(function (err, req, res, next) {
    res.status(err.status||500).send({error:err.message,err:true});
})
app.listen(process.env.PORT || 3000,(err)=>{
    if(err)
    {
        console.log('There is an error');
    }
    else{
        console.log('Server Started on port 3000');
    }
})