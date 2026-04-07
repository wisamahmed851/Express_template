const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginUser, getUserById, register, updateProfile } = require("../services/userAuthService")

exports.login = async (req, res, next) => {
    try {
        const token = await loginUser(req.body);
        return res.status(200).json({
            status: true,
            message: "Login successful",
            token: token,
        });
    } catch (err) {
        next(err);
    }
}

exports.register = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.image = req.file.filename;
        }

        const user = await register(req.body);
        return res.status(200).json({
            status: true,
            message: "register successfully",
            data: user,
        });
    } catch (err) {
        next(err);
    }
}

exports.profile = async (req, res, next) => {
    try {
        const user = await getUserById(req.user.id);
        return res.status(200).json({
            status: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (err) {
        next(err)
    }
};

// 👇 new
exports.updateProfile = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.image = req.file.filename;
        }
        const user = await updateProfile(req.user.id, req.body);
        return res.status(200).json({
            status: true,
            message: "Profile updated successfully",
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

exports.refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        const data = await refreshAccessToken(refreshToken);
        res.json({ status: true, ...data });
    } catch (err) {
        next(err);
    }
};

exports.logout = async (req, res, next) => {
    try {
        await logoutUser(req.user.id); // authMiddleware runs before this
        res.json({ status: true, message: "Logged out successfully" });
    } catch (err) {
        next(err);
    }
};