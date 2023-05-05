import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomText from "../components/CustomText";
import { styles as GlobalStyle } from "../styles/Global";
import CustomButton from "../components/Button/CustomButton";
import { gray } from "../styles/Colors";
import { styles } from "../styles/Authentication";
import { User } from "../constant/user";
import { useAppDispatch, useAppSelector } from "../hooks";
import {IMember, sendInviteEmail, showAllUser} from "../redux/reducers/addMemberSlice";
// @ts-ignore
import SelectBox from "react-native-multi-selectbox";
// @ts-ignore
import { xorBy } from "lodash";
import Toast from "react-native-toast-message";
import { IAvatar} from "../types";

const K_OPTIONS = [
    {
        id: 1,
        item: "Living Room",
    },
    {
        id: 2,
        item: "Bedroom",
    },
    {
        id: 3,
        item: "Kitchen",
    }
]
const Profile = () => {
    const imagesAvatar:IAvatar ={
        dog_avatar: require("../assets/images/dog_avatar.png"),
        woman_avatar: require("../assets/images/woman_avatar.png"),
        man_avatar: require("../assets/images/man_avatar.png"),
        man2_avatar: require("../assets/images/man2_avatar.png"),
    }
  const [email, setEmail] = React.useState("");
  const dispatch = useAppDispatch();
  const allMembers = useAppSelector((state) => state.addMember.allMember);

  const [selectedTeams, setSelectedTeams] = useState([]);
  const User = ({ item, index }: { item: IMember; index: any }) => {
      return (
      <View
        key={index}
        style={{
          maxWidth: "100%",
          padding: 16,
          backgroundColor: "white",
          marginVertical: 8,
          borderRadius: 10,
        }}
      >
        <View
          key={index}
          style={{
            height: 100,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            source={imagesAvatar[item.avatar ] }
            resizeMode="cover"
            style={{
              width: 50,
              height: 50,
              marginRight: 16,
            }}
          />
          <View
            style={{
              flex: 1,
            }}
          >
            <CustomText
              style={{
                fontWeight: "600",
              }}
            >
              {item.name}
            </CustomText>
            <CustomText
              style={{
                fontSize: 12,
                fontWeight: "300",
              }}
            >
              {item.email}
            </CustomText>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              borderRadius: 18,
              padding: 4,
              width: 80,
              alignItems: "center",
            }}
            onPress={() => console.log("Delete")}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "white",
              }}
            >
              Remove
            </Text>
          </TouchableOpacity>
        </View>
        {/*  Select Dropdown todo*/}
        <SelectBox
          label=""
          options={K_OPTIONS}
          hideInputFilter={true}
          selectedValues={selectedTeams}
          onMultiSelect={onMultiChange()}
          onTapClose={onMultiChange()}
          isMulti
          labelStyle={{
            display: "none",
          }}
        />
      </View>
    );
  };
  const handleSendInvite = async () => {
    try {
      await dispatch(sendInviteEmail(email));
      Toast.show({
        type: "success",
        text1: "Success create account",
        text2: "Check OTP has sent to email recent 👋",
      });
      setEmail("");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error create account",
        text2: "Please resend 👋",
      });
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchAllUser = async () => {
      await dispatch(showAllUser());
    };
    fetchAllUser().catch((error) => console.log(error));
  }, []);
  return (
    <SafeAreaView
      style={[
        GlobalStyle.container,
        {
          marginTop: 20,
        },
      ]}
    >
      <CustomText
        style={{
          fontSize: 20,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Add Member
      </CustomText>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          marginTop: 60,
          marginBottom: 30,
          justifyContent: "space-between",
        }}
      >
        <TextInput
          placeholder="Type Email ID"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={{
            flex: 2 / 3,
            borderColor: gray.primary,
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: 16,
          }}
        />
        <CustomButton
          label="Add"
          onPress={handleSendInvite}
          styleButton={{
            backgroundColor: "black",
            flex: 1 / 3,
            borderRadius: 20,
            justifyContent: "center",
            marginLeft: 16,
          }}
          styleText={styles.buttonText}
        />
      </View>
      <CustomText
        style={{
          fontSize: 18,
          fontWeight: "600",
        }}
      >
        All User
      </CustomText>
      <FlatList
        data={allMembers}
        renderItem={User}
        extraData={[selectedTeams, onMultiChange]}
      />
    </SafeAreaView>
  );
  function onMultiChange() {
    return (item: any) => setSelectedTeams((prev) => xorBy(prev, [item], "id"));
  }
};

export default Profile;
