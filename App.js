import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity } from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import WelcomeScreen from './screens/WelcomeScreen'
import { BottomTabNavigator } from './screens/BottomTabNavigator';

export default function App() {
  return (
    <AppContainer/>
  );
}

const switchNavigator=createSwitchNavigator({
  welcomeScreen:{screen:WelcomeScreen},
  BottomTabNavigator:{screen:BottomTabNavigator}
})
const AppContainer=createAppContainer(switchNavigator)
