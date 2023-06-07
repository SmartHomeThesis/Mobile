import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AuthStack from "./src/navigation/AuthStack";
import {Provider} from "react-redux";
import store from "./src/redux/store";
import Toast from "react-native-toast-message";
import {MQTTProvider} from "./src/context/MqttContext";
const Stack = createNativeStackNavigator();
import {LogBox} from 'react-native';

const App = () => {
  LogBox.ignoreAllLogs()
    return (
        <Provider store={store}>
            <MQTTProvider>
                <NavigationContainer>
                    <AuthStack/>
                </NavigationContainer>
                <Toast/>
            </MQTTProvider>
        </Provider>
    );
};
export default App;
