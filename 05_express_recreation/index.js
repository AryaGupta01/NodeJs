const express = require('express')
const app = express()
const fs = require('fs')

app.get('/', (req, res)=>{
    console.log("requested from server");
    res.end(`Hello from server`);
    fs.appendFile('log.txt',`hello`,(data,err)=>{
        if(err) console.log(err);
    })
    
})
app.get('/user', (req, res)=>{
    console.log("requested from server");
    
    res.end(`Hello from server ${req.query.name}`);
    
})  
app.listen(8000, ()=>{
    console.log('server Started>>>');
    
})
