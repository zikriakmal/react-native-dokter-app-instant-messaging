import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { View, Text } from 'react-native'
import LoginPage from './LoginPage';
import RegisterScreen from './RegisterScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatAreaScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';


const Tab = createBottomTabNavigator();

const HomePage = () =>
{
    return (
        // <NavigationContainer >
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) =>
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
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                showLabel:false
            }}

        >
            <Tab.Screen name="ChatArea" component={ChatAreaScreen}  />
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
        </Tab.Navigator>
        // </NavigationContainer>
    )
}

export default HomePage
