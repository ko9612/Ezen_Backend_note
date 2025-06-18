// npm i mysql2 ==> promise 지원 async/await 사용 가능

const express = require("express");
const mysql2 = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 5555;

// DB Connection pool 설정
const pool = mysql2
  .createPool({
    host: "localhost",
    port: 3306,
    database: "eduDB",
    user: "ezen",
    password: "1234",
    connectionLimit: 10,
  })
  .promise(); // promise 기반으로 변환

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 회원가입
app.post(`/api/users`, async (req, res) => {
  // post 방식 => req.body, get => req.query, 'api/users/100' => req.params
  const { name, email, passwd } = req.body;
  console.log(name, email, passwd);

  // 유효성 체크(not null 제약조건을 가진 필드들)
  if (!name || !email || !passwd) {
    return res.status(400).json({
      result: "fail",
      message: "이름, 이메일, 비밀번호는 반드시 입력해야 해요.",
    });
  }

  try {
    // DB 연동
    const sql = `insert into members (name, email, passwd)
        values(?,?,?)
    `;
    const [result] = await pool.query(sql, [name, email, passwd]);
    console.log(result);

    res.json({ result: "success", message: "회원가입 완료, 로그인하세요." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: "fail", message: "DB Error" });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
