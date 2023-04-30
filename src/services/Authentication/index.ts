import { ResponseType } from "axios";
import { useApi } from "../api";

// setting content-type
export const authenService = {
  login: async (email: string, password: string): Promise<any> => {
    console.log("Service Login");
    return useApi().post("/api/auth/login", { email, password });
  },
};
