// middlewares/errorHandler.js
// global for the error handling instead of each controller their own error handling
module.exports = (err, req, res, next) => {
    const status = err.statusCode || 500;
    return res.status(status).json({
        status: false,
        message: err.message || "Internal server error",
    });
};