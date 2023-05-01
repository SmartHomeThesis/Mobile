import React from 'react';
import {StyleSheet, Text, View} from "react-native";

interface Props {
    title: string;
    cost: string;
    color: string;
    type: string;
}

const MyComponent = (props: Props) => {
    return (
        <View style={{
            borderRadius: 10,
            backgroundColor: props.color,
            padding: 20

        }}>
            <Text style={[styles.content, {
                fontSize: 20,
                fontWeight: 'bold'
            }]}>{props.title}</Text>
            <Text style={[styles.content, {
                fontSize: 24,
                marginTop: 20,
            }]}>{props.cost}</Text>
            <Text style={[styles.content, {
                opacity: 0.6,
            }]}>This week</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        color: "white"
    }
})
export default MyComponent;
