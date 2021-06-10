import React, {useState} from 'react';
import {View, SafeAreaView, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import {useLayoutEffect} from 'react';
import {Avatar} from 'react-native-elements';
import {AntDesign} from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as firebase from 'firebase';
import {db, auth} from '../firebase';

function Chat({navigation, route}) {

  const [input, setInput] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
        title: 'Chat',
        headerTitleAlign: 'center',
        headerBackTitle: 'Chats',
        headerTitle: () => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Avatar rounded source={{uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'}} />
            <Text style={styles.headingText}>{route.params.chatName}</Text>
          </View>
        ),
        headerLeft: () => (
          <TouchableOpacity>
            <AntDesign name='leftcircle' size={24} color='black' style={{paddingLeft: 10}} onPress={navigation.goBack} />
          </TouchableOpacity>
        )
    })
  }, [navigation]);

  const sendMsg = () => {
    db.collection('chats').doc(route.params.id).collection('messages').add({
      //timestamp: firebase.firestore.FieldValue.serverTimeStamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    })
  };

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.container__main} behavior='height'>
        <>
          <ScrollView>
            {/*The messages!*/}
          </ScrollView>
          <View style={styles.mainArea}>
            <TextInput placeholder='Type The Message' placeholderTextColor='grey' style={styles.textInput} value={input} onChangeText={(text) => setInput(text)} />
            <TouchableOpacity onPress={sendMsg}>
              <Feather name='send' size={24} color='cadetblue' />
            </TouchableOpacity>
          </View>
        </>
      </View>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  headingText: {
    color: 'black',
    marginLeft: 10,
    fontWeight: '700',
  },
  container: {
    backgroundColor: '#282828',
    flex: 1,
  },
  container__main: {
    flex: 1,
  },
  mainArea: {
    flexDirection: 'row',
    padding: 15,
    width: '100%',
    justifyContent: 'center',
  },
  textInput: {
    color: 'black',
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: '#ECECEC',
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
  },
});
