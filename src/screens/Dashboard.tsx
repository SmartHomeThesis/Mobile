import { View, Text } from "react-native";
import React from "react";
import { LivingRoom, BedRoom, ParkingGarage } from "../constant/device";
import DashBoard from "../components/DashBoard";
import { useAppSelector } from "../hooks";

const Room = () => {
  const temp = useAppSelector((state) => state.device.temperature.value);
  const devices = useAppSelector((state) => state.device);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <DashBoard
        name="Living room"
        numdevice={4}
        imageRoom={require("../assets/images/livingroom.jpg")}
        temperature={parseFloat(temp)}
        listDevice={LivingRoom}
        feed_name={devices.livingRoom[0].key}
        status={devices.livingRoom[0].status === "1"}
      />
      <DashBoard
        name="Bed room"
        numdevice={4}
        imageRoom={require("../assets/images/bedroom.jpg")}
        temperature={33}
        listDevice={BedRoom}
        feed_name={""}
        status={true}
      />
      <DashBoard
        name="Garage"
        numdevice={4}
        imageRoom={require("../assets/images/garage.jpg")}
        temperature={parseFloat(temp)}
        listDevice={ParkingGarage}
        feed_name={devices.parkingGarage[0].key}
        status={devices.parkingGarage[0].status === "1"}
      />
    </View>
  );
};

export default Room;
