// CRUD 로직
const fs = require("fs");
const pool = require("../models/dbPool");
const path = require("path");

// Create
exports.createPost = async (req, res) => {
  console.log("createPost들어옴...");
  try {
    // parameter data
    const { writer, title, content } = req.body;
    // 첨부파일 => req.file로 추출
    const file = req.file; // multer 저장한 파일 정보
    let fileName = null;
    if (file) {
      fileName = file.filename; // 실제 저장된 파일명이 들어옴 => DB에 저장
    }

    // console.log("file", file);
    // console.log(writer, title, content);

    const sql = `insert into posts(writer, title, content, attach)
        values(?,?,?,?)
    `;
    const postData = [writer, title, content, fileName];
    // const sql2 = `INSERT INTO posts SET ?`; // column 리스트 없이
    // const postData = { writer, title, content, attach: fileName };
    const [result] = await pool.query(sql, postData);
    const newPost = {
      id: result.insertId,
      writer,
      title,
      content,
      file: fileName,
    };
    res.status(201).json(newPost);
  } catch (error) {
    console.error("createPost Error: ", error);
    res.status(500).json({ message: "Server Error " + error.message });
  }
};

// Read
exports.listPost = async (req, res) => {
  try {
    const size = 3; // 한 페이지 당 보여줄 목록 개수
    const page = parseInt(req.query.page) || 1; // 현재 보여줄 페이지 번호
    const offset = (page - 1) * size;

    // 1. 전체 게시글 수 가져오기
    const query = `select count(id) as count from posts`;
    const [[{ count }]] = await pool.query(query);

    // 1.2 총 페이지 수 구하기
    const totalPages = Math.ceil(count / size);

    // 2. 게시목록 가져오기(페이지네이션)
    const sql = `select id, title, content, writer, attach as file, 
    date_format(wdate,'%Y-%m-%d %H:%i:%s') as wdate
    from posts order by wdate desc limit ? offset ?;`;
    const [posts] = await pool.query(sql, [size, offset]);
    console.log(page, offset);
    res.json({
      data: posts,
      totalCount: count,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

exports.viewPost = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = `select id, writer, title, content, 
    attach as file, date_format(wdate,'%Y-%m-%d %H:%i:%s') as wdate 
    from posts where id=?`;
    const [result] = await pool.query(sql, [id]);
    if (result.length === 0) {
      return res.status(404).json({ message: "해당 글은 없습니다." });
    }
    res.json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    // 1. 해당 게시글의 첨부파일명 가져오기
    const sql1 = `select attach as file from posts where id=?`;
    const [result] = await pool.query(sql1, [id]);
    if (result.length === 0) {
      return res.status(404).json({ message: "해당 글은 존재하지 않습니다." });
    }
    const post = result[0];
    let filePath = "";
    if (post.file) {
      filePath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "uploads",
        post.file
      );
    }

    // 2. DB에서 해당 글 삭제
    const sql2 = `delete from posts where id=?`;
    const [result2] = await pool.query(sql2, [id]);
    if (result2.affectedRows === 0) {
      return res.status(404).json({ message: "해당 글은 없어요." });
    }

    // 3. 파일이 있다면 삭제
    if (fs.existsSync(filePath)) {
      console.log(filePath);
      fs.unlinkSync(filePath); // 동기방식으로 파일을 삭제하는 함수. 비동기 방식 => fs.unlink()
    }

    res.status(200).json({ message: `${id}번 글을 삭제했습니다.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

exports.updatePost = async (req, res) => {
  try {
    // 글 번호: id => req.params.id
    const { id } = req.params;
    // 글 내용: wrtier, title, .... => req.bpdy
    const { writer, title, content } = req.body;

    // 파일
    const file = req.file; // 새로 수정처리할 첨부파일
    const fileName = file?.filename;
    const sql1 = `select attach as file from posts where id=?`;
    const [result1] = await pool.query(sql1, [id]);
    if (result1.length === 0) {
      return res.status(404).json({ message: "해당 글은 없어요." });
    }

    const post = result1[0];
    let filePath = "";
    if (post.file) {
      // 예전 첨부한 파일이 있다면
      filePath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "uploads",
        post.file
      );
    }

    // 그 외
    const params = [writer, title, content]; // ?: 인 파라미터값들을 저장할 배열
    let sql2 = `update posts set writer=?, title=?, content=? `;
    if (file) {
      sql2 += `, attach=? `;
      params.push(fileName);
    }
    sql2 += `where id=?`;
    params.push(id);

    const [result2] = await pool.query(sql2, params);
    if (result2.affectedRows === 0) {
      return res.status(404).json({ message: "해당 글이 없습니다." });
    }
    if (result1.length > 0 && fs.existsSync(filePath)) {
      // 새로 첨부한 파일이 있다면
      fs.unlinkSync(filePath); // 기존 첨부파일은 삭제 처리
    }
    res.status(200).json({ message: "Post글 수정 완료" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};
