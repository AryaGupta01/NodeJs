const mongoose = require("mongoose");

const userScema = mongoose.Schema({
    first_name:{
        type: String,
        required: true,
    },
    last_name:{
        type: String,

    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    
    
    
},
{timestamps:true}
);


// model
const user = mongoose.model("user",userScema);

module.exports= user;

