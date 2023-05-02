import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {deviceService} from "../../services/Device";

type deviceProps = {
    id: number;
    key: string;
    name: string;
}

type RoomProps = deviceProps & {
    status:string
}
type SensorProps =   deviceProps & {
    value:string
}

interface DeviceState {
    status: "idle" | "loading" | "failed";
    livingRoom: RoomProps[];
    parkingGarage: RoomProps[];
    temperature:SensorProps
    humidity:SensorProps
}

const initialState: DeviceState = {
    status: "idle",
    livingRoom: [],
    parkingGarage: [],
    temperature:{
        id:0,
        key:"",
        name:"",
        value:""
    },
    humidity:{
        id:0,
        key:"",
        name:"",
        value:""
    }
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
        });
        builder.addCase(getAllDevice.fulfilled, (state, action) => {
            const {id, key, name, last_value} = action.payload?.livingRoom;
            state.livingRoom[0] = {id, key, name, status:last_value};
            const {id: id2, key: key2, name: name2, last_value: last_value_2} = action.payload?.parkingGarage;
            state.parkingGarage[0] = {id: id2, key: key2, name: name2, status: last_value_2};
            const {id: id3, key: key3, name: name3, last_value: last_value_3} = action.payload?.temperature;
            state.temperature = {id: id3, key: key3, name: name3, value: last_value_3};
            const {id: id4, key: key4, name: name4, last_value: last_value_4} = action.payload?.humidity;
            state.humidity = {id: id4, key: key4, name: name4, value: last_value_4};
        });
        builder.addCase(toggleDevice.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(toggleDevice.fulfilled, (state,action) => {
            state.status = "idle";
            const {feed_id,value}:{feed_id:number,value:string} = action.payload?.response;
            if (state.livingRoom[0].id === feed_id){
                state.livingRoom[0].status = value;
            }
            else {
                state.parkingGarage[0].status = value;
            }

        });
        builder.addCase(toggleDevice.rejected, (state) => {
            state.status = "failed";
        });
    },
});

export const getAllDevice = createAsyncThunk(
    "device/getAllDevice",
    async () => {
        try {
            const {data} = await deviceService.getAllDevice();
            return {livingRoom: data[4], parkingGarage: data[3], temperature: data[0], humidity: data[1]};
        } catch (err) {
            console.error("Error: ", err);
        }
    }
);

export const toggleDevice = createAsyncThunk(
    "device/toggleDevice",
    async ({feed, isActive}: { feed?: string; isActive: boolean }) => {
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
