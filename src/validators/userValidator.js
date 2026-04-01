const { body } = require("express-validator");

exports.createUserValidator = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 3}).withMessage("Name must be least then 3 characters"),
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({min: 8}).withMessage("Password must be atleast 8 charachters")
]
