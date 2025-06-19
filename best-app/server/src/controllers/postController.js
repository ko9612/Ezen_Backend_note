// CRUD 로직
const pool = require("../models/dbPool");

// Create
exports.createPost = async (req, res) => {
  console.log("createPost들어옴...");
  try {
    const { writer, title, content } = req.body;
    console.log(writer, title, content);
    // const sql = `insert into posts(writer, title, content)
    //     values(?,?,?)
    // `;
    // const postData = [writer, title, content];
    const sql2 = `INSERT INTO posts SET ?`; // column 리스트 없이
    const postData = { writer, title, content };
    const [result] = await pool.query(sql2, postData);
    console.log(result);
    res.status(201).json({ message: "Post Created", postId: result.insertId });
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
    const sql = `select id, title, content, writer, attach, wdate
        from posts order by id desc`;
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
