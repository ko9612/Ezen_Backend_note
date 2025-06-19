import { create } from "zustand";
import type { PostType } from "../types/post";
import { apiFetchPostList } from "../api/postApi";

type PostStateType = {
  postList: PostType[];
  totalCount: number;
  fetchPostList: () => Promise<void>;
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
  // resetForm: () => void;
};

// post 목록 가져오기, 1건 post 조회, post 삭제 관리(서버 통신 로직 중심)
export const usePostStore = create<PostStateType>((set, get) => ({
  postList: [],
  totalCount: 0,
  fetchPostList: async () => {
    try {
      // api호출 => 반환해주는 목록, 게시글 수 set
      const data = await apiFetchPostList();
      set({ postList: data.data, totalCount: data.totalCount });
    } catch (error) {
      alert("목록 가져오기 실패: " + (error as Error).message);
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
}));
