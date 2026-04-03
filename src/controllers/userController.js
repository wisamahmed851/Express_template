const User = require("../models/userModel")
const bcrypt = require("bcrypt")
exports.createUser = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.filename;
        }
        // if(req.body.password){
        //     const salt = await bcrypt.genSalt(10);
        //     req.body.password = await bcrypt.hash(req.body.password, salt);
        // }
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            data: user
        });
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({
                error: "Email already exists"
            });
        }
        console.log(err.message);
        return res.status(500).json({
            status: true,
            error: err.message
        });

    }
};

exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

exports.getUser = async (req, res) => {
    const users = await User.findById(req.params.id);
    res.json(users);
};


exports.updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });
    res.json(user);
}

exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json("user deleted successfully");
}