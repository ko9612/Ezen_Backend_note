// npm i express
// http 모듈로 부족한 부분을 보완함. 라우팅, 미들웨어, 에러 처리 등...
const express = require("express");
const app = express(); // 함수 내에서 객체를 반환

app.get("/", (req, res) => {
  res.send(`<h1>Hello Express</h1>`);
  // res.send(): 응답 본문을 전송하고 상태 코드와 컨텐트 타입을 자동으로 설정하고 자동으로 종료
  // 기본 상태코드: 200, 컨텐트 타입은 전송할 데이터 유형에 따라 자동설정
});

app.get("/file", (req, res) => {
  res.sendFile(__dirname + "/public/pizzaUI.html"); // fs모듈대신 sendFile()을 이용해 파일을 내보냄
});

app.listen(7777, () => {
  console.log(`http://localhost:7777`);
});
