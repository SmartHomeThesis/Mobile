import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenService } from "../../services/Authentication";

interface LoginState {
  isLoading: boolean;
  isAuthen: boolean;
}
interface userType {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}
interface loginPayload {
  data: {
    data: {
      user: userType;
      accessToken: string;
    };
    message: string;
    status: string;
  };
  status: number;
}

const initialState: LoginState = {
  isLoading: false,
  isAuthen: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAccount.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginAccount.fulfilled, (state, action) => {
      if (action.payload?.status === 200) {
        state.isAuthen = true;
        state.isLoading = false;
      }
    });
  },
});

export const loginAccount = createAsyncThunk(
  "login/loginAccount",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data: Response, status } = await authenService.login(
        email,
        password
      );
      return { data: Response.data, status };
    } catch (err) {
      console.error("Error: ", err);
    }
  }
);

export default loginSlice;
