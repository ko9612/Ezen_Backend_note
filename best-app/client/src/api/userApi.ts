import type {
  CreateEmailResponseType,
  CreateUserResponseType,
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
