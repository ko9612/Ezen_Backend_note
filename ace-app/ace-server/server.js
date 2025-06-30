const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const { sequelize, Sequelize } = require("./src/models");

// router
const productRouter = require("./src/routes/productRouter");
const timeDealRouter = require("./src/routes/timeDealRouter");

const port = process.env.PORT || 7777;

const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(morgan("dev"));

app.use("/api/products", productRouter);
app.use("/api/timeDeal", timeDealRouter);

// 서버 가동
// 옵션: force : true -> 기존 테이블을 강제로 삭제 후 생성
//       force : false -> 기존 테이블이 없을 때 생성, 있으면 그대로 둠
//       alter : true -> 기존 테이블에 변경 사항이 있으면 변경사항만 추가 수정
sequelize.sync({ alter: true }).then(() => {
  console.log("DB 연결됨...");
  app.listen(port, () => {
    console.log("http://localhost:" + port);
  });
});
