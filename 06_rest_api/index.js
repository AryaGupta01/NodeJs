const express = require('express')
const app = express();
const data = require('./MOCK_DATA.json')
app.get('/user', (req, res)=>{
    console.log("requested from server");
    
    res.json(data);
    
})
app.get('/user/:id', (req, res)=>{
    const id = req.params.id;
    const user = data.find(user => user.id == id);
    res.json(user);
    
})
app.post('/user', (req, res)=>{
    res.send("Post request");
    
})

const port = 8000;
app.listen(port, ()=>{
    console.log(`server Started on port ${port}`);
    
})