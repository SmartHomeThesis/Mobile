import axios from "axios";
import { API_PUBLIC_ENDPOINT } from "react-native-dotenv";
import { getToken } from "./storage";

export const useApi = (baseURL = API_PUBLIC_ENDPOINT, useToken = true) => {
  axios.interceptors.request.use(
    async (request) => {
      if (useToken) {
        const token = await getToken();
        if (token) {
          console.log("useAPI token", token);
          request.headers["token"] = `${token}`;
        }
      }
      request.baseURL = baseURL;
      request.headers["Content-Type"] = "application/json";
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return axios;
};
