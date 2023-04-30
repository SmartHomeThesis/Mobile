import React from 'react';
import {BarChart} from "react-native-chart-kit";
import {Dimensions} from "react-native";

const Electricity = () => {
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };
    return (
        <BarChart
            data={data}
            width={Dimensions.get("window").width - 20} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            chartConfig={{
                backgroundColor: "#188396FF",
                backgroundGradientFrom: "#f6eaea",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
    )
};

export default Electricity;