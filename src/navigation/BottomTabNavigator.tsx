import {Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Analysis from '../screens/Analysis';
import Dashboard from '../screens/Dashboard';
import DetailDevice from '../screens/DetailDevice';

import profile from '../assets/images/profile.png';
// Tab ICons...
import home from '../assets/images/home.png';
import search from '../assets/images/search.png';
import notifications from '../assets/images/bell.png';
import settings from '../assets/images/settings.png';
import logout from '../assets/images/logout.png';
// Menu
import menu from '../assets/images/menu.png';
import close from '../assets/images/close.png';

// Photo
import photo from '../assets/images/photo.jpg';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppSelector} from "../hooks";
import {gray} from "../styles/Colors";
import {removeToken} from "../services/storage";
import {userLogin} from "../redux/Selector/userSelector";
import {imagesAvatar} from "../constant/image";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailDevice"
        component={DetailDevice}
        options={{headerShown: false}}
        // initialParams={{
        //     isActive:
        //     feed_name:
        //     image:
        // }}
      />
    </Stack.Navigator>
  );
};

const BottomTab = ({navigation}:{navigation: any}) => {
  const [currentTab, setCurrentTab] = useState("Home");
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);
  const userLogin = useAppSelector((state) => state.login);
  console.log("userLogin", userLogin);
  // Animated Properties...

  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const isHost = useAppSelector(state => state?.login?.user?.user_reponse?.role === "Host")
  return (
    <SafeAreaView style={styles.container}>
      <View style={{justifyContent: 'flex-start', padding: 15}}>
        <Image source={imagesAvatar['man_avatar']} style={{
          width: 60,
          height: 60,
          borderRadius: 10,
          marginTop: 8
        }}></Image>

        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 20
        }}>{userLogin?.user.user_reponse.username}</Text>

        <TouchableOpacity>
          <Text style={{
            marginTop: 6,
            color: 'white'
          }}>View Profile</Text>
        </TouchableOpacity>

        <View style={{flexGrow: 1, marginTop: 50}}>
          {
            // Tab Bar Buttons....
          }

          {TabButton(currentTab, setCurrentTab, "Home", home)}
          {TabButton(currentTab, setCurrentTab, "Search", search)}
          {TabButton(currentTab, setCurrentTab, "Settings", settings)}

        </View>

        <View>
          {TabButton(currentTab, setCurrentTab, "LogOut", logout,navigation)}
        </View>

      </View>

      {
        // Over lay View...
      }

      <Animated.View style={{
        flexGrow: 1,
        height: '100%',
        backgroundColor: gray.background,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: showMenu ? 15 : 0,
        // Transforming View...
        transform: [
          {scale: scaleValue},
          {translateX: offsetValue}
        ]
      }}>

        {
          // Menu Button...
        }

        <Animated.View style={{
          flex:1,
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
          <TouchableOpacity onPress={() => {
            // Do Actions Here....
            // Scaling the view...
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(offsetValue, {
              // YOur Random Value...
              toValue: showMenu ? 0 : 230,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(closeButtonOffset, {
              // YOur Random Value...
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            setShowMenu(!showMenu);
          }}>

            <Image source={showMenu ? close : menu} style={{
              width: 20,
              height: 20,
              tintColor: 'black',
              marginTop: showMenu ? 40 : 10,
              marginLeft: 16,

            }}></Image>

          </TouchableOpacity>
          <Tab.Navigator
            screenOptions={({route}) => ({
              headerShown: false,
              tabBarShowLabel: false,
              tabBarInactiveTintColor: '#000',
              tabBarStyle: styles.tabBarStyle,
              tabBarActiveTintColor: '#7d5fff',
              tabBarIcon: ({color, size, focused}) => {
                let iconName: string = '';
                if (route.name === 'Home2') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Dashboard') {
                  iconName = focused ? 'apps' : 'apps-outline';
                } else if (route.name === 'Profile' && isHost) {
                  iconName = focused ? 'person' : 'person-outline';
                } else if (route.name === 'Analysis') {
                  iconName = focused ? 'stats-chart-sharp' : 'stats-chart-outline';
                }

                return <Ionicons name={iconName} size={22} color={color}/>;
              },
            })}>
            <Tab.Screen
              name="Home2"
              component={HomeStack}
              options={({route}) => ({
                tabBarStyle: {
                  display: getTabBarVisibility(route),
                },
              })}
            />
            <Tab.Screen name="Dashboard" component={Dashboard}/>
            {
              isHost && <Tab.Screen name="Profile" component={Profile}/>
            }
            <Tab.Screen name="Analysis" component={Analysis}/>
          </Tab.Navigator>
          {/*<Profile />*/}
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};
const getTabBarVisibility = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed'  // console.log(routeName);

  if (routeName == 'DetailDevice') {
    return 'none';
  }
  return 'flex';
};
// For multiple Buttons...
const TabButton = (currentTab: string, setCurrentTab: any, title: string, image: any,navigation:any = "") => {
  return (

    <TouchableOpacity onPress={() => {
      if (title == "LogOut") {
        // Do your Stuff...
        console.log("Logout and clear token")
        navigation.navigate("Login")
        removeToken()

      } else {
        setCurrentTab(title)
      }
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <Image source={image} style={{
          width: 25, height: 25,
          tintColor: currentTab == title ? "#5359D1" : "white"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab == title ? "#5359D1" : "white"
        }}>{title}</Text>

      </View>
    </TouchableOpacity>
  );
}

export default BottomTab;

const styles = StyleSheet.create({
  tabBarStyle: {},
  container: {
    flex: 1,
    backgroundColor: '#5359D1',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
