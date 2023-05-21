import React from 'react';
import {LineChart} from "react-native-chart-kit";
import {Dimensions, Text, View} from "react-native";
import CustomText from "../../../components/CustomText";
import {gray} from "../../../styles/Colors";

const Index = () =>{
    return (
        <View style={{
            flex:1,
        }}>
            <CustomText>Humidnity </CustomText>
            <LineChart
                data={{
                    labels: ["9AM", "10AM", "11AM", "12PM", "13AM", "14PM","15PM", "16PM", "17PM"],
                    datasets: [
                        {
                            data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                            ]
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
