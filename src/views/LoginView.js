import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text } from 'react-native';
import axios from "axios";
import { useAuth } from "../context/AuthContext";

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
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Login</Text>
      <TextInput
        placehoder="username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={{ borderBottomWidth: 1, marginBottom: 12 }}
        />
      <TextInput
        placehoder="password"
        value={[password]}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 24 }}
        />  
      <Button title="Login" onPress={handleLogin} />  
    </View>
  );
}