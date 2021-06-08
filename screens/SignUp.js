import React, {useState} from 'react';
import { StyleSheet, View} from 'react-native';
import {Button, Text, Input} from 'react-native-elements';
import {auth} from '../firebase';

const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  function register() {
    auth
     .createUserWithEmailAndPassword(email, password)
     .then(authUser => {
       authUser.user.updateProfileProfile({
         displayName: name,
         photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
       })
     })
     .catch(error => alert(error.message))
  }

  return(
    <View style={styles.container}>
      <Text h2 style={{color: 'cadetblue', paddingLeft: 25}}>
        Create An Account!
      </Text>
      <View style={styles.main}>
        <Input placeholder="Username" value={name} autofocus type="text" onChangeText={(text) => setName(text)} style={styles.input} />
        <Input placeholder="Email" value={email} type="email" onChangeText={(text) => setEmail(text)} style={styles.input} />
        <Input placeholder="Password" value={password} type="password" secureTextEntry onChangeText={(text) => setPassword(text)} style={styles.input} />
        <Input placeholder="Image URL For Profile" type="text" value={imageUrl} onChangeText={(text) => setImageUrl(text)} style={styles.input} />
      </View>
      <Button title="Sign Up" onPress={register} />
    </View>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  main: {
    paddingTop: 25,
  },
});
