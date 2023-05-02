import React, {useEffect, useState} from "react";
import {View, Switch, StyleSheet} from "react-native";
import {gray} from "../../styles/Colors";
import {API_ADAFRUIT_URL, API_ADAFRUIT_KEY} from "react-native-dotenv";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getAllDevice, toggleDevice} from "../../redux/reducers/deviceSlice";

interface SwitchButtonProps {
    style?: object;
    feed?: string;
    status: boolean;
    isDisable?: boolean;
}

const index = ({style, feed, status,isDisable=false}: SwitchButtonProps) => {
    const [isEnabled, setIsEnabled] = useState(status);
    const dispatch = useAppDispatch();
    const toggleSwitch = async () => {
        try {
            await dispatch(toggleDevice({feed, isActive: isEnabled}));
            setIsEnabled((previousState) => !previousState);
        } catch (error) {
            console.error("toggleSwitch error", error);

        }
    };
    return (
        <View style={[styles.container, style]}>
            <Switch
                trackColor={{false: gray.primary, true: gray.primary}}
                thumbColor={isEnabled ? "black" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                disabled={isDisable}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
});
export default index;
