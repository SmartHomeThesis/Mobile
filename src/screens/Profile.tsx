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
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  IMember,
  IPermission,
  sendInviteEmail,
  showAllUser,
} from "../redux/reducers/addMemberSlice";
// @ts-ignore
import SelectBox from "react-native-multi-selectbox";
// @ts-ignore
import { xorBy } from "lodash";
import Toast from "react-native-toast-message";
import { IAvatar } from "../types";
import { imagesAvatar } from "../constant/image";

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
  },
];
const User = ({
  item,
  index,
  selectedTeams,
  onMultiChange,
}: {
  item: IMember;
  index: any;
  selectedTeams: any;
  onMultiChange: any;
}) => {
    const [state,setState] = useState({ })
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
const Profile = () => {
  const [selectedTeams, setSelectedTeams] = useState([]);
  function onMultiChange() {
    return (item: any) => setSelectedTeams((prev) => xorBy(prev, [item], "id"));
  }
  const [email, setEmail] = React.useState("");
  const dispatch = useAppDispatch();
  const allMembers = useAppSelector((state) => state.addMember.allMember);

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
        renderItem={({ item, index }) => (
            <User item={item} index={index} selectedTeams={selectedTeams} onMultiChange={onMultiChange} />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
