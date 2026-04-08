const rateLimit = require("express-rate-limit");

exports.generalLimiter = rateLimit({
    windowMs: 15 * 60 * 100,
    max: 100,
    message: { status: false, message: "Too Many request, please try again later" },
    standardHeaders: true,
    legacyHeaders: false,
});
exports.authLimiter = rateLimit({
    windowMs: 15 * 60 * 100,
    max: 10,
    message: { status: false, message: "Too many attempts, try again later" },
});