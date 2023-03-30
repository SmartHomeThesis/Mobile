import React, {useState} from 'react';
import {View, Switch, StyleSheet} from 'react-native';
import {gray} from '../../styles/Colors';

const index = ({style, feed}: {style?: object; feed: string}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = async () => {
    try {
      await fetch(`https://io.adafruit.com/api/v2/HuuHanh/feeds/${feed}/data`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-AIO-Key': 'aio_yQpi09VVAAk0M3cGYj5sq2ASSyDT',
        },
        body: JSON.stringify(isEnabled ? {value: '0'} : {value: '1'}),
      });
      setIsEnabled(previousState => !previousState);
    } catch (error) {}
  };
  return (
    <View style={[styles.container, style]}>
      <Switch
        trackColor={{false: gray.primary, true: gray.primary}}
        thumbColor={isEnabled ? 'black' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        // disabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default index;
