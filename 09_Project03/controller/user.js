const user = require('../models/user');

async function handleGetAllUser(req, res) {
    const allUsers = await user.find({});
    res.json(allUsers);
}

async function handelpostUser(req, res) {
    const body = req.body;
    const result = await user.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
    })

    return res.status(201).json({ msg: "User Created" });
}

async function handelgetUserById(req,res) {
    const idUser = await user.findById(req.params.id);
    return res.json(idUser.first_name);
    
}

async function handeldeleteUser(req,res) {
    await user.findByIdAndDelete(req.params.id);
    return res.end("Success");
}

async function handelpatchUser(req,res) {
    const body = req.body;
    await user.findByIdAndUpdate(req.params.id,{last_name: body.last_name});
    
    return res.end("Sucess");
}

module.exports = {
    handleGetAllUser,
    handelpostUser,
    handelgetUserById,
    handeldeleteUser,
    handelpatchUser
}