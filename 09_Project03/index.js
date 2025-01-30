const express = require("express");

const {connectMongoDb} = require('./connection')
const {logReqRes} = require('./middlewares/')
const userRouter = require('./routes/user')

const PORT = 5000;
const app= express();

// Database Connection
connectMongoDb('mongodb://127.0.0.1:27017/09_PROJECT02');


// Middlewares - log
app.use(express.urlencoded({extended: false}));
app.use(logReqRes("log.txt"));



// routes
app.use('/api/user',userRouter);

app.listen(PORT,()=> console.log("Server Started"));
