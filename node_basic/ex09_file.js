// 파일 내장 모듈
const fs = require("fs");

// 1. 동기방식으로 파일읽기: readFileSync()
const data = fs.readFileSync("package.json", "utf8");

// 파일 데이터가 data에 담김
console.log(data); // 순차적으로 실행 파일 읽기 마침 => Bye Bye 출력
console.log("Bye Bye~");

// 2. 비동기 방식 파일 읽기: readFile(파일명, 인코딩, 콜백함수)
console.log("----비동기 방식으로 파일 읽기 시작----");
fs.readFile("ex01_global.js", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
console.log("----비동기 방식으로 파일 읽기 종료----");
