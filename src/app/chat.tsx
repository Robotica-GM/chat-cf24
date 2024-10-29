import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/header';

type Message = {
  id: string;
  user: boolean;
  msg: string;
};

export default function Chat() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: false,
      msg: "Olá, seja bem-vindo à nossa plataforma. Em que posso lhe ajudar?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const main = async (prompt: string) => {
    setIsTyping(true);
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
          "OpenAI-Organization": "org-3dkAnZx3PnWUlpbhM2MISlri"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ 
            role: "system", 
            content: `"${prompt}", caso essa mensagem seja sobre algum tipo de discriminação contra a mulher ajude a encontrar uma solução para esse problema de discriminação contra a mulher, pontue pontos essenciais, mas se for uma mensagem normal, continue a conversa agradavelmente;` 
          }],
          max_tokens: 256,
          temperature: 0.4,
        }),
      });
      const json = await response.json();
      if (json.error) {
        throw Error('erro no json')
      }
      const msgContents = {
        id: Date.now().toString(),
        user: false,
        msg: json.choices[0].message.content,
      };
      setMessages(prevMessages => [...prevMessages, msgContents]);
    } catch (e) {
      Alert.alert("Algo deu errado :(", "Confira sua conexão com a internet, se o problema persistir entre em contato com nosso suporte.")
    } finally {
      setIsTyping(false);
    }
  };

  const saveUserMessages = () => {
    if (userInput.trim() === '') return;

    const userMsgContent = {
      id: Date.now().toString(),
      user: true,
      msg: userInput,
    };
  
    setMessages(prevMessages => [...prevMessages, userMsgContent]);
    main(userInput);
    setUserInput('');
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View 
      className={`rounded-3xl p-3 my-1 max-w-[80%] ${
        item.user ? 'bg-pink-600 self-end' : 'bg-gray-800 self-start'
      }`}
    >
      <Text className="text-white">{item.msg}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Header />
      <StatusBar style="light" />
      <View className="flex-1">
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerClassName="px-4 pb-4"
        />
        {isTyping && (
          <View className="flex-row items-center p-2 bg-gray-800 self-start rounded-3xl mx-4 my-2">
            <ActivityIndicator color="#fff" size="small" />
            <Text className="text-white ml-2">AI está digitando...</Text>
          </View>
        )}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="border-t border-gray-800"
      >
        <View className="flex-row items-center p-2">
          <TextInput
            className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 mr-2"
            placeholder="Digite sua dúvida..."
            placeholderTextColor="#9CA3AF"
            value={userInput}
            onChangeText={setUserInput}
          />
          <TouchableOpacity
            onPress={saveUserMessages}
            disabled={userInput.trim() === ''}
            className={`p-2 rounded-full ${
              userInput.trim() === '' ? 'bg-gray-700' : 'bg-pink-600'
            }`}
          >
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}