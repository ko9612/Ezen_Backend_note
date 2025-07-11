import { useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePostFormStore, usePostStore } from "../../stores/postStore";
import { apiUpdatePost } from "../../api/postApi";

const PostEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const fetchPostById = usePostStore((s) => s.fetchPostById);
  const post = usePostStore((s) => s.post);
  const { resetForm, formData, setFormData } = usePostFormStore();

  const fetchAndSet = async () => {
    if (id) await fetchPostById(id);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData({ newFile: files[0] });
    }
  };

  const handleReset = () => {
    resetForm();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { writer, title, content, newFile } = formData;
    // 유효성 체크
    if (!title.trim()) {
      alert("제목을 입력하세요.");
      return;
    }
    if (!content.trim()) {
      alert("내용을 입력하세요.");
      return;
    }

    // 파일업로드 시, FormData객체에 사용자가 입력한 값들을 넣어 전송 "multipart/form-data"
    try {
      const data = new FormData();
      data.append("writer", writer);
      data.append("title", title);
      data.append("content", content);
      if (newFile) {
        data.append("file", newFile);
      }
      await apiUpdatePost(data, id ?? "");
      alert("수정 성공");
      navigate("/posts");
    } catch (error) {
      console.error(error);
      alert("수정 실패: " + (error as Error).message);
    }
  };

  useEffect(() => {
    fetchAndSet(); // mount될 때 fetchAndSet()호출
    return () => resetForm(); //  unmount될 때 자동으로 호출되는 cleanup 함수
  }, [id]);

  useEffect(() => {
    if (post) {
      setFormData({
        writer: post.writer || "",
        title: post.title || "",
        content: post.content || "",
        file: post.file || "",
        newFile: null,
      });
    }
  }, [post]);

  return (
    <div className="row my-1">
      <div className="col-md-8 mx-auto p-3">
        <h1 className="text-center my-5">게시글 수정</h1>

        <form>
          {/* 제목 */}
          <div className="mb-3">
            <label className="form-label">제목</label>
            <input
              name="title"
              className="form-control my-2"
              placeholder="제목을 입력하세요"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* 작성자 */}
          <div className="mb-3">
            <label className="form-label">작성자</label>
            <input
              className="form-control my-2"
              placeholder="작성자 이름"
              value={formData.writer}
              disabled
            />
          </div>

          {/* 내용 */}
          <div className="mb-3">
            <label className="form-label">내용</label>
            <textarea
              name="content"
              className="form-control my-2"
              rows={6}
              placeholder="내용을 입력하세요"
              value={formData.content}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* 첨부파일 */}
          <div className="mb-3">
            <label className="form-label">첨부파일</label>
            <input
              name="file"
              className="form-control"
              type="file"
              onChange={handleFileChange}
            />
            {formData.file && (
              <div className="mt-2 text-muted">
                <img
                  src={
                    formData.file
                      ? `http://localhost:7777/uploads/${formData.file}`
                      : "http://localhost:7777/images/noimage.png"
                  }
                  alt={formData.file}
                  style={{ width: "120px" }}
                />
                <div>현재 파일: {formData.file}</div>
              </div>
            )}
          </div>

          {/* 버튼들 */}
          <div className="text-center">
            <button
              className="btn btn-primary mx-1 px-3 btn-sm"
              onClick={handleSubmit}
            >
              글수정
            </button>
            <button
              className="btn btn-warning mx-1 px-3 btn-sm"
              onClick={handleReset}
            >
              다시쓰기
            </button>
            <button
              className="btn btn-secondary mx-1 px-3 btn-sm"
              onClick={() => navigate("/posts")}
            >
              글 목록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEdit;
