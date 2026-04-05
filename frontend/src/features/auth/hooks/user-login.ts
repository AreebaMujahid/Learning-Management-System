import { useMutation } from "@tanstack/react-query";
import { loginUser} from "../services/login-api";
import type {AuthResponse } from "../services/auth-api";
import type { LoginPayload } from "../services/login-api";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginPayload) => loginUser(credentials),
    onSuccess: (data: AuthResponse) => {
      localStorage.setItem("token", data.accessToken);
      console.log("Login Successful:", data);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Invalid email or password";
      alert(message);
    },
  });
};