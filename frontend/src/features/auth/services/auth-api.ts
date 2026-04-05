import api from "../../../configs/axios";

export interface RegisterPayload {
  name: string;
  email: string;
  password : string;
  role: string;
}
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}
/**
 * Register a new user
 * @POST /auth/register
 */
export const registerUser = async (userData: RegisterPayload) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};