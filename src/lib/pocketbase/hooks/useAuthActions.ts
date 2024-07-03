import { pbClient } from "../client";

export const useAuthActions = () => {
  const login = async (email: string, password: string) => pbClient
    .admins
    .authWithPassword(email, password);


  const logout = async () => pbClient
    .authStore
    .clear();

  return {
    login,
    logout,
  };
};