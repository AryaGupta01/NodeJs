const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {connectToMongodb}= require('./connect')
const urlRouter = require('./routes/url');
const Url= require('./models/user')
const path = require('path');

connectToMongodb('mongodb://127.0.0.1:27017/11_Url_shortner').then(()=> console.log("MongoDB connected"));

// middleware
app.use(express.json());

// view engine
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

// router
app.use('/url',urlRouter);  
app.get('/url/:shortId',async(req,res)=> {
    const shortUrl = req.params.shortId;
    const entry = await Url.findOneAndUpdate({
        shortUrl,
    },{
        $push:{
            visitHistory:{
                timestamp: Date.now(),
            }
        }
    });
    console.log(entry);
    
    console.log(entry.redirectUrl);
    
    res.redirect(entry.redirectUrl);
    
}
)

app.get('/test',async (req,res)=>{
    return res.render('home');
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})