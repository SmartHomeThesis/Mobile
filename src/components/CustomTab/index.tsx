import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { gray } from "../../styles/Colors";

const index = ({
  selectionMode,
  onSelectSwitch,
  listTab,
}: {
  selectionMode: number;
  onSelectSwitch: Function;
  listTab: Array<string>;
}) => {
  const [selected, setSelected] = React.useState<number>(selectionMode);
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
            setSelected(index);
            onSelectSwitch(index);
          }}
          key={index}
          style={{
            paddingVertical: 16,
          }}
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
