import { Link } from "react-router-dom";
import { usePostStore } from "../../stores/postStore";
import { useEffect } from "react";

export const PostList = () => {
  const { fetchPostList, postList, totalCount, totalPages, page, setPage } =
    usePostStore();

  const pageBlock = 5;
  const startPage = Math.floor((page - 1) / pageBlock) * pageBlock + 1;
  const endPage = Math.min(startPage + (pageBlock - 1), totalPages);
  useEffect(() => {
    fetchPostList();
  }, [page]);

  // 페이지 블럭 처리 위한 연산

  return (
    <div className="post-list">
      <h3>
        총 게시글 수: {totalCount}개, {page} page / {totalPages} pages
      </h3>
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
      <div className="text-center">
        {startPage > 1 && (
          <button
            onClick={() => setPage(startPage - 1)}
            className="btn btn-outline-primary mx-1"
          >
            Prev
          </button>
        )}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => i + startPage
        ).map((n) => (
          <button
            key={n}
            className={`btn ${
              n === page ? "btn-primary" : "btn-outline-primary"
            } mx-1`}
            onClick={() => setPage(n)}
          >
            {n}
          </button>
        ))}
        {endPage < totalPages && (
          <button
            onClick={() => setPage(endPage + 1)}
            className="btn btn-outline-primary mx-1"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PostList;
