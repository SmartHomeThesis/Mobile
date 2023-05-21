import { useApi } from "../api";
import {API_PUBLIC_ENDPOINT} from "react-native-dotenv";

// setting content-type
export const authenService = {
  login: async (email: string, password: string): Promise<any> => {
    return useApi(API_PUBLIC_ENDPOINT,false).post("/api/auth/login", {email, password});
  },
  sendInviteEmail: async (email: string): Promise<any> => {
    return useApi().post("/api/users/send-invitation", { email });
  },
  register: async (payload: any): Promise<any> => {
    return useApi().post("/api/auth/register", payload);
  },
  showAllUser: async (): Promise<any> => {
    return useApi().get("/api/users");
  },
  setPermission: async (payload: any,user_id:number): Promise<any> => {
    console.log("payload",payload, user_id)
    return useApi().post(`/api/users/${user_id}/permissions`, {
        permission: payload,
    });
  }
};
