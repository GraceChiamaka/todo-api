const { Router } = require("express");
const {
  loginUser,
  signupUser,
  forgotPassword,
  resetPassword,
  refreshToken,
  deleteToken,
} = require("../controllers/auth");

const router = Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/forgot_password", forgotPassword);
router.post("/reset_password", resetPassword);
router.get("/refresh_token", refreshToken);
router.delete("/refresh_token", deleteToken);

module.exports = router;
