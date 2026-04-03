const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User Not found",
            });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            res.status(1).json({
                status: false,
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.jWT_SECRET,
            { expiresIn: "1d" },
        )
        return res.status(200).json({
            status: true,
            message: "Login successful",
            token: token,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            error: err
        });
    }
}

exports.profile = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.user.id });
        if (!user) {
            res.status(404).json({
                status: false,
                message: "user not found"
            });
        }
        return res.status(200).json({
            status: true,
            message: "User Fetched successfully",
            data: user
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: false,
            error: err
        });
    }
}