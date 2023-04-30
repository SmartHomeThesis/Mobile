import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {deviceService} from "../../services/Device";

interface roomProps {
    id: string;
    key: string;
    name: string;
    status: string;
}

interface DeviceState {
    isLoading: boolean;
    livingRoom: roomProps[];
    parkingGarage: roomProps[];
}

const initialState: DeviceState = {
    isLoading: false,
    livingRoom: [],
    parkingGarage: [],
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
            const {id, key, name, status} = action.payload?.livingRoom;
            state.livingRoom[0] = {id, key, name, status};
            const {id: id2, key: key2, name: name2, status: status2} = action.payload?.parkingGarage;
            state.parkingGarage[0] = {id: id2, key: key2, name: name2, status: status2};
        });
        builder.addCase(toggleDevice.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(toggleDevice.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(toggleDevice.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export const getAllDevice = createAsyncThunk(
    "device/getAllDevice",
    async () => {
        try {
            const {data} = await deviceService.getAllDevice();
            return {livingRoom: data[4], parkingGarage: data[3]};
        } catch (err) {
            console.error("Error: ", err);
        }
    }
);

export const toggleDevice = createAsyncThunk(
    "device/toggleDevice",
    async ({feed, isActive}: { feed?: string; isActive: boolean }) => {
        try {
            const response = await deviceService.toggleStateDevice(feed, isActive);
        } catch (err) {
            console.error("Error: ", err);
        }
    }
);

export const {removeAllStateDevice} = deviceSlice.actions;
export default deviceSlice;
