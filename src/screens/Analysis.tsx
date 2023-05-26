import { View } from "react-native";
import React from "react";
import Temperature from "../components/Chart/Temperature";
import Humidity from "../components/Chart/Humidity";
import Electricity from "../components/Chart/Electricity";
import CustomTab from "../components/CustomTab";

const Analysis = () => {
  const [tab, setTab] = React.useState<number>(0);
  const charts = ["Electricity", "Temperature & Humidity"];
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
        <View style={{
            backgroundColor: "white",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            width: "100%",
            marginBottom: 40,
        }}>
      <CustomTab selectionMode={0} onSelectSwitch={setTab} listTab={charts} />
        </View>
      {tab === 0 ? (
        <Electricity />
      ) : (
        <>
          <Temperature />
          <Humidity />
        </>
      )}
    </View>
  );
};

export default Analysis;
