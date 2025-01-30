const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {connectToMongodb}= require('./connect')
const urlRouter = require('./routes/url');
const Url= require('./models/user')

connectToMongodb('mongodb://127.0.0.1:27017/11_Url_shortner').then(()=> console.log("MongoDB connected"));

// middleware
app.use(express.json());

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


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})