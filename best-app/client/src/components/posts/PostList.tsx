import { Link } from "react-router-dom";
import { usePostStore } from "../../stores/postStore";
import { useEffect } from "react";

export const PostList = () => {
  const { fetchPostList, postList, totalCount } = usePostStore();

  useEffect(() => {
    fetchPostList();
  }, []);

  return (
    <div className="post-list">
      <h3>총 게시글 수: {totalCount}개</h3>
      {postList.map((post) => (
        <div
          key={post.id}
          className="d-flex my-3 p-3"
          style={{ background: "#efefef", borderRadius: 10 }}
        >
          <div style={{ width: "25%" }}>
            <img
              src={
                post.file
                  ? `http://localhost:7777/uploads/${post.file}`
                  : `http://localhost:7777/images/noimage.png`
              }
              alt={post.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="flex-grow-1 ms-3">
            <h5>
              작성자: {post.writer}
              <br />
              <small className="text-muted">
                <i>Posted on {post.wdate}</i>
              </small>
            </h5>
            <Link to={`/posts/${post.id}`}>
              <h3>{post.title}</h3>
            </Link>
          </div>
        </div>
      ))}
      {/* pagination */}
      <div></div>
    </div>
  );
};

export default PostList;
