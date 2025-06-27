const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController.js");
const verifyMiddleware = require("../middlewares/verifyMiddleware.js");

router.post("/login", loginController.login);
router.post("/logout", loginController.logout);
router.post("/refresh", loginController.refreshVerify);
router.get(
  "/user",
  verifyMiddleware.verifyAccessToken,
  loginController.getAuthenticUser
);
router.get(
  "/mypage",
  verifyMiddleware.verifyAccessToken,
  loginController.mypage
);

module.exports = router;
