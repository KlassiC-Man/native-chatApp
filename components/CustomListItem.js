import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';

const CustomListItem = ({ id, chatName, enterChat }) => {
  return(
    <ListItem>
      <Avatar rounded source={{uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'}} />
      <ListItem.Content>
        <ListItem.Title style={{fontWeight: "800"}}>
          Chat
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          This is a test!
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

export default CustomListItem;
