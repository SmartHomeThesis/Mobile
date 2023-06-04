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
  permission: number[]
}

interface loginResponse {
  data: {
    data: userInfo;
  };
  status: number;
}

const initialState: LoginState = {
  status: "idle",
  user: {},
  permission:[]
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
    builder.addCase(getPermission.pending, (state, action) => {
      state.status= "loading";
    })
    builder.addCase(getPermission.fulfilled, (state, action) => {
      state.status = "idle";
      if (action.payload?.status === 200) {
        state.permission = action.payload?.data.permissions.map((item:any)=>item.id)
      }
    })
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
      console.log("status", status);
      await storeToken(Response.accessToken);
      return { data:Response, status };
    } catch (err) {
      console.error("Error: ", err);
    }
  }
);
export const getPermission = createAsyncThunk(
    "login/getPermission",
    async ({user_id}:{user_id:number}) => {
        try {
            const { data:{data:Response}, status }= await authenService.getPermisson(
                user_id
            );
            return { data:Response, status };
        } catch (err) {
            console.error("Error: ", err);
        }
    })
export default loginSlice;
