const express = require('express');
const user = require('./MOCK_DATA.json');
const app = express();
const PORT = 7000;
const fs = require('fs');
const { log } = require('console');
const mongoose = require('mongoose');
const { type } = require('os');

// mongoose connection

mongoose.connect("mongodb://127.0.0.1:27017/01_project01")
.then(()=> console.log("Database Connected"));

// mongoose schema
const userScema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,

    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    }
})

// mongoose model
const User = mongoose.model("user",userScema);
app.use(express.urlencoded({extended: false}));


// app.use((req,res,next)=>{
//     console.log("hello from middleware 1");
//     next();
    
// })
// app.use((req,res,next)=>{
//     console.log("hello from middleware 2");
//     res.end("MddleWare Interfare");
//     next();    
// })
app.get('/api/user', (req, res) => {
    res.setHeader("name","arya");
    const h = "x-api-key";
    log(req.headers.h);
    res.json(user);
    
    

})

app.route(`/api/user/:id`).get((req, res) => {
    const id = Number(req.params.id);
    const idUser = user.find((user) => user.id === id);
    return res.json(idUser);
}).delete((req, res) => {
    const id = Number(req.params.id);
    user.splice(id-1,1);
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(user),(err,data) => {
        // if (err) throw err;
        console.log('The "data is deleted" was appended to file!');
        return res.json({resposne: "Deleted", id: id});
      });
    // return res.end("Pending");
}).patch((req, res) => {
    const id = Number(req.params.id);
    user.splice(id-1,1);
    const body = req.body;
    console.log(body);
    user.push({...body,id: id})
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(user),(err,data) => {
        // if (err) throw err;
        console.log('The "data is deleted" was appended to file!');
        return res.json({resposne: "Deleted", id: id});
      });
    
    // return res.end("Pending");
})


app.post('/api/user', (req, res) => {
    const body = req.body;
    console.log(body);
    user.push({...body,id: user.length+1})
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(user),(err,data) => {
        // if (err) throw err;
        console.log('The "data to append" was appended to file!');
        return res.status(201).json({resposne: "Completed: at", id: user.length+1});
      });
    
})


app.listen(PORT, () => console.log('Server Started'));