import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authenService} from "../../services/Authentication";
import {avatarName} from "../../types";

const avatars:avatarName[] =["dog_avatar","woman_avatar","man_avatar","man2_avatar"];
export interface IPermission {
    id_pms: number,
    permission: string,
}
export interface IMember {
    id: number,
    email: string,
    name:string,
    avatar: avatarName,
    permissions: IPermission[]
}

const initialState: {status:string,allMember:IMember[]} = {
    status: "idle",
    allMember: []
}

const addMemberSlice = createSlice({
    name: "addMember",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerAccount.pending, (state, action) => {
            state.status = "loading";
        })

        builder.addCase(showAllUser.fulfilled, (state, action) => {
            state.status = "idle";
            state.allMember = action.payload?.data;
        })
        builder.addCase(showAllUser.rejected, (state, action) => {
            state.status = "error";
        })
    }
});
export const sendInviteEmail = createAsyncThunk(
    "addMember/sendInviteEmail",
    async (email: string, thunkAPI) => {
        try {
            const {data} = await authenService.sendInviteEmail(email);
            return data;
        } catch (error) {
            console.log("error",error)
        }
    }
)
interface IRegisterAccount {
    username: string,
    email: string,
    password: string,
    phone: string,
    otp: string
}
export const registerAccount = createAsyncThunk(
    "addMember/registerAccount",
    async ({username,email,phone,password,otp}:IRegisterAccount, thunkAPI) => {
        try {
            console.log(username,email,phone,password,otp);
            const {data,status} = await authenService.register({username,email,phone,password,otp});

            return {data,status};
        } catch (error) {
            // return thunkAPI.rejectWithValue(error.response);
            console.log("error",error)
        }
    }
)
export const showAllUser = createAsyncThunk(
    "addMember/showAllUser",
    async () => {
        try {
            const {data:{data:Response},status} = await authenService.showAllUser();
            Response.forEach((member:IMember) => {
                member.avatar = avatars[Math.floor(Math.random() * avatars.length)];
            });
            return {data:Response,status}
        } catch (error) {
            console.log("error",error)
        }
    } )

export default addMemberSlice;