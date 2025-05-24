import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import styles from "../constants/loginViewStyles";

export default function LoginView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const [showRegister, setShowRegister] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const API_BASE = "http://localhost:3001/api";

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        username,
        password
      });
      const { token, user } = res.data;
      login(token, user);
    } catch (err) {
      console.error('Login error', err);
      Alert.alert('Log in failed', 'Please check your account or password again.');
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post(`${API_BASE}/auth/signup`, {
        username: newUsername,
        password: newPassword
      });
      Alert.alert('Register success', 'You can now log in.');
      setShowRegister(false);
      setNewUsername('');
      setNewPassword('');
    } catch (err) {
      console.error('Register error', err);
      Alert.alert('Register failed', 'Try a different username.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Account:</Text>
        <TextInput
          placeholder="username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          style={styles.input}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
        <Button title="Login" onPress={handleLogin} />
        <Button title="Register" onPress={() => setShowRegister(true)} />
      </View>

      {/* 🔽 註冊 Modal 🔽 */}
      <Modal visible={showRegister} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.registerTitle}>Register</Text>

            <TextInput
              placeholder="New username"
              value={newUsername}
              onChangeText={setNewUsername}
              style={styles.registerInput}
            />
            <TextInput
              placeholder="New password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              style={styles.registerInput}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button title="Cancel" onPress={() => setShowRegister(false)} />
              <Button title="Submit" onPress={handleRegister} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}