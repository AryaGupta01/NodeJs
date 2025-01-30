const express = require('express');
const {handleGetAllUser,handelpostUser,handelpatchUser,handelgetUserById,handeldeleteUser} = require('../controller/user')

const router = express.Router();

router.route('/')
.get(handleGetAllUser)
.post(handelpostUser);

router
.route(`/:id`)
.get(handelgetUserById)
.delete(handeldeleteUser)
.patch(handelpatchUser)

module.exports= router;
