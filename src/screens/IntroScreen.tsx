import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import IntroBackground from '../assets/images/IntroBackground.svg';
import LinearGradient from 'react-native-linear-gradient';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const IntroScreen = ({navigation}: {navigation: any}) => {
  useEffect(() => {
    let timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <View style={{flex: 1}}>
      <IntroBackground
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
          right: 0,
          bottom: 0,
        }}
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#1a3b54', '#2f697c', '#2b6766']}
        style={styles.linearGradient}>
        <Text style={styles.title}>{`Smart Device \nControl`}</Text>
        <Text style={styles.description}>{`No Matter Where You \nAre`}</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#3b5259', '#4c7a69', '#2f924b']}
            style={styles.button}>
            <Text style={styles.buttonText}>Go next</Text>
            <AntDesignIcon name="arrowright" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    position: 'absolute',
    right: -20,
    top: '26%',
    borderRadius: 20,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 100,
  },
  description: {
    fontSize: 18,
    fontWeight: '300',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4a8365',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
    padding: 10,
    marginBottom: 20,
    maxWidth: 160,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
  },
});
export default IntroScreen;
