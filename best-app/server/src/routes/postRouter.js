const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController.js");

// api/posts/
router.get("/", postController.listPost);

// post => /api/posts : 포스트 글쓰기(C) - 파일업로드(나중에)
router.post("/", postController.createPost);

module.exports = router;
