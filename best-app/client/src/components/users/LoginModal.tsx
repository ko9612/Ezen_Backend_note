import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useAuthStore } from "../../stores/authStore";
import { apiSignIn } from "../../api/userApi";

type LoginModalProps = {
  show: boolean;
  setShowLogin: (show: boolean) => void;
};

const LoginModal = ({ show, setShowLogin }: LoginModalProps) => {
  const [loginUser, setLoginUser] = useState<{ email: string; passwd: string }>(
    { email: "", passwd: "" }
  );
  const emailRef = useRef<HTMLInputElement>(null);
  const passwdRef = useRef<HTMLInputElement>(null);
  const loginAuthUser = useAuthStore((s) => s.loginAuthUser);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { email, passwd } = loginUser;
    if (!email.trim()) {
      alert("아이디를 입력하세요");
      emailRef.current?.focus();
      return;
    }
    if (!passwd.trim()) {
      alert("비밀번호를 입력하세요");
      passwdRef.current?.focus();
      return;
    }
    requestLogin();
  };

  const requestLogin = async () => {
    try {
      const res = await apiSignIn(loginUser);
      const { result, message, data } = res;
      if (result === "success") {
        alert(`${message} ${data?.name}님 환영합니다!`);
        if (data) {
          // 회원정보, 토큰들 loginAuthUser 통해서 전달, 전역적 state로 관리하기 위해
          // sessionStorage, localStorage에 accessToken, refreshToken 저장
          const { accessToken, refreshToken } = data;
          loginAuthUser({ ...data });
          sessionStorage.setItem("accessToken", accessToken!);
          localStorage.setItem("refreshToken", refreshToken!);
        }
      } else {
        alert(message);
      }
      setShowLogin(false);
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message);
    } finally {
      reset();
      emailRef.current?.focus();
    }
  };

  const reset = () => {
    setLoginUser({ email: "", passwd: "" });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Modal show={show} centered onHide={() => setShowLogin(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="p-4 mx-auto" xs={10} sm={10} md={8}>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="ID (email)"
                  onChange={handleChange}
                  value={loginUser.email}
                  ref={emailRef}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="passwd"
                  placeholder="Password"
                  onChange={handleChange}
                  value={loginUser.passwd}
                  ref={passwdRef}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="outline-success">
                  Login
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
