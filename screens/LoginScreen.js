import React, {useState} from 'react';
import {Text, StyleSheet, TextInput, View, Button, Image} from 'react-native';

const LoginScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  return (
    <View style={styles.container}>
        <Image />
        <TextInput style={styles.input} value={name} autofocus placeholder='  Username' />
        <TextInput style={styles.input} value={email} placeholder='  E-Mail' />
        <TextInput style={styles.input} value={imageUrl} placeholder='  Image URL For Profile' />
        <View style={{margin: 50}} />
        <Button title="Login" />
        <View style={{margin: 10}} />
        <Button style={styles.button} raised title="Sign Up" />
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  input: {
    marginTop: 10,
    width: 300,
    height: 40,
    borderColor: 'green',
    borderWidth: 1,
  },
  button: {
    color: 'red',
  }
});
