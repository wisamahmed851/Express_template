exports.adminOnly = async (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            status: false,
            message: "Access Denied. Admin only",
        });
    }
    next();
}