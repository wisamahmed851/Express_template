const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error("User Not Found");
        error.statusCode = 404;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error("Invalid credentialas");
        error.statusCode = 403;
        throw error;
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
    );

    return token;
}

exports.register = async (data) => {
    const user = await User.create(data);
    return user;
};


exports.getUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return user;
};

// 👇 new
exports.updateProfile = async (id, data) => {
    // prevent these fields from being updated through profile update
    delete data.password;
    delete data.status;
    delete data.email;

    const user = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return user;
};