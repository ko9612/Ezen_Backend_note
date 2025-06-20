const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const postController = require("../controllers/postController.js");

// 파일 업로드 설정
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "..", "..", "public", "uploads"));
    // 콜백함수에 업로드할 파일의 저장 경로를 전달
  },
  filename: function (req, file, callback) {
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    callback(null, Date.now() + "-" + file.originalname);
    // 업로드할 파일명: 업로드한 날짜 시간-원본파일명 => 파일명 중복 피하기 위한 설정
  },
});
const upMulter = multer({ storage: storage });

// api/posts/
router.get("/", postController.listPost);

// post => /api/posts : 포스트 글쓰기(C) - 파일업로드(나중에)
// multer 미들웨어 설정 필요 => 라우터 단위 미들웨어 설정
router.post("/", upMulter.single("file"), postController.createPost);

router.get("/:id", postController.viewPost);

router.delete("/:id", postController.deletePost);

module.exports = router;
