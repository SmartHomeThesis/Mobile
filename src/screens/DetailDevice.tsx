import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import BackIcon from "../components/BackIcon";
import { styles as styleGlobal } from "../styles/Global";
import SwitchButton from "../components/SwitchButton";
import CustomButton from "../components/Button/CustomButton";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../hooks";
import { toggleDevice } from "../redux/reducers/deviceSlice";

const DetailDevice = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { isActive, feed_name } = route.params;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const dispatch = useAppDispatch();
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: Date) => {
    console.log("A date has been picked: ", date);
    setSelectedDate(date);
    hideDatePicker();
  };
  // handle logic to turn on/off device when schedule
  useEffect(() => {
    if (selectedDate) {
      //   @ts-ignore
      const secondsLeft = Math.floor(selectedDate - Date.now());
      console.log("setTimeout senconds: ", secondsLeft);
      if (secondsLeft < 0) return;
      var timerID = setTimeout(() => {
        dispatch(toggleDevice({ feed: feed_name, isActive }));
      }, secondsLeft);
    }
    () => clearTimeout(timerID);
  }, [selectedDate]);
  return (
    <View style={styleGlobal.container}>
      <BackIcon navigation={navigation} />
      <View
        style={[
          styles.container,
          {
            marginTop: 16,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>
            {route.params?.name}
          </Text>
          <SwitchButton status={isActive} isDisable={true} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            maxWidth: "50%",
            paddingVertical: 16,
          }}
        >
          <Text>IF</Text>
          <AntDesign name="arrowright" size={20} color="#000" />
          <Text>DO</Text>
          <Text>{isActive ? "Activated" : "Deactivated"}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              <MaterialIcons
                name="location-on"
                size={24}
                color="#000"
                style={{
                  marginTop: 10,
                }}
              />
              <View style={{ marginLeft: 8 }}>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#000" }}
                >
                  Location
                </Text>
                <Text>Living room</Text>
              </View>
              <View>{/* Image */}</View>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <MaterialCommunityIcons
                name="clock"
                size={24}
                color="#000"
                style={{
                  marginTop: 10,
                }}
              />
              <View style={{ marginLeft: 8 }}>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#000" }}
                >
                  Time
                </Text>
                <Text>Around</Text>
                <Text>15:00 - 17:00 </Text>
              </View>
              <View>{/* Image */}</View>
            </View>
          </View>
          <View
            style={{
              flex: 0.5,
              backgroundColor: isActive ? "white" : "black",
              borderRadius: 20,

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
            }}
          >
            <Image
              source={require("../assets/images/lamp.png")}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 120,
              }}
            />
          </View>
        </View>
      </View>
      <View style={[styles.container, { marginTop: 20 }]}>
        <Text style={styles.schedule_header}>Today's usage</Text>
        <View style={styles.schedule_time}>
          <Text>2 Hourses - </Text>
          <Text>1.5 KwH</Text>
        </View>
        <CustomButton
          label="Set schedule"
          onPress={showDatePicker}
          styleText={styles.schedule_button_label}
          styleButton={styles.schedule_button}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          date={selectedDate}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 14,
    width: "100%",
  },
  schedule_header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  schedule_time: {
    flexDirection: "row",
    padding: 10,
  },
  schedule_button: {
    backgroundColor: "#000",
    paddingVertical: 10,
    borderRadius: 20,
  },
  schedule_button_label: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DetailDevice;
