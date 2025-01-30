const express = require("express");
const PORT = 5000;
const app= express();
const mongoose = require("mongoose");

// Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/08_PROJECT02")
.then(()=>console.log("Database Connected"))
.catch((err)=>console.log(err));

// Schema
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

app.use(express.urlencoded({extended: false}));

app.post('/api/user',async(req,res)=>{
    const body = req.body;
    const result = await user.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
    })

    return res.status(201).json({msg: "User Created"});
})

app.get('/api/user', async (req, res) => {
    const allUsers = await user.find({});
    res.json(allUsers);
})

app.route(`/api/user/:id`)
.get(async (req, res) => {
    // const id = Number(req.params.id);
    const idUser = await user.findById(req.params.id);
    return res.json(idUser.first_name);
}).delete(async (req, res) => {
    await user.findByIdAndDelete(req.params.id);
    return res.end("Success");
}).patch(async (req, res) => {
    
    const body = req.body;
    await user.findByIdAndUpdate(req.params.id,{last_name: body.last_name});
    
    return res.end("Sucess");
})

app.listen(PORT,()=> console.log("Server Started"));
