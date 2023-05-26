import { MqttClient } from 'react-native-mqtt';

const setupMqttClient = (username, key, onMessageArrived) => {
  const client = new MqttClient('mqtt://io.adafruit.com', 'clientId');
  client.connect({
    username: username,
    password: key,
    keepalive: 60,
    clean: true,
    reconnect: true,
    tls: true
  });

  client.on('connect', () => {
    console.log('connected');
    client.subscribe('/feeds/your-feed1');
    client.subscribe('/feeds/your-feed2');
    client.subscribe('/feeds/your-feed3');
  });

  client.on('message', (topic, message) => {
    console.log('message received', topic, message.toString());
    onMessageArrived(message.toString());
  });

  return client;
};

export default setupMqttClient;