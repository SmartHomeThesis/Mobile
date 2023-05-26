import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./src/navigation/AuthStack";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import Toast from "react-native-toast-message";
import {useEffect} from "react";
import MQTT from "sp-react-native-mqtt";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
      <Toast />
    </Provider>
  );
};
export default App;
