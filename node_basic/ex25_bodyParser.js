const express = require("express");
require("dotenv").config();
const path = require("path");
const port = process.env.PORT || 3333;

const app = express();

// 미들웨어 설정
app.use(express.json()); // json 데이터를 자동으로 파싱하여 req.body에 저장함

// URL 인코딩된 데이터를 파싱하는 미들웨어(form을 통해서 보내는 경우)
// extended: true => qs 모듈을 이용해서 파싱, false => querystring 모듈 사용
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "form.html"));
});

// get 방식 요청 데이터 req.query이용해 닉네임, 비번 출력
app.get("/login", (req, res) => {
  const { nick, passwd } = req.query;
  res.send(`<h1>닉네임: ${nick} / 비밀번호: ${passwd}</h1>`);
});

// post 방식 요청 데이터 req.body이용해 닉네임, 비번 출력
app.post("/login", (req, res) => {
  const { nick2, passwd2 } = req.body;
  res.send(`<h1>닉네임: ${nick2} / 비밀번호: ${passwd2}</h1>`);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
