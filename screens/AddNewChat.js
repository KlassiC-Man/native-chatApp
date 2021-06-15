import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';
import {db, auth} from '../firebase';
import * as firebase from 'firebase';

const AddNewChat = ({navigation}) => {

  const user = firebase.auth().currentUser;

  //The use states
  const [input, setInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  async function createNewChat() {
    await db
     .collection('chats').doc(nameInput).set({
       chatName: nameInput,
       chatter0: user.email,
       chatter1: input,
     }).then(() => {
       navigation.goBack();
     }).catch(error => alert(error))
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add New Chat!',
      headerBackTitle: 'Chats',
    });
  }, [])

  return (
    <View style={styles.container}>
      <Input placeholder='Enter E-Mail ID of the Person' style={{color: 'white'}} value={input} onChangeText={(text) => setInput(text)} leftIcon={
        <MaterialIcons name="chat" size={24} color='white' />
      } />
      <Input placeholder='Enter Name for Chat' style={{color: '#fff'}} value={nameInput} onChangeText={(text) => setNameInput(text)} />
      <Button title='Create A Chat' onPress={createNewChat} style={styles.button} />
    </View>
  );
}

export default AddNewChat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#282828',
    padding: 30,
    height: '100%',
  },
});
