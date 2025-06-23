// post관련 api요청을 서버에 보내는 모듈
import type { PostType } from "../types/post";
import axiosInstance from "./axiosInstance";

export type PostResponseType = {
  data: PostType[];
  totalCount: number;
  totalPages: number;
};

// post 목록 가져오기
export const apiFetchPostList = async (
  page: number
): Promise<PostResponseType> => {
  const response = await axiosInstance.get("/posts", { params: { page } });
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

// post 상세 조회
export const apitFetchPostById = async (
  id: string
): Promise<PostType | null> => {
  const response = await axiosInstance.get(`/posts/${id}`);
  const data = response.data;
  if (data) {
    return data.data[0] as PostType;
  } else {
    return null;
  }
};

// post 삭제
export const apiDeletePost = async (id: string): Promise<boolean> => {
  return await axiosInstance.delete(`/posts/${id}`);
};

export const apiUpdatePost = async (
  formData: FormData,
  id: string
): Promise<void> => {
  await axiosInstance.put(`/posts/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
