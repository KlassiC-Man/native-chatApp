import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import {db, auth} from '../firebase';
import * as firebase from 'firebase';

const CustomListItem = ({ id, chatName, enterChat }) => {

  const [chatMessages, setChatMessages] = useState([]);

  const user = firebase.auth().currentUser;

  useEffect(() => {
    const unsubscribe = db.collection('chats').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
      setChatMessages(snapshot.docs.map(doc => doc.data()))
    ));
    return unsubscribe;
  });

  function tell() {
    alert('Thats a chat!')
  };
 

  return(
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)} onLongPress={tell} containerStyle={{backgroundColor: '#282828'}}>
      <Avatar rounded source={{uri: chatMessages[0]?.photoURL || 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'}} />
      <ListItem.Content>
        <ListItem.Title style={{fontWeight: "800", color: 'white'}}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" style={{color: 'grey'}}>
          {chatMessages[0]?.displayName}: {chatMessages[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

export default CustomListItem;
