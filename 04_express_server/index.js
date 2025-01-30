const express = require('express')

const app = express()
app.get('/', (req, res)=>{
    console.log("requested from server");
    res.end(`Hello from server`);
    
})
app.get('/user', (req, res)=>{
    console.log("requested from server");
    res.end(`Hello from server ${req.query.name}`);
    
})

app.listen(8000, ()=>{
    console.log('server Started>>>');
    
})