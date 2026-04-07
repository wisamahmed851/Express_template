const express = require("express")
const router = express.Router();
const validate = require("../middlewares/validate")
const upload = require("../helper/fileUploads")
const { authMiddleware } = require("../middlewares/authMiddleware")
const { loginUserValidation, createUserValidator, updateProfileValidation } = require("../validators/userValidator")

const { login, profile, register, updateProfile } = require("../controllers/userAuthController")

router.post("/login", loginUserValidation, validate, login);
router.post("/register", upload.single("image"), createUserValidator, validate, register);
router.get("/profile", authMiddleware, profile);
router.put("/profile", authMiddleware, updateProfileValidation, validate, updateProfile); // 👈 new

module.exports = router;