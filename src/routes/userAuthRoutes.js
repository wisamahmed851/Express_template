const express = require("express")
const router = express.Router();
const validate = require("../middlewares/validate")
const upload = require("../helper/fileUploads")
const { authMiddleware } = require("../middlewares/authMiddleware")
const { loginUserValidation, createUserValidator, updateProfileValidation } = require("../validators/userValidator")

const { login, profile, register, updateProfile } = require("../controllers/userAuthController");
const { authLimiter } = require("../middlewares/rateLimitter");

router.post("/login", loginUserValidation, validate, login);
router.post("/register", upload.single("image"), createUserValidator, validate, register);
router.get("/profile", authMiddleware, authLimiter, profile);
router.put("/profile", authMiddleware, authLimiter, updateProfileValidation, validate, updateProfile); // 👈 new
router.post("/refresh", refresh);          // public — no authMiddleware
router.post("/logout", authMiddleware, logout); // protected
module.exports = router;