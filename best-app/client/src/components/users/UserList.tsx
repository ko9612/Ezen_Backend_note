// 관리자만 접근 가능

import { useEffect, useState } from "react";
import type { UserListResponseType } from "../../types/user";
import { apiUserList } from "../../api/userApi";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState<UserListResponseType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 인증받은 사용자 state 받기
  const authUser = useAuthStore((s) => s.authUser);
  const isLoading = useAuthStore((s) => s.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    // 인증 사용자, 인가 사용자(권한: admin) - api 요청
    if (!isLoading) {
      //보모 App컴포넌트에서 인증사용자 체크를 완료했다면 isLoading을 false변경함
      if (!authUser) {
        alert("로그인이 필요해요");
        navigate("/");
        return;
      }
      // 관리자가 아닌 경우
      if (authUser.role !== "ADMIN") {
        alert("관리자만 이용가능합니다.");
        navigate("/");
        return;
      }
      // 관리자일 경우, 사용자 목록 가져오기 - api 요청
      const fetchUsers = async () => {
        try {
          const res = await apiUserList();
          setUsers(res);
        } catch (error: any) {
          alert("회원목록 조회 중 에러 발생 " + error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
    } //if(!isLooading)--------
  }, [authUser]);

  if (loading) {
    return (
      <div className="text-center my-4">
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="container py-3">
      <h2 className="text-center my-4">회원 목록 [Admin Page-관리자 전용]</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>회원ID</th>
            <th>이름</th>
            <th>이메일</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.indate}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
