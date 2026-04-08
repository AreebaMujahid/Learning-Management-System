import apiClient from "../../../configs/axios";
export const logoutUser = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};