import React from 'react';
import {LineChart} from "react-native-chart-kit";
import {Dimensions, Text, View} from "react-native";
import CustomText from "../../CustomText";

const Index = () =>{
    let number = Math.random() * 30;
    let spreadElements = ["9AM", "10AM", "11AM", "12PM", "13AM", "14PM", "15PM", "16PM", "17PM"];
    return (
        <View style={{
            flex:1,
        }}>
            <CustomText>Temperature </CustomText>
            <LineChart
                data={{
                    labels: [...spreadElements],
                    datasets: [
                        {
                            data: [
                                number,
                                number,
                                number,
                                number,
                                number,
                                number,
                                number,
                                number,
                                number,
                            ]
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
            />
        </View>
    )
}
export default Index;