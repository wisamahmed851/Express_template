const express = require("express")
const router = express.Router();
const upload = require("../helper/fileUploads")
const validate = require("../middlewares/validate")
const { createUserValidator } = require("../validators/userValidator")

const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
} = require("../controllers/userController");

router.post("/", upload.single("avatar"), createUserValidator, validate, createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;