const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../services/userService");

exports.createUser = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.image = req.file.filename;
        }
        const user = await createUser(req.body);
        return res.status(201).json({
            status: true,
            message: "User created successfully",
            data: user,
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: false,
                message: "Email already exists",
            });
        }
        next(err);
    }
};

exports.getUsers = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        return res.status(200).json({
            status: true,
            message: "Users fetched successfully",
            data: users,
        });
    } catch (err) {
        next(err);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const user = await getUserById(req.params.id);
        return res.status(200).json({
            status: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.image = req.file.filename;
        }
        const user = await updateUser(req.params.id, req.body);
        return res.status(200).json({
            status: true,
            message: "User updated successfully",
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        await deleteUser(req.params.id);
        return res.status(200).json({
            status: true,
            message: "User deleted successfully",
        });
    } catch (err) {
        next(err);
    }
};