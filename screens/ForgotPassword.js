import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {auth, db} from '../firebase';
import * as firebase from 'firebase';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  function forgotPassword() {
    firebase.auth().sendPasswordResetEmail(email).then(() => alert('A mail with the link for password reset was sent to you. Be sure to check your mailbox')).catch(error => alert(error))
  }

  return(
    <View>
      <Input type='email' placeholder='E-Mail Registered with Connect' value={email} onChangeText={(text) => setEmail(text)} style={{paddingTop: 30}}  />
      <Button title='Forgot Password' onPress={forgotPassword} />
    </View>
  )
}

export default ForgotPassword;
