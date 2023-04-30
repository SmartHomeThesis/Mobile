import axios from "axios";
import { API_PUBLIC_ENDPOINT } from "react-native-dotenv";

export const useApi = (baseURL = API_PUBLIC_ENDPOINT, useToken = false) => {
  axios.interceptors.request.use(
    (request) => {
      if (useToken) {
        //   const token = localStorage.getItem('token');
        //   request.headers.Authorization = `Bearer ${token}`;
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
