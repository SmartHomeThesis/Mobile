import React from 'react';
import {LineChart} from "react-native-chart-kit";
import {Dimensions, Text, View} from "react-native";
import CustomText from "../../../components/CustomText";
import {gray} from "../../../styles/Colors";
import {useAppSelector} from "../../../hooks";

const Index = () =>{
    const humidity = useAppSelector(state => state.analysisChart.humidity)
    let labelHumid:string[] =[]
    let dataHumid:number[] = [];
    if(humidity.datas.length === 0){
            labelHumid = ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00']
            dataHumid = [Math.random()*30, Math.random()*30,Math.random()*30,Math.random()*30,Math.random()*30,Math.random()*30,Math.random()*30,Math.random()*30]
    }
    // @ts-ignore
    // @ts-ignore
    return (
        <View style={{
            flex:1,
        }}>
            <CustomText>Humidnity </CustomText>
            <LineChart
                data={{
                    labels:humidity.labels.length > 0 ? [...humidity.labels]:labelHumid,
                    datasets: [
                        {
                            // @ts-ignore
                            data:humidity.labels.length > 0 ? [
                                ...humidity.datas
                            ]: dataHumid
                        }
                    ]
                }}
                width={Dimensions.get("window").width - 20} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix="%"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#fdfcfc",
                    backgroundGradientTo: "#f6a56c",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => gray.primary,

                    labelColor: (opacity = 1) => gray.primary,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#eedc19"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </View>
    )
}
export default Index;
