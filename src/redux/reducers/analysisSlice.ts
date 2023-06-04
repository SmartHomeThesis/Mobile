import {createSlice} from "@reduxjs/toolkit";
import temperature from "../../components/Chart/Temperature";

interface IChartData {
    labels: string[];
    datas: number[];
}
interface IAnalysis{
    temperature: IChartData,
    humidity:IChartData,
    maxSizeQueue: number,
}
const initialState:IAnalysis ={
    temperature:{
        labels:[],
        datas:[],
    } as IChartData,
    humidity:{
        labels:[],
        datas:[],
    }  as IChartData,
    maxSizeQueue:6,
}

const analysisSlice = createSlice({
    name: 'analysis',
    initialState,
    reducers:{
        addNewValue:(state,action) =>{
            const {name, label, data} = action.payload
            console.log(name, label, data)
            if( name === "temperature"){
            //     add new value label and data to state.temperature if length > 10 remove follow queue
                state.temperature.labels.push(label)
                state.temperature.datas.push(data)
                if (state.temperature.labels.length > state.maxSizeQueue) {
                    state.temperature.labels.shift()
                    state.temperature.datas.shift()
                }
                }
            else if (name === 'humidity') {
                state.humidity.labels.push(label)
                state.humidity.datas.push(data)
                if (state.humidity.labels.length > state.maxSizeQueue) {
                    state.humidity.labels.shift()
                    state.humidity.datas.shift()
                }
            }
            }
        }
    })
export const {addNewValue} = analysisSlice.actions
export  default  analysisSlice