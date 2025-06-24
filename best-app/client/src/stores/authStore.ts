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
  loginAuthUser: (user: AuthUserType) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStateType>((set) => ({
  authUser: null,
  loginAuthUser: (user) => set(() => ({ authUser: user })),
  logout: () => set(() => ({ authUser: null })),
}));
