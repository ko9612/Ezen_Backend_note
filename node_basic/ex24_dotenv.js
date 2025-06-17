const dotenv = require("dotenv");
dotenv.config(); // dotenv모듈을 이용해서 .env파일에서 환경변수 로드 -> process.env객체에 추가
// .env.development, .env.test, .env.production 등으로 파일을 나누고 각 환경에 맞는 설정을 관리할 수 있음
// .env ==> .gitignore에 추가해서 중요한 정보들이 노출되지 않도록 관리 필요

const express = require("express");
const app = express();

const port = process.env.PORT || 4000;
const dbUrl = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

app.get("/", (req, res) => {
  const str = `<h1>DB info</h1>
    <ul>
        <li>DB HOST: ${dbUrl}</li>
        <li>DB Port: ${dbPort}</li>
        <li>DB Name: ${dbName}</li>
    </ul>
    `;
  res.end(str);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
