import MQTT,{IMqttClient} from 'sp-react-native-mqtt';
import {API_ADAFRUIT_KEY,USERNAME} from 'react-native-dotenv'
import {feed} from "../constant/device";




async function connectMQTT() {
        // create random client id
        console.log('create new client')
        try {
            const client = await MQTT.createClient({
                uri:'mqtt://io.adafruit.com:1883',
                clientId: Math.random().toString(36).substring(7) ,
                user:`HuuHanh`,
                pass: `${API_ADAFRUIT_KEY}`,
                auth:true,
                keepalive: 60*10,
            });
            client.on('closed', function() {
                console.log('mqtt.event.closed');
            });

            client.on('error', function(msg) {
                console.log('mqtt.event.error', msg);
                client?.disconnect();
                client?.reconnect();
            });
            // client.on('message', function(msg){
            //     console.log('mqtt.event.message', msg);
            // });

           client.on('connect', function(){
               console.log('connected successfully');
               Object.values(feed).forEach((key_device) =>{
                     client?.subscribe(`HuuHanh/f/${key_device}`,0);
               })
           })
            await client.connect();
            return client;
            console.log('Connected to MQTT broker');
        } catch (error) {
            console.log('Failed to connect to MQTT broker:', error);
            // Handle the connection error
        }
}
const client= connectMQTT()
export default client;
