// using react native mqtt library to connect to adafruit mqtt broker
//
// Date: 8/8/2021
// @ts-ignore
import MQTT from 'sp-react-native-mqtt';
import {HOST_ADAFRUIT,PORT_ADAFRUIT,USERNAME,API_ADAFRUIT_KEY} from "react-native-dotenv";
export const client_mqtt = async () =>{
    let currentTime = + new Date();
    let clientID = 'clientID-' + currentTime;
    const client = await MQTT.createClient({
        uri: `mqtt://${HOST_ADAFRUIT}:${PORT_ADAFRUIT}`,
        clientId: clientID,
        user: USERNAME,
        pass: API_ADAFRUIT_KEY,
    })
    client.connect();
    return client;
}