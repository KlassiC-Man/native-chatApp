import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';

const CustomListItem = ({ id, chatName, enterChat }) => {

  function tell() {
    alert('Thats a chat!')
  };

  return(
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)} onLongPress={tell} containerStyle={{backgroundColor: '#282828'}}>
      <Avatar rounded source={{uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'}} />
      <ListItem.Content>
        <ListItem.Title style={{fontWeight: "800", color: 'white'}}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" style={{color: 'grey'}}>
          This is a test!
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

export default CustomListItem;
