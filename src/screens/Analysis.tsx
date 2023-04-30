import {View} from 'react-native';
import React from 'react';
import Temperature from "../components/Chart/Temperature";
import Humidity from "../components/Chart/Humidity";
import Electricity from "../components/Chart/Electricity";

const Analysis = () => {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
        }}>
            <Electricity />
            {/*<Temperature />*/}
            {/*<Humidity />*/}
        </View>
    );
};

export default Analysis;
