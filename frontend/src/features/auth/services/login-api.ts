import { publicApi as api } from "../../../configs/axios";
import type { BackendWrapper } from "./signup-api";
import type { AuthResponse } from "./signup-api";
export interface LoginPayload {
  email: string;
  password?: string;
}
export const loginUser = async (credentials: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post<BackendWrapper>("/auth/login", credentials);
  return response.data.data;
};