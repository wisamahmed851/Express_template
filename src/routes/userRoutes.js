const express = require("express")
const router = express.Router();
const upload = require("../helper/fileUploads")

const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
} = require("../controllers/userController");

router.post("/", upload.single("avatar"), createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;