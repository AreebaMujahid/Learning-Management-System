import api from "../../../configs/axios";
import type { AuthResponse } from "./auth-api";
export interface LoginPayload {
  email: string;
  password?: string;
}
/**
 * Login user
 * @POST /auth/login
 */
export const loginUser = async (credentials: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};