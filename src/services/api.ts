import axios from "axios";
import { API_PUBLIC_ENDPOINT } from "react-native-dotenv";
import { getToken } from "./storage";

export const useApi = (baseURL = API_PUBLIC_ENDPOINT, useToken = true) => {
  axios.interceptors.request.use(
    async (request) => {
      if (useToken) {
        const token = await getToken();
        if (token) {
          request.headers["token"] = `${token}`;
        }
      }
      request.timeout = 2000;
      request.baseURL = baseURL;
      request.headers["Content-Type"] = "application/json";
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
        response => response,
        error => {
            if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
                console.log('Request timed out');
            }
            return Promise.reject(error);
        }
    );
  return axios;
};
