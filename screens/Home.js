import React, {useLayoutEffect, useEffect, useState} from 'react';
import {SafeAreaView, View,  StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';
import CustomListItem from '../components/CustomListItem';
import {auth, db} from '../firebase';
import {Avatar} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Home = ({navigation}) => {

  const [chats, setChats] = useState([]);

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    })
  }

  useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
      setChats(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    ))
    return unsubscribe;
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Connect',
      headerLeft: () => (
        <View style={{marginLeft: 20}}>
          <TouchableOpacity onPress={signOut}>
            <Avatar rounded source={{uri: auth?.currentUser?.photoURL}} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 80, marginRight: 20}}>
          <TouchableOpacity>
            <AntDesign name='camerao' size={24} color='black' />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons onPress={() => navigation.navigate('AddNewChat')} name='pencil-plus' size={24} color="black" />
          </TouchableOpacity>
        </View>
      )
    });
  }, [navigation])

  return (
    <SafeAreaView>
      <ScrollView>
          {chats.map(({id, data: {chatName}}) => (
            <CustomListItem key={id} id={id} chatName={chatName} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
