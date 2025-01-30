const { log } = require('console')
const http = require('http')
const url= require('url')


const myServer= http.createServer((req,res)=>{
    // log(req.url)
    log("server started")
    const my_url = url.parse(req.url, true)
    const userName = my_url.query.username

    log(my_url)


    res.end(`Hi ${userName}! Response Recived from server`)

})

myServer.listen(3000)


