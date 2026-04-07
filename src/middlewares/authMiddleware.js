const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(401).json({
                status: false,
                message: "Access denied. No Token provided",
            });
        }

        // Remove Bearer
        const token = authHeader.split(" ")[1];

        console.log("TOKEN ONLY:", token);

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;

        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            status: false,
            error: err.message
        });
    }
}

module.exports = { authMiddleware };