import type { AuthUserType } from "../stores/authStore";
import type {
  AuthUserResponseType,
  CreateEmailResponseType,
  CreateUserResponseType,
  UserListResponseType,
  UserType,
} from "../types/user";
import axiosInstance from "./axiosInstance";

export const apiSignUp = async (
  user: UserType
): Promise<CreateUserResponseType> => {
  const response = await axiosInstance.post("/users", user);
  return response.data; // result, msg, data: {insertId: 회원번호}
};

export const apiCheckEmail = async (
  email: string
): Promise<CreateEmailResponseType> => {
  const response = await axiosInstance.post("/users/duplex", { email: email });
  return response.data;
};

export const apiUserList = async (): Promise<UserListResponseType[]> => {
  const response = await axiosInstance.get("/admin/users");
  return response.data;
};

export const apiSignIn = async (loginUser: {
  email: string;
  passwd: string;
}): Promise<AuthUserResponseType> => {
  const response = await axiosInstance.post("/auth/login", loginUser);
  return response.data;
};

export const apiSignOut = async (email: string): Promise<void> => {
  const response = await axiosInstance.post("/auth/logout", { email });
  return response.data;
};

export const apiRequestAuthUser = async (
  accessToken: string
): Promise<AuthUserType> => {
  const response = await axiosInstance.get("/auth/user", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const apiAuthTest = async (
  atoken: string | null
): Promise<AuthUserResponseType> => {
  const response = await axiosInstance.get("/auth/mypage", {
    headers: {
      Authorization: `Bearer ${atoken}`,
    },
  });
  return response.data;
};
