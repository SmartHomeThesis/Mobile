import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, {memo, useEffect, useState} from "react";
import CustomText from "../components/CustomText";
import { styles as GlobalStyle } from "../styles/Global";
import CustomButton from "../components/Button/CustomButton";
import { gray } from "../styles/Colors";
import { styles } from "../styles/Authentication";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
    IMember,
    IPermission,
    sendInviteEmail, setPermission,
    showAllUser,
} from "../redux/reducers/addMemberSlice";
// @ts-ignore
import  SelectBox from 'react-native-multi-selectbox'
// @ts-ignore
import { xorBy } from "lodash";
import Toast from "react-native-toast-message";
import { IAvatar } from "../types";
import { imagesAvatar } from "../constant/image";
import {changeRoomVietToEng} from "../constant/device";

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
    item: "Parking Garage",
  },
];
const User = memo(function ({ item, index }: { item: IMember; index: any }) {
  const [state, setState] = useState(()=>{
      let callbackfn = (item: IPermission) => {
          return {
              id: item.id,
              item: changeRoomVietToEng(item.permission),
          };
      };
      return item.permissions.map(callbackfn);
  });
  const dispatch = useAppDispatch();

  // Todo handle change permission with api
  const  onMultiChange = () =>{
    return async (rooms: any) =>{
        const room = xorBy(state, [rooms], "id")
        const permission = room.map((item:any) => { return item.id})
        // @ts-ignore
        const {status} =  await dispatch(setPermission({permission: permission, user_id:item.id })).unwrap();
        if(status === 200){
            setState(room);
        }
    }

  }
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
          source={imagesAvatar[item.avatar]}
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
      {/*TODO  Select Dropdown*/}
        <SelectBox
        label=""
        options={K_OPTIONS}
        hideInputFilter={true}
        selectedValues={state}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
        labelStyle={{
          display: "none",
        }}
      />
    </View>
  );
});
const Profile = () => {
  const [email, setEmail] = React.useState("");
  const dispatch = useAppDispatch();
  const member = useAppSelector((state) => state.addMember);

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
      {member.status === "loading" && (
        <ActivityIndicator size="large" color="black" />
      )}
      {member.status === "idle" && (
        <FlatList
          data={member.allMember}
          renderItem={({ item, index }) => <User item={item} index={index} />}
        />
      )}
    </SafeAreaView>
  );
};

export default Profile;
