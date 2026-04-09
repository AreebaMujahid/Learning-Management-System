import { publicApi as api } from "../../../configs/axios";
export interface RegisterPayload {
  name: string;
  email: string;
  password : string;
  role: string;
}
export interface AuthResponse {
  accessToken: string;
}
export interface BackendWrapper {
  success: boolean;
  statusCode: number;
  message: string;
  data: AuthResponse;
}
export const registerUser = async (userData: RegisterPayload) => {
  const response = await api.post<BackendWrapper>("/auth/register", userData);
  return response.data.data;
};