/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Bubble, GiftedChat, IMessage} from 'react-native-gifted-chat';
import ChatService from './components/Backend/ChatService';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {CustomInputToolbar} from './components/Frontend/CustomInputToolbar';

const Stack = createStackNavigator();

const ChatScreen = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const greetingMessage = {
      _id: '1',
      text: 'Hello! How can I assist you today?',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'ChatGPT',
      },
    };

    setMessages([greetingMessage]);
  }, []);

  const onSend = async (newMessages: IMessage[] = []) => {
    const updatedMessages = GiftedChat.append(messages, newMessages);
    setMessages(updatedMessages);
    const responseMessage = await ChatService.sendMessage(newMessages);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [responseMessage]),
    );
  };

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          left: {
            color: 'white',
          },
          right: {
            color: 'white',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: '#333',
          },
          right: {
            backgroundColor: '#333',
          },
        }}
      />
    );
  };

  return (
    <View style={styles.chatEmpty}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{_id: 1}}
        renderBubble={renderBubble}
        renderInputToolbar={props => <CustomInputToolbar {...props} />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  chatEmpty: {
    flex: 1,
    backgroundColor: 'black',
  },
});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            title: 'Rai',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <Button
                onPress={() => console.log('This is a button!')}
                title="Settings"
                color="#fff"
              />
            ),
            headerLeft: () => (
              <Button
                onPress={() => console.log('This is another button!')}
                title="Tokens"
                color="#fff"
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
