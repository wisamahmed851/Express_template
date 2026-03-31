const User = require("../models/userModel")

exports.createUser = async (req, res) => {
    try{
        if(req.file){
            req.body.image = req.file.path;
        }
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            data: user
        });
    }catch(err){
        console.log(err);
    }
};

exports.getUsers = async(req, res) => {
    const users = await User.find();
    res.json(users);
};

exports.getUser = async(req, res) => {
    const users = await User.findById(req.params.id);
    res.json(users);
};


exports.updateUser = async(req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after"});
    res.json(user);
}

exports.deleteUser = async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json("user deleted successfully");
}