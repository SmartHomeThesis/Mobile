import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles as stylesGlobal } from "../styles/Global";
import CustomText from "../components/CustomText";
import CustomTab from "../components/CustomTab";
import { gray } from "../styles/Colors";
import { LivingRoom, BedRoom, ParkingGarage } from "../constant/device";
import ListDevice from "../components/ListDevice";
import Avatar from "../components/Avatar";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  getAllDevice,
  removeAllStateDevice,
} from "../redux/reducers/deviceSlice";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
interface sennsorProps {
  name: string;
  unit: string;
  param: string;
}

const Sensor = ({ name, unit, param }: sennsorProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        marginVertical: 6,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {name === "Temperature" ? (
          <FontAwesome5Icon name="temperature-high" color="red" size={20} />
        ) : (
          <Ionicons name="md-water-outline" color="blue" size={20} />
        )}
        <CustomText style={{ fontWeight: "bold", marginLeft: 8 }}>
          {name}
          <Text style={{ color: gray.primary, fontWeight: "500" }}>
            / {unit}
          </Text>
        </CustomText>
      </View>
      <CustomText style={{ fontSize: 24, fontWeight: "500" }}>
        {param}
      </CustomText>
    </View>
  );
};

const Home = ({ navigation }: { navigation: any }) => {
  const [tab, setTab] = React.useState<number>(0);
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.device);
  const rooms = ["Living room", "Bedroom", "Parking garage"];
  useEffect(() => {
    const unsubcribe = navigation.addListener("focus", async () => {
         await dispatch(getAllDevice());
        });
    return () => {
      dispatch(removeAllStateDevice());
      unsubcribe();
    };
  }, []);
  return (
    <ScrollView contentContainerStyle={stylesGlobal.container}>
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
          },
        ]}
      >
        <CustomText style={{ fontSize: 24, fontWeight: "400" }}>
          Good morning,{`\n`}
          <Text style={{ fontWeight: "bold" }}>Mira</Text>
        </CustomText>
        <Icon name="bell-badge-outline" size={20} color="black" />
      </View>
      <View
        style={{
          paddingBottom: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CustomText
          style={{ color: gray.primary, fontSize: 18, fontWeight: "500" }}
        >
          Family Members
        </CustomText>
        {/* Icon */}
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Avatar
            url={require("../assets/images/dog_avatar.png")}
            width={30}
            height={30}
          />
          <Avatar
            url={require("../assets/images/man_avatar.png")}
            width={30}
            height={30}
          />
          <Avatar
            url={require("../assets/images/man2_avatar.png")}
            width={30}
            height={30}
          />
          <Avatar
            url={require("../assets/images/woman_avatar.png")}
            width={30}
            height={30}
          />
        </View>
      </View>
      <Sensor name="Temperature" unit="°C" param={state.temperature.value} />
      <Sensor name="Humidity" unit="%" param={state.humidity.value} />
      <CustomTab selectionMode={0} onSelectSwitch={setTab} listTab={rooms} />
      {tab === 0 && (
        <View style={styles.boxContainer}>
          {LivingRoom.map((item, index) => (
            <ListDevice
              id={item.id}
              name={item.name}
              feed_name={state?.livingRoom[0]?.key}
              status={state?.livingRoom[0]?.status === "1"}
              image={item.image}
              key={index}
              onPress={() => {
                navigation.navigate("DetailDevice", {
                  id: item.id,
                  name: item.name,
                  isActive: state?.livingRoom[0]?.status === "1",
                  feed_name: state?.livingRoom[0]?.key,
                });
              }}
            />
          ))}
        </View>
      )}
      {tab === 1 && (
        <View style={styles.boxContainer}>
          {BedRoom.map((item, index) => (
            <ListDevice
              id={item.id}
              name={item.name}
              feed_name={item.name}
              status={item.status}
              image={item.image}
              key={index}
              onPress={() => {
                navigation.navigate("DetailDevice", {
                  id: item.id,
                  name: item.name,
                  isActive: true,
                    feed_name: "",
                });
              }}
            />
          ))}
        </View>
      )}
      {tab === 2 && (
        <View style={styles.boxContainer}>
          {ParkingGarage.map((item, index) => (
            <ListDevice
              id={item.id}
              name={item.name}
              feed_name={state?.parkingGarage[0]?.key}
              status={state?.parkingGarage[0]?.status === "1"}
              image={item.image}
              key={index}
              onPress={() => {
                navigation.navigate("DetailDevice", {
                  id: item.id,
                  name: item.name,
                  isActive: state?.parkingGarage[0]?.status === "1",
                  feed_name: state?.parkingGarage[0]?.key,
                });
              }}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    flexWrap: "wrap",
  },
});

export default Home;
