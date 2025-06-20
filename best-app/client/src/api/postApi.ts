// post관련 api요청을 서버에 보내는 모듈
import type { PostType } from "../types/post";
import axiosInstance from "./axiosInstance";

export type PostResponseType = {
  data: PostType[];
  totalCount: number;
  // totalPages: number;
};

// post 목록 가져오기
export const apiFetchPostList = async (): Promise<PostResponseType> => {
  const response = await axiosInstance.get("/posts");
  return response.data;
};

// post 등록
export const apiCreatePost = async (data: FormData): Promise<PostType> => {
  const response = await axiosInstance.post("/posts", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data as PostType;
};
