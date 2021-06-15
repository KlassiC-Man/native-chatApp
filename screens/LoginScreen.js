import React, {useState, useEffect, useLayoutEffect} from 'react';
import {StyleSheet, TextInput, View, Image} from 'react-native';
import {Input, Button, Text} from 'react-native-elements';
import {auth} from '../firebase';


const LoginScreen = ({ navigation }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, [])

  const register = () => {
    if (name === '' || email === '' || password === ''){
        alert('Please Fill All The Fields!');
        setName('');
        setPassword('');
        setEmail('');
    } else {
      navigation.navigate('Sign Up');
      setName('');
      setPassword('');
      setEmail('');
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center'
    })
  }, [navigation])

  const login = () => {
    auth
     .signInWithEmailAndPassword(email, password)
     .catch((error) => alert(error))
  }

  function forgotPassword(){
    navigation.navigate('ForgotPassword');
  }

  return (
    <View style={styles.container}>
        <Text h2 style={{color: 'cadetblue', paddingLeft: 20}}>
          It's Time To Connect
        </Text>
        <View style={{paddingTop: 20}} />
        <Input style={styles.input} value={name} type="text" autofocus placeholder='Username' onChangeText={(text) => setName(text)} />
        <Input style={styles.input} value={email} type="email" placeholder='E-Mail' onChangeText={(text) => setEmail(text)} />
        <Input style={styles.input} value={password} type="password" secureTextEntry placeholder='Password' onChangeText={(text) => setPassword(text)} />
        <View style={{margin: 30}} />
        <Button title="Login" onPress={login} />
        <View style={{margin: 10}} />
        <Button raised title="Sign Up" onPress={register} type='outline' />
        <Button type='clear' title='Forgot Password' raised onPress={forgotPassword} />
        <View style={{height: '100%'}} />
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#282828'
  },
  input: {
    color: 'white'
  },
});
