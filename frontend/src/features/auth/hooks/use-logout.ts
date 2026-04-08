import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../services/logout-api";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      navigate("/login");
      console.log("Logged out and cleaned storage.");
    },
    onError: (error) => {
      //if backend down , still it should logged out
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  });
};