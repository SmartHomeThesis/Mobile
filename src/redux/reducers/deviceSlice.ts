import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {deviceService} from "../../services/Device";


type deviceProps = {
    id: number;
    key: string; // feed_id
    name: string;
    last_value: string;
}



interface DeviceState {
    status: "idle" | "loading" | "failed";
    livingRoom: deviceProps[] | Record<any, any>[]
    bedRoom: deviceProps[] | Record<any, any>[];
    parkingGarage: deviceProps[] | Record<any, any>[];
    temperature:deviceProps | Record<any, any>
    humidity:deviceProps | Record<any, any>
}

const initialState: DeviceState = {
    status: "idle",
    livingRoom: [],
    bedRoom: [],
    parkingGarage: [],
    temperature:{},
    humidity:{}
};


const deviceSlice = createSlice({
    name: "device",
    initialState,
    reducers: {
        removeAllStateDevice: (state) => {
            state.livingRoom = [];
            state.parkingGarage = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllDevice.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getAllDevice.fulfilled, (state, action) => {
            if(typeof action.payload === "undefined") return;
            const {livingRoom,bedRoom,parkingGarage,temperature,humidity} = action.payload;
            state.livingRoom = livingRoom;
            state.bedRoom = bedRoom;
            state.parkingGarage = parkingGarage;
            state.temperature = temperature;
            state.humidity = humidity;
            state.status = "idle";
        });
        builder.addCase(toggleDevice.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(toggleDevice.fulfilled, (state,action) => {
            if(typeof action.payload === "undefined") return;
            const {feed_id,feed_key,value}  = action.payload.response;
            // Todo need to refactor after. It's not good solution
            if(state.livingRoom[0].key === feed_key){
                state.livingRoom[0].last_value =  value;
            }
            if(state.bedRoom[0].key === feed_key){
                state.bedRoom[0].last_value =  value;
            }
            if(state.parkingGarage[0].key === feed_key){
                state.parkingGarage[0].last_value =  value;
            }
            state.status = "idle";

        });
        builder.addCase(toggleDevice.rejected, (state) => {
            state.status = "failed";
        });
    },
});

interface deviceResponse<T> {
    [key: string]: T
}
export const getAllDevice = createAsyncThunk(
    "device/getAllDevice",
    async () => {
        try {
            const {data} = await deviceService.getAllDevice();
            const responseData:deviceResponse<deviceProps> = {}
            data.forEach((item: deviceProps) => {
                   responseData[item.name] = item;
            })
            return {
                humidity:responseData.Humidity,
                temperature:responseData.Temperature,
                livingRoom:[responseData.Light_Livingroom],
                bedRoom:[responseData.Light_Bedroom],
                parkingGarage:[responseData.Light_Bedroom]
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    }
);

export const toggleDevice = createAsyncThunk(
    "device/toggleDevice",
    async ({feed, isActive}: { feed: string; isActive: boolean }) => {
        try {
            const {data:response} = await deviceService.toggleStateDevice(feed, isActive);
            return {response};
        } catch (err) {
            console.error("Error: ", err);
        }
    }
);

export const {removeAllStateDevice} = deviceSlice.actions;
export default deviceSlice;
