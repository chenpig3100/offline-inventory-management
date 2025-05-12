import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text } from 'react-native';
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import styles from "../constants/loginViewStyles";

export default function LoginView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  // API missing
  const handleLogin = async () => {
    try {
      const res = await axios.post('InexLink API', {
        username,
        password
      });

      const { token, user } = res.data;

      // store token and login
      login(token, user);
    } catch (err) {
      console.error('Login error', err);
      Alert.alert('Log in failed. Please check your account or password again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Account:</Text>
        <TextInput
        placehoder="username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={styles.input}
        />
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
        placehoder="password"
        value={[password]}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        />  
      </View>
      <Button title="Login" onPress={handleLogin} />  
    </View>
  );
}