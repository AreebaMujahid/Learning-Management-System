import { useMutation } from "@tanstack/react-query";
import { loginUser} from "../services/login-api";
import type {AuthResponse } from "../services/auth-api";
import type { LoginPayload } from "../services/login-api";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (credentials: LoginPayload) => loginUser(credentials),
    onSuccess: (data: AuthResponse) => {
      console.log("Login successful, received data:", data);
      if (data) {
        localStorage.setItem("accessToken", data.accessToken);
        console.log("Token successfully saved in LocalStorage.");
      }
      console.log("Login Successful:", data);
      navigate("/add-course", { replace: true });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Invalid email or password";
      alert(message);
    },
  });
};