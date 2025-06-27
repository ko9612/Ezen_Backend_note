const pool = require("../models/dbPool");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// jwt 토큰 생선하는 함수
const generateToken = (user, secret, expiresIn) => {
  return jwt.sign(user, secret, { expiresIn });
};

exports.login = async (req, res) => {
  const { email, passwd } = req.body;
  try {
    // 1. DB members에서 email로 회원정보 가져오기
    const sql = `select id, name, email, passwd, role 
    from members where email=?`;
    const [result] = await pool.query(sql, [email]);
    if (result.length === 0) {
      return res.status(401).json({
        result: "fail",
        message: "아이디 또는 비밀번호가 일치하지 않습니다.",
      });
    }
    const user = result[0]; // 회원정보 꺼내기

    // 2. 비번 일치 여부 체크 - bcrypt로 compare()
    const isMatch = await bcrypt.compare(passwd, user.passwd);
    // 사용자가 입력한 비번:passwd, DB에서 가져온 암호화된 비번:user.passwd
    if (!isMatch) {
      return res.status(401).json({
        result: "fail",
        message: "아이디 또는 비밀번호를 확인하세요.",
      });
    }

    // 3. 회원으로 인증 받은 경우 => accessToken, refreshToken 생성
    const { passwd: _, ...userPayload } = user; // _ <- 이 값은 받지 않는다
    // accessToken: 15m, refreshToken: 1h
    const accessToken = generateToken(
      userPayload,
      process.env.ACCESS_SECRET,
      "15m"
    );
    const refreshToken = generateToken(
      userPayload,
      process.env.REFRESH_SECRET,
      "1h"
    );

    // 4. members 테이블의 refreshToken값(null) 수정
    const sql2 = `update members set refreshtoken=? where id=?`;
    await pool.query(sql2, [refreshToken, user.id]);

    res.json({
      result: "success",
      message: "로그인 성공",
      data: { accessToken, refreshToken, ...userPayload },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ result: "fail", message: "회원인증 실패 " + error.message });
  }
};

exports.logout = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ result: "fail", message: "유효하지 않은 사용자입니다." });
  }
  try {
    // refreshtoken값은 null로
    const sql = `update members set refreshtoken=null where email=?`;
    const [result] = await pool.query(sql, [email]);
    if (result.affectedRows === 0) {
      return res
        .status(400)
        .json({ result: "fail", message: "유효하지 않은 사용자입니다." });
    }
    res.json({ result: "success", message: "로그아웃 처리되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      result: "fail",
      message: "DB Error-로그아웃 처리 중 에러: " + error.message,
    });
  }
};

exports.refreshVerify = async (req, res) => {};

exports.getAuthenticUser = async (req, res) => {
  res.json(req.authUser);
};

exports.mypage = async (req, res) => {
  try {
    if (!req.authUser)
      return res
        .status(404)
        .json({ result: "fail", message: "로그인이 필요합니다." });
    const id = req.authUser.id;
    const sql = `select * from members where id=?`;
    const [result] = await pool.query(sql, [id]);
    if (result.length === 0) {
      return res
        .status(404)
        .json({ result: "fail", message: "회원이 아닙니다." });
    }
    const { passwd: _, ...userData } = result[0];
    return res.status(200).json({
      result: "success",
      message: `${userData.name}님의 MyPage입니다`,
      data: userData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: "fail", message: "DB Error : " + error });
  }
};
