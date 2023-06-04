import React from 'react';
import {LineChart} from "react-native-chart-kit";
import {Dimensions, Text, View} from "react-native";
import CustomText from "../../CustomText";
import {useAppSelector} from "../../../hooks";

const Index = () =>{
    const temperature = useAppSelector(state => state.analysisChart.temperature)
    let labelTemp:string[] = []
    let dataTemp:number[]=[]
    if(temperature.datas.length === 0){
             labelTemp = ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00'],
             dataTemp = [Math.random()*40, Math.random()*40,Math.random()*40,Math.random()*40,Math.random()*40,Math.random()*40,Math.random()*40,Math.random()*40]
    }
    return (
        <View style={{
            flex:1,
        }}>
            <CustomText>Temperature </CustomText>
            <LineChart
                data={{
                    labels: temperature.labels.length >0 ? [...temperature.labels]:labelTemp,
                    datasets: [
                        {
                            data: temperature.labels.length >0 ? [
                                ...temperature.datas
                            ]:dataTemp
                        }
                    ]
                }}
                width={Dimensions.get("window").width - 20} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix="°C"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#188396FF",
                    backgroundGradientFrom: "#3b97b4",
                    backgroundGradientTo: "#3b97b4",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#fc0025"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
                withHorizontalLabels={true}
                withVerticalLabels={true}
                decorator={() => {

                }}
                    />
        </View>
    )
}
export default Index;