const express = require("express");
const { signup, login, logout } = require("../controllers/authControllers");
const upload = require("../middleware/multer");
const router = express.Router();

router.post("/signup", upload.single("avatar"), signup);
router.post("/login", login);
router.post("/logout", logout);
module.exports = router;
