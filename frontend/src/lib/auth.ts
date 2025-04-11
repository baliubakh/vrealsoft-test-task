import axiosInstance from ".";

import { IGoogleLoginResponse } from "../types/responses";
import { IGoogleLoginRequest } from "../types/requests";
import { toast } from "react-toastify";

export const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL || "";

export const googleLogin = async (credential?: string) => {
  try {
    const res = await axiosInstance.post<
      IGoogleLoginRequest,
      IGoogleLoginResponse
    >("/auth/google-login", {
      token: credential,
    });
    return res;
  } catch (err) {
    toast.error(`Error on user login!`);
    console.error({ err });
  }
};
