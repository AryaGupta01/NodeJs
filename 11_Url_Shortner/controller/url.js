const shortid = require('shortid');
const Url = require('../models/user');



async function handelPostUrl(req,res) {
    const body = req.body;  
    if(!body.url){
        return res.status(400).send({message: 'URL is required'});
    }
    const shortID = shortid();
    await Url.create({
        shortUrl: shortID,
        redirectUrl: body.url,
        visitHistory: []
    })

    return res.json({id: shortID});
}

// async function handelGetReq


module.exports = {
    handelPostUrl,
    // handelGetReq,
}