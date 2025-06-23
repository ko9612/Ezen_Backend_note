import { create } from "zustand";
import type { PostType } from "../types/post";
import {
  apiFetchPostList,
  apitFetchPostById,
  apiDeletePost,
} from "../api/postApi";

type PostStateType = {
  postList: PostType[]; // 글 목록
  totalCount: number; // 총 게시글 수
  totalPages: number; // 총 페이지 수
  page: number; // 현재 보여줄 페이지 번호
  size: number; // 한 페이지 당 보여줄 목록 개수
  post: PostType | null; // 특정 게시글
  setPage: (page: number) => void;
  fetchPostList: () => Promise<void>; // 글 목록 가져오기
  fetchPostById: (id: string) => Promise<void>; // 특정 글 정보 가져오기
  deletePost: (id: string) => Promise<boolean>; // 특정 글 삭제
};

type PostFormStateType = {
  formData: {
    writer: string;
    title: string;
    content: string;
    file: string;
    newFile: File | null;
  };
  // Partial: 객체의 모든 속성을 선택적(optional)으로 바꿔줌
  setFormData: (data: Partial<PostFormStateType["formData"]>) => void;
  resetForm: () => void;
};

// post 목록 가져오기, 1건 post 조회, post 삭제 관리(서버 통신 로직 중심)
export const usePostStore = create<PostStateType>((set, get) => ({
  postList: [],
  totalCount: 0,
  totalPages: 0,
  page: 1,
  size: 3,
  post: null,
  setPage: (page: number) => set({ page: page }),
  fetchPostList: async () => {
    const { page } = get(); // get()함수로 page state값 가져오기
    try {
      // api호출 => 반환해주는 목록, 게시글 수 set
      const data = await apiFetchPostList(page);
      set({
        postList: data.data,
        totalCount: data.totalCount,
        totalPages: data.totalPages,
      });
    } catch (error) {
      alert("목록 가져오기 실패: " + (error as Error).message);
    }
  },
  fetchPostById: async (id) => {
    try {
      const post = await apitFetchPostById(id);
      set({ post });
    } catch (error) {
      console.error("글 내용 보기 실패: " + (error as Error).message);
    }
  },
  deletePost: async (id) => {
    try {
      await apiDeletePost(id);
      set({ post: null }); // 글 내용을 null로 처리
      return true;
    } catch (error) {
      alert("글 삭제 실패: " + (error as Error).message);
      return false;
    }
  },
}));

// post 글쓰기/수정에 필요한 폼 입력 상태 관리(UI상태 중심)
// 파일 업로드-> FormData 객체를 통해 전송해야 함
export const usePostFormStore = create<PostFormStateType>((set) => ({
  formData: {
    writer: "",
    title: "",
    content: "",
    file: "",
    newFile: null,
  },
  setFormData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),
  resetForm: () =>
    set({
      formData: {
        writer: "",
        title: "",
        content: "",
        file: "",
        newFile: null,
      },
    }),
}));
