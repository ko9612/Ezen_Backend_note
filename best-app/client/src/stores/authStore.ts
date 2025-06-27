import { create } from "zustand";
import type { Role } from "../types/user";

export type AuthUserType = {
  id: number;
  name: string;
  email: string;
  role?: Role;
  accessToken?: string;
  refreshToken?: string;
};

export type AuthStateType = {
  authUser: AuthUserType | null;
  isLoading: boolean; //App에서 인증요청을 모두 마치고 authUser state값을 셋팅하는 동안 로딩상태 유지
  loginAuthUser: (user: AuthUserType) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthStateType>((set) => ({
  authUser: null,
  isLoading: true,
  loginAuthUser: (user) => set(() => ({ authUser: user })),
  logout: () => set(() => ({ authUser: null })),
  setLoading: (loading) => set({ isLoading: loading }),
}));
