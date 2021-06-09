import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';
import {db, auth} from '../firebase';

const AddNewChat = ({navigation}) => {

  const [input, setInput] = useState('');

  async function createNewChat() {
    await db
     .collection('chats').add({
       chatName: input,
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
      <Input placeholder='Enter Chat Name' value={input} onChangeText={(text) => setInput(text)} leftIcon={
        <MaterialIcons name="chat" size={24} color='black' />
      } />
      <Button title='Create A Chat' onPress={createNewChat} style={styles.button} />
    </View>
  );
}

export default AddNewChat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 30,
    height: '100%',
  },
});
