// npm i mysql ==> callback fn
// npm i mysql2 ==> promise 지원 async/await 사용 가능

const express = require("express");
const mysql = require("mysql");

// db 연결 정보 ==> 원래는 .env에 작성해놓고 해야함
// createPool: db에 연결되는 자원을 미리 준비해놓고 풀자!
const conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "eduDB",
  user: "ezen",
  password: "1234",
});

// db 연결
conn.connect((err) => {
  if (err) {
    console.error("mysql 연결 시도 중 에러 발생: ", err);
    return;
  }
  console.log("mysql에 성공적으로 연결!");
});

// 쿼리 실행
conn.query("select * from members order by id desc", (err, result) => {
  if (err) {
    console.error("쿼리 실행 오류");
    return;
  }
  for (let i = 0; i < result.length; i++) {
    console.log(result[i].id, result[i].name, result[i].email);
  }
});

// DB연결 종료
conn.end();
