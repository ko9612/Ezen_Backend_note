import { Button, ListGroup, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { apiAuthTest, apiSignOut } from "../api/userApi";

type SidePropsType = {
  setShowLogin: (show: boolean) => void;
};

const Side = ({ setShowLogin }: SidePropsType) => {
  const navigate = useNavigate();
  const authUser = useAuthStore((s) => s.authUser); // 인증 받은 사용자 state
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
    if (!authUser) return;
    try {
      await apiSignOut(authUser.email);
      logout();
      sessionStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/");
    } catch (error) {
      alert("로그아웃 처리 중 에러: " + error);
    }
  };

  const handleAuthTest = async () => {
    try {
      const atoken = sessionStorage.getItem("accessToken");
      const res = await apiAuthTest(atoken);
      alert(res.message);
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message);
    }
  };

  return (
    <Stack gap={2} className="mx-auto w-100">
      <Button variant="primary" as={Link as any} to="/">
        Home
      </Button>

      <Button variant="outline-success" as={Link as any} to="/signup">
        SignUp
      </Button>
      {authUser && (
        <div className="alert alert-danger text-center">
          {authUser?.name}님 로그인 중...
        </div>
      )}

      {authUser ? (
        <Button variant="outline-success" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button
          variant="outline-success"
          onClick={() => {
            setShowLogin(true);
          }}
        >
          SignIn
        </Button>
      )}

      <Button variant="outline-danger" onClick={handleAuthTest}>
        인증 테스트
      </Button>

      <hr></hr>
      <ListGroup>
        <ListGroup.Item as={Link} to="/hook1">
          Menu 1
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/hook2">
          Menu 2
        </ListGroup.Item>
      </ListGroup>
    </Stack>
  );
};

export default Side;
