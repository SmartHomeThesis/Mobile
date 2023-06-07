import React, {memo, useEffect, useState} from "react";
import {View, Switch, StyleSheet} from "react-native";
import {gray} from "../../styles/Colors";
import {API_ADAFRUIT_URL, API_ADAFRUIT_KEY} from "react-native-dotenv";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getAllDevice, toggleDevice} from "../../redux/reducers/deviceSlice";
import {useMQTT} from "../../context/MqttContext";
import {topic} from "../../constant/device";

interface SwitchButtonProps {
    style?: object;
    feed: string;
    status: boolean;
    isDisable?: boolean;
}

const index = ({style, feed, status,isDisable=false}: SwitchButtonProps) => {
    // const [isEnabled, setIsEnabled] = useState<boolean>(status);
    const dispatch = useAppDispatch();
    const {client} = useMQTT();
    const toggleSwitch = async () => {
        // try {
        //     await dispatch(toggleDevice({feed, isActive: isEnabled}));
        // } catch (error) {
        //     console.error("toggleSwitch error", error);
        //
        // }
        console.log("toggleSwitch", feed, status)
        // setIsEnabled((previousState) => !previousState);
        client.publish(`HuuHanh/f/${feed}`, status ? "0" : "1", 0, false);

    };
    return (
        <View style={[styles.container, style]}>
            <Switch
                trackColor={{false: gray.primary, true: gray.primary}}
                thumbColor={status ? "black" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={status}
                disabled={isDisable}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
});
export default memo(index);
