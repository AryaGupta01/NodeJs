const http = require('http')

const fs = require('fs')

const my_server = http.createServer((req, res)=>{
    const log = `${Date.now()}, ${req.url}, New Req Recived\n`
    fs.appendFile('log.txt',log,(data,err)=>{
        switch(req.url){
            case '/': res.end("This is Home Page");
                break;
            case '/about': res.end("This is About Page");
                break;
            default: res.end("ERROR 404, Page Note Found");
                break;
        }
    })
    // console.log('req recived');
    // res.end('Hello from server')

    
})

my_server.listen(8000)

// my_server.end('Server Ends')
