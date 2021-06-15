import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import AddNewChat from './screens/AddNewChat';
import Chat from './screens/Chat';
import ForgotPassword from './screens/ForgotPassword';

const Stack = createStackNavigator();

const globalNavigationPane = {
  headerStyle: {backgroundColor: 'cadetblue'},
  headerTitleStyle: {color:'white'},
  headerTintColor: 'white',
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalNavigationPane}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddNewChat" component={AddNewChat} />
        <Stack.Screen name='Chat' component={Chat} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
