import axios from "axios";
import { API_ADAFRUIT_URL, API_ADAFRUIT_KEY } from "react-native-dotenv";

export enum deviceState {
  ON = "1",
  OFF = "0",
}

export const deviceService = {
  getAllDevice: async (): Promise<any> => {
    return axios.get(`${API_ADAFRUIT_URL}`, {
      headers: {
        "X-AIO-Key": API_ADAFRUIT_KEY,
      },
    });
  },
  toggleStateDevice: async (
    feed?: string,
    isActive?: boolean
  ): Promise<any> => {
    return axios.post(
      `${API_ADAFRUIT_URL}/${feed}/data`,
      {
        value: isActive ? deviceState.OFF : deviceState.ON,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-AIO-Key": API_ADAFRUIT_KEY,
        },
      }
    );
  },
};
