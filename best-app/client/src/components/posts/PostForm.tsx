import type { ChangeEvent, FormEvent } from "react";
import { Button, Form } from "react-bootstrap";
import { usePostFormStore, usePostStore } from "../../stores/postStore";
import { apiCreatePost } from "../../api/postApi";
import { useAuthStore } from "../../stores/authStore";

const PostForm = () => {
  const { formData, setFormData, resetForm } = usePostFormStore();
  const fetchPostList = usePostStore((s) => s.fetchPostList);
  const authUser = useAuthStore((s) => s.authUser);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ newFile: e.target.files[0] }); // newFile => file | null 타입
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // 파일 업로드 시에는 FromData 객체에 담아서 서버에 요청을 보냄
      // parameter data와 함께 file data를 같이 전송하는 방식: enctype="multipart/form-data"
      // ===> FormData를 이용하면 multipart 방식으로 전송
      const data = new FormData();
      data.append("writer", formData.writer);
      data.append("title", formData.title);
      data.append("content", formData.content);
      if (formData.newFile) {
        data.append("file", formData.newFile);
      }
      // api 호출 => post 글을 생성하는 api 호출
      await apiCreatePost(data);
      resetForm();
      alert("등록 완료");
      // 전체글을 가져오는 api 호출
      await fetchPostList();
    } catch (error) {
      console.error("서버 요청 중 에러: ", error);
      alert("서버 요청 중 오류 발생 " + (error as Error).message);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="writer">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="writer"
            required
            onChange={handleChange}
            value={authUser?.email || formData.writer}
            disabled={authUser !== null}
          />
        </Form.Group>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            required
            onChange={handleChange}
            value={formData.title}
          />
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            onChange={handleChange}
            value={formData.content}
          />
        </Form.Group>
        <Form.Group controlId="file">
          <Form.Label>File</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default PostForm;
