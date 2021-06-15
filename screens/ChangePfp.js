import React, {useState} from 'react';
import {auth, db} from '../firebase';
import {StyleSheet, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import * as firebase from 'firebase';

function ChangePfp({ navigation }) {

  const [newPfp, setNewPfp] = useState("");

  const user = firebase.auth().currentUser;

  function setPfp() {
    user.updateProfile({
      photoURL: newPfp,
    })
  }

  return(
    <View>
      <Input type='text' value={newPfp} placeholder='Image Link for Profile .jpeg, .png at end' onChangeText={(text) => setNewPfp(text)} />
      <Button title='Set New Profile Picture' onPress={setPfp} raised />
    </View>
  )
}

export default ChangePfp;
