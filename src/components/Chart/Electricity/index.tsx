import React from 'react';
import {View, Text} from 'react-native';
import {BarChart} from "react-native-chart-kit";
import {Dimensions} from "react-native";
import BoxUsage from "./BoxUsage";
import {gray, orange, purple} from "../../../styles/Colors";

const Index = () => {
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };
    return (
        <>
            <BarChart
                data={data}
                width={Dimensions.get("window").width -20} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                chartConfig={{
                    backgroundColor: "#188396FF",
                    backgroundGradientFrom: 'white',
                    backgroundGradientTo: 'white',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => 'black',
                    labelColor: (opacity = 1) => gray.primary,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#fc0025"
                    }
                }}
                verticalLabelRotation={30}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
            <View style={{
                flexDirection:"row",
                marginTop:20,
                justifyContent:"space-around",
                width:"100%"
            }}>
                <BoxUsage title={`Electricity \nCost`} cost={`$415.42`} color={purple.primary} type="cost" />
                <BoxUsage title={`Electricity \nUsage`} cost={`415.43 kw`} color={orange.secondary} type="cost" />
            </View>
        </>
    )
};

export default Index;