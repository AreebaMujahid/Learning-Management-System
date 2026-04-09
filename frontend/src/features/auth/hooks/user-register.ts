import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/signup-api";
import type { RegisterPayload, AuthResponse } from "../services/signup-api";
import { AxiosError } from "axios";

export const useRegister = () => {
  return useMutation<AuthResponse, AxiosError<{ message: string }>, RegisterPayload>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        console.log("Token successfully saved in LocalStorage.");
      }
      console.log("accessToken.", data.accessToken);
      console.log("Registered Successfully and Token Saved.", data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Something went wrong";
      alert(message);
    }
  });
};