import React, {useLayoutEffect} from 'react';
import {SafeAreaView, View,  StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';
import CustomListItem from '../components/CustomListItem';
import {auth, db} from '../firebase';
import {Avatar} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Home = ({navigation}) => {

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Connect',
      headerStyle: {color: 'white'},
      headerTitleStyle: {color: 'black'},
      headerTintColor: 'black',
      headerLeft: () => (
        <View style={{marginLeft: 20}}>
          <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
            <Avatar rounded source={{uri: auth?.currentUser?.photoURL}} />
          </TouchableOpacity>
        </View>
      )
    });
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
