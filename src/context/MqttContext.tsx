import React, {createContext, ReactNode, useEffect, useState, useContext, useRef} from 'react';
import MQTT, {IMqttClient} from 'sp-react-native-mqtt';
import {API_ADAFRUIT_KEY} from "react-native-dotenv";
import {topic} from "../constant/device";
import moment from 'moment';
import {useAppDispatch} from "../hooks";
import {addNewValue} from "../redux/reducers/analysisSlice";
import {updateStateDevice} from "../redux/reducers/deviceSlice";

// @ts-ignore
interface IContextMqtt {
    client: IMqttClient | undefined,

}
const MQTTContext = createContext<IContextMqtt>({} as IContextMqtt);
export function useMQTT () {
    const {client} = useContext(MQTTContext);
    if (!client) {
        throw new Error(
            "clientmqtt is undefined"
        );
    }
    return {client}
}

export const MQTTProvider = ({ children }: { children: ReactNode }) => {
    const [mqttClient, setMqttClient] = useState<IMqttClient | undefined>(undefined);
    const dispatch = useAppDispatch()

    const mqttClientRef = useRef<IMqttClient>();
    async function connectMQTT() {
        // create random client id
        console.log('Create new client adafruit: ', Date().toString())
        if (!mqttClient) {
            try {
                const client = await MQTT.createClient({
                    uri: 'mqtt://io.adafruit.com:1883',
                    clientId: Math.random().toString(36).substring(7),
                    user: `HuuHanh`,
                    pass: `${API_ADAFRUIT_KEY}`,
                    auth: true,
                    keepalive: 60 * 3,
                });
                client.on('closed', function () {
                    console.log('mqtt.event.closed');
                });

                client.on('error', function (msg) {
                    console.log('mqtt.event.error', msg);
                    client?.disconnect();
                    // client?.reconnect();
                });
                client.on('message', function (msg) {
                    console.log('mqtt.event.message', msg);
                    const timestamp = moment().format('HH:mm:ss');
                    const {data,topic: t} = msg
                    if(t === topic['temperature'] ){
                        console.log("temperature")
                        dispatch(addNewValue({name:"temperature",label:timestamp,data:parseFloat(data)}))

                    }
                    else if(t === topic['humidity']){
                        console.log("humidity")
                        dispatch(addNewValue({name:"humidity",label:timestamp,data:parseFloat(data)}))
                    }
                    else if(t === topic['door'] || t === topic['light_bedroom'] || t === topic['light_livingroom']){
                        dispatch(updateStateDevice({feed_key:t.substring(10),state:data}))
                    }
                });

                client.on('connect', function () {
                    console.log('Connected to MQTT broker successfully');
                    Object.keys(topic).forEach((key_device) => {
                        client?.subscribe(topic[key_device], 0);
                    })
                });
                client.connect();
                mqttClientRef.current = client;
                setMqttClient(client); // Update the client value in the component state
            } catch (error) {
                console.log('Failed to connect to MQTT broker:', error);
                // Handle the connection error
            }
        }
    }

    useEffect(() => {
        connectMQTT();
        return () => {
            mqttClientRef.current?.disconnect();
        };
    }, []);


    return (
        <MQTTContext.Provider value={{ client: mqttClient }}>
            {children}
        </MQTTContext.Provider>
    );
};