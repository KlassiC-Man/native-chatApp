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
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
        title: 'Chat',
        headerTitleAlign: 'center',
        headerBackTitle: 'Chats',
        headerTitle: () => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Avatar rounded source={{uri: messages[0]?.data.photoURL}} />
            <Text style={styles.headingText}>{route.params.chatName}</Text>
          </View>
        ),
        headerLeft: () => (
          <TouchableOpacity>
            <AntDesign name='leftcircle' size={24} color='black' style={{paddingLeft: 10}} onPress={navigation.goBack} />
          </TouchableOpacity>
        )
    })
  }, [navigation, messages]);

  useLayoutEffect(() => {
    const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => setMessages(
      snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
    ))

    return unsubscribe;
  }, [route]);

  const sendMsg = () => {
    db.collection('chats').doc(route.params.id).collection('messages').add({
      timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput('');
  };

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.container__main} behavior='height'>
        <>
          <ScrollView contentContainerStyle={{paddingTop:10}}>
            {messages.map(({id, data}) => (
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.recieved}>
                  <Avatar source={{uri: data.photoURL}} rounded size={25} position='absolute' bottom={30} right={-5} />
                  <Text style={styles.recievedMsg}>{data.message}</Text>
                </View>
              ):(
                <View key={id} style={styles.sent}>
                  <Avatar source={{uri: data.photoURL}} rounded size={25} position='absolute' bottom={60} right={-5} />
                  <Text style={styles.sentMsg}>{data.message}</Text>
                  <Text style={styles.sender}>{data.displayName}</Text>
                </View>
              )
            ))}
          </ScrollView>
          <View style={styles.mainArea}>
            <TextInput placeholder='Type The Message' placeholderTextColor='grey' style={styles.textInput} value={input} onChangeText={(text) => setInput(text)} />
            <TouchableOpacity onPress={sendMsg} disabled={!input}>
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
  recieved: {
    padding: 15,
    backgroundColor: 'wheat',
    alignSelf: "flex-end",
    borderRadius: 10,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  recievedMsg: {
    color: 'black',
    fontWeight: '500',
    marginLeft: 10,
  },
  sent: {
    padding: 15,
    backgroundColor: 'cadetblue',
    alignSelf: 'flex-start',
    borderRadius: 20,
    margin: 15,
    maxWidth: '80%',
    position: 'relative',
  },
  sentMsg: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 10,
    marginBottom: 15,
  },
  sender: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: 'wheat',
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
