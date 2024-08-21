import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ImageBackground, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '../utils/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stageNew, setStageNew] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState([]);

  const signinOrSignup = () => {
    if (stageNew) {
      register();
    } else {
      login();
    }
  };

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      console.log(user);
      Alert.alert('Sucesso!', 'Login realizado com sucesso');

      navigation.navigate('Chat');
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      setShowError(true);
      setErrors([errorMessage]);
    }
  };

  const register = async () => {
    if (password !== confirmPassword) {
      setShowError(true);
      setErrors(['As senhas não coincidem']);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      console.log(user);
      Alert.alert('Sucesso!', 'Conta criada com sucesso');
      setStageNew(false)
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      setShowError(true);
      setErrors([errorMessage]);
    }
  };

  return (
    <ImageBackground source={require('../../assets/auth-page.png')} style={styles.container}>
      <Text style={styles.title}>
        {stageNew ? 'Crie sua conta' : 'Faça seu Login'}
      </Text>
      <TextInput
        placeholder='Email'
        style={styles.input}
        autoFocus={true}
        value={username}
        placeholderTextColor='#cecece'
        onChangeText={setUsername}
      />
      {stageNew && (
        <>
          <TextInput
            placeholder='Primeiro Nome'
            style={styles.input}
            value={firstName}
            placeholderTextColor='#cecece'
            onChangeText={setFirstName}
          />
          <TextInput
            placeholder='Segundo/Ultimo Nome'
            style={styles.input}
            value={lastName}
            placeholderTextColor='#cecece'
            onChangeText={setLastName}
          />
        </>
      )}
      <TextInput
        placeholder='Insira sua Senha Aqui'
        style={styles.input}
        secureTextEntry={true}
        value={password}
        placeholderTextColor='#c0c0c0'
        onChangeText={setPassword}
      />
      {stageNew && (
        <TextInput
          placeholder='Confirme sua senha'
          style={styles.input}
          secureTextEntry={true}
          value={confirmPassword}
          placeholderTextColor='#c0c0c0'
          onChangeText={setConfirmPassword}
        />
      )}
      {showError && (
        <View style={styles.buttomError}>
          <FlatList
            data={errors}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item }) => (
              <Text style={styles.buttomTextError}>
                <Ionicons name='close' size={20} />
                {item}
              </Text>
            )}
          />
        </View>
      )}
      <TouchableOpacity onPress={signinOrSignup} style={styles.buttom}>
        <Text style={styles.buttomText}>{stageNew ? 'Registrar' : 'Entrar'}</Text>
        <Ionicons name='log-in-outline' size={25} color='#fff' />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setStageNew(!stageNew)}
        style={{
          marginTop: 20,
          width: '80%',
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <Text style={{
          fontSize: 15, color: '#c0c0c0', textShadowColor: '#000',
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 8,
        }}>
          {stageNew ? 'Já possui uma conta? Entrar' : 'Não possui conta? Criar'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat')}
        style={{
          marginTop: 10,
          width: '80%',
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <Text style={{
          fontSize: 15, color: '#c0c0c0', textShadowColor: '#000',
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 8,
        }}>
          Entrar como anônimo
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000'
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
    color: '#d0d0d0',
    width: '80%',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  buttom: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#ff66c4',
    width: '80%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttomError: {
    marginTop: 10,
    padding: 10,
    borderWidth: 5,
    borderColor: '#dc3545',
    width: '80%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  buttomTextError: {
    fontSize: 10,
    color: '#dc3545',
  },
  buttomText: {
    fontSize: 20,
    color: '#fff',
  },
  input: {
    marginTop: 10,
    width: '80%',
    backgroundColor: '#555',
    height: 40,
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    borderRadius: 10,
    color: '#fff'
  },
});
