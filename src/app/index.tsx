import React, { useState } from 'react';
import { View, Text, FlatList, ImageBackground, Alert, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '@/lib/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/styles/colors';

interface FormData {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  confirmPassword: string
}

export default function Login() {
  const [stageNew, setStageNew] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const [form, setForm] = useState<Partial<FormData>>({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: ''
  })

  const signinOrSignup = () => {
    if (stageNew) {
      register();
    } else {
      login();
    }
  };

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, form.username!, form.password!);
      const user = userCredential.user;
      console.log(user);
      Alert.alert('Sucesso!', 'Login realizado com sucesso');

      router.navigate("/chat")
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.log(errorMessage);
      setShowError(true);
      setErrors([errorMessage]);
    }
  };

  const register = async () => {
    if (form.password !== form.confirmPassword) {
      setShowError(true);
      setErrors(['As senhas não coincidem']);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.username!, form.password!);
      const user = userCredential.user;
      console.log(user);
      Alert.alert('Sucesso!', 'Conta criada com sucesso');
      setStageNew(false)
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.log(errorMessage);
      setShowError(true);
      setErrors([errorMessage]);
    }
  };

  return (
    <ImageBackground source={require('../../assets/auth-page.png')} className="flex-1 justify-center bg-black">
      <ImageBackground source={require("../../assets/bg.png")} className='border bg-gray-950 border-1 relative border-gray-200 items-center mx-3 py-10 p-5 rounded-xl'>
        <Text className="text-4xl mb-5 text-gray-100 w-full font-bold">
          {stageNew ? 'Crie sua conta' : 'Faça seu Login'}
        </Text>
        <Input variant="tertiary" className="w-full mb-3">
          <Feather name='mail' size={20} color={colors.pink[500]} />
          <Input.Field
            className='ml-2'
            placeholder='Email'
            autoFocus={true}
            value={form.username}
            onChangeText={text => setForm(prev => ({ ...prev, username: text }))}
          />
        </Input>
        {stageNew && (
          <>
            <Input variant="tertiary" className="w-full mb-3">
              <Feather name='user' size={20} color={colors.pink[500]} />
              <Input.Field
                className='ml-2'
                placeholder='Primeiro Nome'
                value={form.firstName}
                onChangeText={text => setForm(prev => ({ ...prev, firstName: text }))}
              />
            </Input>
            <Input variant="tertiary" className="w-full mb-3">
              <Feather name='user' size={20} color={colors.pink[500]} />
              <Input.Field
                className='ml-2'
                placeholder='Segundo/Ultimo Nome'
                value={form.lastName}
                onChangeText={text => setForm(prev => ({ ...prev, lastName: text }))}
              />
            </Input>
          </>
        )}
        <Input variant="tertiary" className="w-full mb-3">
          <Feather name='lock' size={20} color={colors.pink[500]} />
          <Input.Field
            className='ml-2'
            placeholder='Insira sua Senha Aqui'
            secureTextEntry={true}
            value={form.password}
            onChangeText={text => setForm(prev => ({ ...prev, password: text }))}
          />
        </Input>
        {stageNew && (
          <Input variant="tertiary" className="w-full mb-3">
            <Feather name='lock' size={20} color={colors.pink[500]} />
            <Input.Field
              className='ml-2'
              placeholder='Confirme sua senha'
              secureTextEntry={true}
              value={form.confirmPassword}
              onChangeText={text => setForm(prev => ({ ...prev, confirmPassword: text }))}
            />
          </Input>
        )}
        {showError && (
          <View className="mt-2 p-2 border-4 border-red-600 w-full rounded-lg items-center">
            <FlatList
              data={errors}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({ item }) => (
                <Text className="text-xs text-red-600">
                  <Ionicons name='close' size={20} />
                  {item}
                </Text>
              )}
            />
          </View>
        )}
        <Button
          variant="destructive"
          size="lg"
          label={stageNew ? 'Registrar' : 'Entrar'}
          onPress={signinOrSignup}
          className="mt-8 w-full"
          labelClasses='color-gray-100'
          style={{
            backgroundColor: colors.primary
          }}
        />
        <Button
          variant="ghost"
          size="sm"
          label={stageNew ? 'Já possui uma conta? Entrar' : 'Não possui conta? Criar'}
          onPress={() => setStageNew(!stageNew)}
          className="mt-5 w-full"
          labelClasses='color-gray-100'
          style={{
            backgroundColor: colors.gray[800]
          }}
        />
        <Button
          variant="link"
          size="sm"
          label="Entrar como anônimo"
          onPress={() => router.navigate('/chat')}
          className="mt-2 w-full"
          labelClasses='color-gray-100'
        />
      </ImageBackground>
    </ImageBackground>
  );
}
