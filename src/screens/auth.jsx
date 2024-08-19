import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ImageBackground, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';

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
      Alert.alert('Sucesso!', 'Criar conta');
    } else {
      login();
      Alert.alert('Sucesso!', 'Logar');
    }
    console.log({ username, password, firstName, lastName, confirmPassword, stageNew, showError, errors });
  };

  const login = async () => {
    console.log('iniciando o login');

    const headers = {
      'Content-Type': 'application/json',
    };

    const data = {
      username,
      password,
    };

    try {
      const response = await axios.post(
        'https://teenpod.pythonanywhere.com/api/token/',
        data,
        { headers }
      );

      console.log('STATUS Login', response.status);
      console.log(response.data);

      if (response.status === 200) {
        navigation.navigate('Chat');
      } else if (response.status === 400 || response.status === 401) {
        setShowError(true);
        const errorList = [];
        response.data.username && errorList.push(`Email: ${response.data.username}`);
        response.data.password && errorList.push(`Senha: ${response.data.password}`);
        response.data.detail && errorList.push(`Erro: ${response.data.detail}`);
        console.log(errorList);
        setErrors(errorList);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const register = async () => {
    console.log('iniciando o registro');

    const headers = {
      'Content-Type': 'application/json',
    };

    const data = {
      username,
      first_name: firstName,
      last_name: lastName,
      password,
      confirm_password: confirmPassword,
    };

    try {
      const response = await axios.post(
        'https://teenpod.pythonanywhere.com/api/users/',
        data,
        { headers }
      );

      console.log('STATUS Register', response.status);
      console.log(response.data);

      if (response.status === 201) {
        setUsername('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setConfirmPassword('');
        setStageNew(false);
        setShowError(false);
        setErrors([]);
      } else if (response.status >= 400 && response.status < 500) {
        setShowError(true);
        const errorList = [];
        response.data.username && errorList.push(`Email: ${response.data.username}`);
        response.data.password && errorList.push(`Senha: ${response.data.password}`);
        response.data.detail && errorList.push(`Erro: ${response.data.detail}`);
        console.log(errorList);
        setErrors(errorList);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <ImageBackground source={require('../../assets/auth-page.png')} style={styles.container}>
      <Text style={styles.title}>
        {stageNew ? 'Crie sua conta' : 'Faça seu Login'}
      </Text>
      <TextInput
        placeholder='Nome de Usuário, sem espaços, somente letra minuscula sem acento'
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
        <Text style={{ fontSize: 15, color: '#c0c0c0' }}>
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
        <Text style={{ fontSize: 15, color: '#c0c0c0' }}>
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
    backgroundColor: '#161616'
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
    color: '#d0d0d0',
    width: '80%',
  },
  buttom: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#00d8ff',
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
