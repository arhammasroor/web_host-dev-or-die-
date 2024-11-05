const mongoose = require("mongoose");


const loginSchema = new mongoose.Schema({
    username: {
        type:String,
        require: true,

    },
    password:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        
    }
   
    
})

const login = mongoose.model("login",loginSchema);
//now export it
module.exports = login;