const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Access denied. No Token provided",
            });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;
        next;
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: false,
            error: err
        });
    }
}

module.exports = { authMiddleware };