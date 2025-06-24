import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Col, Row } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Side from "./components/Side";
import Home from "./pages/Home";
import PostApp from "./pages/PostApp";
import PostDetail from "./pages/PostDetail";
import PostEdit from "./components/posts/PostEdit";
import SignUpForm from "./pages/SignUpForm";
import UserList from "./components/users/UserList";
import LoginModal from "./components/users/loginModal";
import { useState } from "react";

function App() {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  return (
    <>
      <div className="container fluid py-5">
        <BrowserRouter>
          <Row>
            <Col className="mb-5">
              <Header />
            </Col>
          </Row>
          <Row className="main">
            <Col
              xs={12}
              sm={4}
              md={4}
              lg={3}
              className="d-none d-sm-block mt-3"
            >
              <Side setShowLogin={setShowLogin} />
            </Col>
            <Col xs={12} sm={8} md={8} lg={9}>
              {/* 로그인 모달 */}
              {showLogin && (
                <LoginModal show={showLogin} setShowLogin={setShowLogin} />
              )}
              {/* 라우트 */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={<PostApp />} />
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/post-edit/:id" element={<PostEdit />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/admin/users" element={<UserList />} />
              </Routes>
            </Col>
          </Row>
          <Row>
            <Col lg={12}></Col>
          </Row>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
}

export default App;
