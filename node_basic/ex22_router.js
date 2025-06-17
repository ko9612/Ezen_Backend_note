// express 모듈 이용해서
// get "/" "index.html" 보여주기
// get "/user" ==> 모든 회원 목록 보여주기 <h1>모든 회원 목록</h1> 출력
// 그 외 나머기 경로 "*" => <h1>Not Found</h1> 출력

const express = require("express");
const app = express();
const path = require("path");

app.set("port", 9090);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/users", (req, res) => {
  const str = `<h1>모든 회원 목록</h1>
    <ul>
        <li><a href="/users/1">1번: 홍길동</a></li>
        <li><a href="/users/2">2번: 최영아</a></li>
        <li><a href="/users/3">3번: 김ㅁ수</a></li>
    </ul>
    `;
  res.send(str);
});

// path 부분에 ":parameter명" => 동적 세그먼트
// req.params.parameter명 으로 추출
app.get("/users/:uid", (req, res) => {
  const no = req.params.uid;
  const str = `<h1>${no}번 회원의 정보</h1><p>DB에서 ${no}번 회원의 정보를 가져와 출력할 예정</p>`;
  res.send(str);
});

app.get(/.*/, (req, res) => {
  res.status(404).send(`<h1>404 Not Found</h1>`);
});

app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}`);
});
