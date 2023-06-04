import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { gray } from "../../styles/Colors";
import Toast from "react-native-toast-message";

const index = ({
  selectionMode,
  onSelectSwitch,
  listTab,
  permisson,
}: {
  selectionMode: number;
  onSelectSwitch: Function;
  listTab: Array<string>;
  permisson:Array<number>
}) => {
  const [selected, setSelected] = React.useState<number>(selectionMode);
  const AlertPermission = () => {
      Toast.show({
        type: "error",
        text1: "Permission denied",
        text2: "You don't have permission to access this room",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
  }
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {listTab.map((room, index) => (
        <TouchableOpacity
          onPress={() => {
            if(!permisson?.includes(index+1)) {
              AlertPermission();
              return;
            }
            setSelected(index);
            onSelectSwitch(index);
          }}
          key={index}
          style={{
            paddingVertical: 16,
          }}
          // disabled={!permisson?.includes(index+1)}
        >
           <View>
            <Text
              style={{
                color: selected === index ? "black" : gray.primary,
                fontWeight: "bold",
                paddingBottom: 2,
              }}
            >
              {room}
            </Text>
            {selected === index && (
              <View
                style={{
                  height: 4,
                  borderRadius: 10,
                  backgroundColor: "black",
                  width: 16,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              ></View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default index;
