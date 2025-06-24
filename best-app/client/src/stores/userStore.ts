import { create } from "zustand";
import type { Role, UserType } from "../types/user";

type UserStateType = {
  // 1. 상태정의
  user: UserType;
  duplicateChecked: boolean; // 이메일 중복 체크 여부
  // 2. 상태 변경 함수(Actions)
  setField: (field: keyof UserType, value: string | Role) => void;
  setDuplicateChecked: (ok: boolean) => void;
  reset: () => void;
};

export const useUserStore = create<UserStateType>((set) => ({
  // 1. 초기 상태 정의
  user: { name: "", email: "", passwd: "", role: "USER" },
  duplicateChecked: false,
  // 2. 상태변경 함수 정의
  setField: (field, value) => {
    set((state) => ({ user: { ...state.user, [field]: value } }));
  },
  setDuplicateChecked: (ok) => set({ duplicateChecked: ok }),
  reset: () => {
    set({
      user: { name: "", email: "", passwd: "", role: "USER" },
      duplicateChecked: false,
    });
  },
}));
