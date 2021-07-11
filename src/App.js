/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import { useColorScheme, } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import LoginPage from './screens/LoginPage';
import { NavigationContainer, DefaultTheme, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { firebase } from '../firebase';
import RegisterScreen from './screens/RegisterScreen';
import HomePage from './screens/HomePage';
import ChatAreaScreen from './screens/ChatAreaScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store'
import ChatDetailScreen from './screens/ChatDetailScreen';
import { createAnimatedPropAdapter } from 'react-native-reanimated';
import { Transition } from 'react-native-reanimated';


import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';





const tes = () =>
{
  firebase.database().ref('users/' + "5515").set({
    username: "dokter",
    email: "dokterzikriakmale@gmail.com",
    profile_picture: "k22o222222n1t",
    type: 1,
  });
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'white'
  },
};

const App = () =>
{
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  const globalState = useSelector(state => state)
  const AuthStack = createStackNavigator();
  const Tab = createMaterialBottomTabNavigator();
  const GuardedStack = createStackNavigator();
  // console.log(globalState.chatReducers);


  const AuthStackScreen = () =>
  {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <AuthStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <AuthStack.Screen name="Homepage" component={HomePage} options={{ headerShown: false }} />
      </AuthStack.Navigator>
    )
  }

  const HomeScreen = () =>
  {

    return (
      <GuardedStack.Navigator>
        <GuardedStack.Screen name="HomeTab" component={TabScreen} options={{ headerShown: false,title:"" }} />
        <GuardedStack.Screen name="ChatScreen" component={ChatAreaScreen} options={{ headerShown: false }} />
        <GuardedStack.Screen name="ChatDetail" component={ChatDetailScreen} options={({ route }) => ({ title: route.params.name })} />
        {/* <GuardedStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} /> */}
      </GuardedStack.Navigator>
    )
  }


  const TabScreen = () =>
  {
    return (
      <Tab.Navigator
        activeColor="tomato"
        inactiveColor="grey"
        barStyle={{ backgroundColor: '#ffffff',
        shadowRadius: 5, shadowOpacity: 0.4, shadowOffset: { width: 2, height: -1 }, shadowColor: 'black'  
      }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size=22 }) =>
          {
            let iconName;

            if (route.name === 'ChatArea') {
              iconName = focused
                ? 'chatbubbles'
                : 'chatbubbles-outline';
            } else if (route.name === 'ProfileScreen') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        

      >
        <Tab.Screen name="ChatArea" component={ChatAreaScreen} options={{tabBarLabel:'Chat'}} />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{tabBarLabel:'Profile'}} />

      </Tab.Navigator>

    )
  }






  return (
    <NavigationContainer theme={MyTheme}>
      {globalState.reducers.isLogin ? <HomeScreen /> : <AuthStackScreen />}

      {/* <Tab.Navigator>
        <Tab.Screen name="Login" component={LoginPage} />
        <Tab.Screen name="Register" component={RegisterScreen} />
      </Tab.Navigator>
        <Button onPress={tes} title="tes" />  */}
    </NavigationContainer>
  );
};

export default App;
