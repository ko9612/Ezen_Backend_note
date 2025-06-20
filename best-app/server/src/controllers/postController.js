// CRUD 로직
const pool = require("../models/dbPool");

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
