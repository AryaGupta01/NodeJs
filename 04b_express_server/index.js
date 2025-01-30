const express = require("express");

const app = express();

app.get('/',(req,res)=>{
    return res.end("Hello from Server");

});

app.get("/about", (req,res)=>{
    res.end(`${req.query.name}`);
});

app.listen(3000,()=>{
    console.log('server started')
});