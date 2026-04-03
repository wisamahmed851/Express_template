const { body } = require("express-validator");
const User = require("../models/userModel")

exports.createUserValidator = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 3 }).withMessage("Name must be least then 3 characters"),
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email")
        .custom(async (email) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error("Email already exist");
            }
            return true;
        }),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must be atleast 8 charachters"),
];

exports.loginUserValidation = [
    body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Email is invalid"),
    body("password")
    .notEmpty().withMessage("Password is required"),
];