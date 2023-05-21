import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenService } from "../../services/Authentication";
import {getToken, storeToken} from "../../services/storage";


interface userType {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}
interface userInfo {
  user_reponse: userType;
  accessToken: string
  status: number;
}
interface LoginState {
  status: "idle" | "loading" | "failed";
  user: userInfo | Record<any, any>;
}

interface loginResponse {
  data: {
    data: userInfo;
  };
  status: number;
}

const initialState: LoginState = {
  status: "idle",
  user: {}
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAccount.pending, (state, action) => {
      state.status= "loading";
    });
    builder.addCase(loginAccount.fulfilled, (state, action) => {
      state.status = "idle";
      if (action.payload?.status === 200) {
        state.user = action.payload.data
      }
    });
    builder.addCase(loginAccount.rejected, (state, action) => {
      state.status = "failed";
    } );
  },
});

export const loginAccount = createAsyncThunk(
  "login/loginAccount",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data:{data:Response}, status }:loginResponse = await authenService.login(
        email,
        password
      );
      await storeToken(Response.accessToken);
      return { data:Response, status };
    } catch (err) {
      console.error("Error: ", err);
    }
  }
);

export default loginSlice;
