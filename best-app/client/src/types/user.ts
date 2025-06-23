export type UserType = {
  id?: number;
  name: string;
  email: string;
  passwd: string;
  role: Role;
};

export type Role = "USER" | "ADMIN";

// 공통 api 응답
export type ApiResponseType<T = undefined> = {
  result: "success" | "fail";
  message: string;
  data?: T; // 성공시에만 존재
};
