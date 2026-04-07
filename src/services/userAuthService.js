const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefereshToekn } = require("../utils/token");

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
    const paylod = { id: user._id, role: user.role };

    const accessToken = generateAccessToken(paylod);
    const refereshToken = generateRefereshToekn(paylod);

    user.refereshToken = refereshToken;
    user.save();

    return { accessToken, refereshToken };
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

exports.refreshAccessToken = async (token) => {
    if (!token) throw Object.assign(new Error("No refresh token"), { statusCode: 401 });

    // Verify the token signature first
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch {
        throw Object.assign(new Error("Invalid or expired refresh token"), { statusCode: 401 });
    }

    // Check token exists in DB (this is what allows revocation)
    const user = await User.findOne({ _id: decoded.id, refreshToken: token });
    if (!user) throw Object.assign(new Error("Token revoked or not found"), { statusCode: 401 });

    const newAccessToken = generateAccessToken({ id: user._id, role: user.role });

    return { accessToken: newAccessToken };
};

exports.logoutUser = async (userId) => {
    await User.findByIdAndUpdate(userId, { refreshToken: null });
};