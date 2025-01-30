const express = require('express');
const { handelPostUrl } = require('../controller/url');
const Url = require('../models/user');


const router = express.Router();

router.post('/',handelPostUrl);
// router.get('/:shortId',handelGetReq);

module.exports = router;