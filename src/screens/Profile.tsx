import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import CustomText from "../components/CustomText";
import { styles as GlobalStyle } from "../styles/Global";
import CustomButton from "../components/Button/CustomButton";
import { gray } from "../styles/Colors";
import { styles } from "../styles/Authentication";
import { User } from "../constant/user";

const Profile = () => {
  const permisson = ["Living Room", "Bed Room", "Garage", "All Room"];
  return (
    <View
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
          placeholder="Type EmailID"
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
          onPress={() => console.log("Fetch data")}
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
      {User.map((item, index) => (
        <View
          key={index}
          style={{
            height: 100,
            flexDirection: "row",
            maxWidth: "100%",
            padding: 16,
            backgroundColor: "white",
            marginVertical: 8,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Image
            source={item.avatar}
            resizeMode="cover"
            style={{
              width: 50,
              height: 50,
              marginRight: 16,
            }}
          />
          <View>
            <CustomText
              style={{
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              {item.name}
            </CustomText>
            <CustomText
              style={{
                fontSize: 18,
                fontWeight: "300",
                color: "rgba(50,165,221,0.8)",
              }}
            >
              {item.email}
            </CustomText>
            <TouchableOpacity onPress={() => console.log("Delete")}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                  color: "red",
                }}
              >
                Remove
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: 100,
              marginLeft: 16,
              overflow: "hidden",
            }}
          >
            <SelectDropdown
              data={permisson}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              defaultButtonText={item.permissions}
              buttonStyle={{
                width: "100%",
                borderRadius: 10,
                backgroundColor: "black",
              }}
              buttonTextStyle={{
                color: "white",
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default Profile;
