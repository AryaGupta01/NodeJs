const http = require('http');
const fs = require('fs');
const 

const myServer = http.createServer((req,res)=> {
    const log =`Request recived ${Date.now()} from ${req.url}\n`;
    fs.appendFile("./log.txt",log,(err,data)=>{
        res.end('Hello from server');
    })

})

myServer.listen(3000,()=> console.log("server started"));
