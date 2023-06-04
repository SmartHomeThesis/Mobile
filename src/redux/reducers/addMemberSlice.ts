import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authenService} from "../../services/Authentication";
import {avatarName} from "../../types";

const avatars:avatarName[] =["dog_avatar","woman_avatar","man_avatar","man2_avatar"];
export interface IPermission {
    id: number,
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
        builder.addCase(registerAccount.fulfilled, (state, action) => {
            state.status = "idle";
        })
        builder.addCase(showAllUser.pending, (state, action) => {
            state.status = "loading";
        })
        builder.addCase(showAllUser.fulfilled, (state, action) => {
            state.status = "idle";
            state.allMember = action.payload?.data;
        })
        builder.addCase(showAllUser.rejected, (state, action) => {
            state.status = "error";
        })
        builder.addCase(setPermission.pending, (state, action) => {
            state.status = "loading"
        })
        builder.addCase(setPermission.fulfilled, (state, action) => {
            state.status = "idle";
            // const {permission,user_id} = action.payload;
            // state.permission = permission;
            state.allMember.forEach((member) => {
                if (member.id === action.payload?.data?.id) {
                    member.permissions = action.payload.data.permissions;
                }
            })
        })
        builder.addCase(setPermission.rejected, (state, action) => {
            state.status = "error";
        })
    }
});
export const sendInviteEmail = createAsyncThunk(
    "addMember/sendInviteEmail",
    async (email: string, thunkAPI) => {
        try {
            const {data,status} = await authenService.sendInviteEmail(email);
            return {data,status};
        } catch (error) {
            if (error instanceof Error)
                return thunkAPI.rejectWithValue(error.message);
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
            const {data,status} = await authenService.register({username,email,phone,password,otp});
            return {data,status};
        } catch (error) {
            if (error instanceof Error)
                return thunkAPI.rejectWithValue(error.message);
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
export const setPermission = createAsyncThunk(
    "addMember/setPermission",
    async ({permission,user_id}:any, thunkAPI) => {
        try {
            const {data:{data:ResponseData},status} = await authenService.setPermission(permission,user_id)
            console.log("set permission result: " + ResponseData);
            return {data:ResponseData,status }
        } catch (error) {
            console.log("error",error)
        }
    }
)
export default addMemberSlice