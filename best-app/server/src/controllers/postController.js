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
    // 1. 전체 게시글 수 가져오기
    const query = `select count(id) as count from posts`;
    const [[{ count }]] = await pool.query(query);
    console.log(count);

    // 2. 전체 게시목록 가져오기
    const sql = `select id, title, content, writer, attach as file, 
    date_format(wdate,'%Y-%m-%d %H:%i:%s') as wdate
    from posts order by wdate desc;`;
    const [posts] = await pool.query(sql);
    res.json({
      data: posts,
      totalCount: count,
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
      filePath = path.join(__dirname, "..", "..", "public", "uploads");
    }
    // 2. 파일이 있다면 삭제
    if (!filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // 동기방식으로 파일을 삭제하는 함수. 비동기 방식 => fs.unlink()
    }

    // 3. DB에서 해당 글 삭제
    const sql2 = `delete from posts where id=?`;
    const [result2] = await pool.query(sql2, [id]);
    if (result2.affectedRows === 0) {
      return res.status(404).json({ message: "해당 글은 없어요." });
    }
    res.status(200).json({ message: `${id}번 글을 삭제했습니다.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};
