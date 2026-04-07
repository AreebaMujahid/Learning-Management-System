import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: string;
  purpose: string;
  issuer: string;
  audience: string;
  iat: number;
  exp: number;
}
export const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    console.log("Decoded Token:", decoded);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("Token expired");
      return null;
    }

    return decoded.userId; 
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};