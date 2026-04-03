const express = require("express")
const router = express.Router();
const validate = require("../middlewares/validate")
const { authMiddleware } = require("../middlewares/authMiddleware")
const { loginUserValidation } = require("../validators/userValidator")

const { login, profile } = require("../controllers/userAuthController")

router.post("/login", loginUserValidation, validate, login);

router.get("/profile", authMiddleware, validate, profile);

module.exports = router;