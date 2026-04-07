const jwt = require("jsonwebtoken");

exports.generateAccessToken = (paylod) => {
    return jwt.sign(paylod, process.env.jWT_SECRET, { expiresIn: "15m" });
}

exports.generateRefereshToekn = (paylod) => {
    return jwt.sign(paylod, process.env.JWT_REFERESH_SECRET, { expiresIn: "7d" });
}