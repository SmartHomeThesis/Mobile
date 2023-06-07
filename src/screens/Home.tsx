import {View, Text, StyleSheet, ScrollView, Image, ActivityIndicator} from "react-native";
import React, {useEffect} from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {styles as stylesGlobal} from "../styles/Global";
import CustomText from "../components/CustomText";
import CustomTab from "../components/CustomTab";
import {gray} from "../styles/Colors";
import {
  LivingRoom,
  BedRoom,
  ParkingGarage,
  deviceState, topic
} from "../constant/device";
import ListDevice from "../components/ListDevice";
import {useAppDispatch, useAppSelector} from "../hooks";
import {
  getAllDevice,
  removeAllStateDevice,
} from "../redux/reducers/deviceSlice";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useMQTT} from "../context/MqttContext";
import {showAllUser} from "../redux/reducers/addMemberSlice";
import {imagesAvatar} from "../constant/image";
import Avatar from "../components/Avatar";
import {getPermission} from "../redux/reducers/loginSlice";

interface sensorProps {
  name: string;
  unit: string;
  param: string;
}

const Sensor = ({name, unit, param}: sensorProps) => {
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
          <FontAwesome5Icon name="temperature-high" color="red" size={20}/>
        ) : (
          <Ionicons name="md-water-outline" color="blue" size={20}/>
        )}
        <CustomText style={{fontWeight: "bold", marginLeft: 8}}>
          {name}
          <Text style={{color: gray.primary, fontWeight: "500"}}>
            / {unit}
          </Text>
        </CustomText>
      </View>
      <CustomText style={{fontSize: 24, fontWeight: "500"}}>
        {param}
      </CustomText>
    </View>
  );
};

const rooms = ["Living room", "Bedroom", "Parking garage"];
const Home = ({navigation}: { navigation: any }) => {
  const [tab, setTab] = React.useState<number>(0);
  const dispatch = useAppDispatch();
  const device = useAppSelector((state) => state.device);
  const userLogin = useAppSelector((state) => state.login);
  const allMember = useAppSelector((state) => state.addMember.allMember);
  const user_id = useAppSelector((state) => state.login.user.user_reponse.id)
  const permission = useAppSelector((state) => state.login.permission)
  const isHost = useAppSelector(state => state?.login?.user?.user_reponse?.role === "Host")
  const {client} = useMQTT();
  useEffect(() => {
    //   Error here state equal when get all device. It not render page
    const unsubscribe = navigation.addListener("focus", async () => {

      await dispatch(getAllDevice());

      isHost && await dispatch(showAllUser())
      await dispatch(getPermission({user_id}))


    });
    return () => {
      dispatch(removeAllStateDevice());
      unsubscribe();
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
        <CustomText style={{fontSize: 24, fontWeight: "400"}}>
          Good morning,{`\n`}
          <Text style={{fontWeight: "bold"}}>{userLogin?.user?.user_reponse?.username ?? ""}</Text>
        </CustomText>
        <Icon name="bell-badge-outline" size={20} color="black"/>
      </View>
      <View
        style={{
          paddingBottom: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CustomText
          style={{color: gray.primary, fontSize: 18, fontWeight: "500"}}
        >
          Family Members
        </CustomText>
        {/* Icon */}
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {
            allMember?.map((member, index) => (
              <Avatar url={imagesAvatar[member.avatar]} width={30} height={30} key={index}/>
            ))
          }
        </View>
      </View>
      <Sensor
        name="Temperature"
        unit="°C"
        param={device.temperature.last_value}
      />
      <Sensor name="Humidity" unit="%" param={device.humidity.last_value}/>
      <CustomTab selectionMode={0} onSelectSwitch={setTab} listTab={rooms} permisson={permission}/>
      {
        userLogin.status === "loading" &&
          <ActivityIndicator size="large" color="black" />
      }
      {userLogin.status === "idle" && tab === 0 && permission?.includes(tab+1) && (
        <View style={styles.boxContainer}>
          {LivingRoom.map((item, index) => (
            <ListDevice
              id={item.id}
              name={item.name}
              feed_name={device?.livingRoom[index]?.key}
              status={device?.livingRoom[index]?.last_value === deviceState.ON}
              image={item.image}
              online={item.online}
              key={index}
              onPress={() => {
                navigation.navigate("DetailDevice", {
                  id: item.id,
                  name: item.name,
                  isActive: device?.livingRoom[index]?.last_value === deviceState.ON,
                  feed_name: device?.livingRoom[index]?.key,
                  image: item.image
                });
              }}
            />
          ))}
        </View>
      )}
      {userLogin.status === "idle" && tab === 1 && permission?.includes(tab+1) && (
        <View style={styles.boxContainer}>
          {BedRoom.map((item, index) => (
            <ListDevice
              id={item.id}
              name={item.name}
              feed_name={device?.bedRoom[index]?.key}
              status={device?.bedRoom[index]?.last_value === deviceState.ON}
              image={item.image}
              online={item.online}
              key={index}
              onPress={() => {
                navigation.navigate("DetailDevice", {
                  id: item.id,
                  name: item.name,
                  isActive: true,
                  feed_name: item.name,
                  image: item.image
                });
              }}
            />
          ))}
        </View>
      )}
      {userLogin.status === "idle" && tab === 2 && permission?.includes(tab+1) && (
        <View style={styles.boxContainer}>
          {ParkingGarage.map((item, index) => (
            <ListDevice
              id={item.id}
              name={item.name}
              feed_name={device?.parkingGarage[index]?.key}
              status={
                device?.parkingGarage[index]?.last_value === deviceState.ON
              }
              image={item.image}
              key={index}
              online={item.online}
              onPress={() => {
                navigation.navigate("DetailDevice", {
                  id: item.id,
                  name: item.name,
                  isActive:
                    device?.parkingGarage[index]?.last_value === deviceState.ON,
                  feed_name: device?.parkingGarage[index]?.key,
                  image: item.image
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
