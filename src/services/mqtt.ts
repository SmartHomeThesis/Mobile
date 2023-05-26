import MQTT,{IMqttClient} from 'sp-react-native-mqtt';

const MQTT_HOST = 'mqtt://test.mosquitto.org';
const MQTT_PORT = 1883;
const MQTT_CLIENT_ID = '788';


async function connectMQTT() {
        try {
            const client = await MQTT.createClient({
                uri:'mqtt://io.adafruit.com:1883',
                clientId: '788',
                user:'HuuHanh',
                pass:'aio_llMb48vF8KHmjGdztedFycYD0KYP',
                auth:true,
                keepalive: 60,
            });
            client.on('closed', function() {
                console.log('mqtt.event.closed');
            });

            client.on('error', function(msg) {
                console.log('mqtt.event.error', msg);
            });
            client.on('message', function(msg){
                console.log('mqtt.event.message', msg);
            });

           client.on('connect', function(){
               console.log('connected successfully');
           })

            await client.connect();
            return client;
            console.log('Connected to MQTT broker');
        } catch (error) {
            console.log('Failed to connect to MQTT broker:', error);
            // Handle the connection error
        }
}

const client = connectMQTT()
export default client;
