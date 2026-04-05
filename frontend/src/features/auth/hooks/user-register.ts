import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/auth-api";
import type { RegisterPayload, AuthResponse } from "../services/auth-api";
import { AxiosError } from "axios";

export const useRegister = () => {
  return useMutation<AuthResponse, AxiosError<{ message: string }>, RegisterPayload>({
    mutationFn: registerUser,
    
    onSuccess: (data) => {
      console.log("Registered Successfully. Tokens:", data);
    },
    
    onError: (error) => {
      const message = error.response?.data?.message || "Something went wrong";
      alert(message);
    }
  });
};