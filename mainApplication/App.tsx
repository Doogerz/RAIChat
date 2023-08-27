/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Bubble, GiftedChat, IMessage} from 'react-native-gifted-chat';
import ChatService from './components/Backend/ChatService';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {CustomInputToolbar} from './components/Frontend/CustomInputToolbar';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import{useModelSwitch} from './components/Backend/useModelSwitch';







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
  const { selectedIndex, handleIndexChange } = useModelSwitch();

 

  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerStyle:{ backgroundColor: 'black'},

            headerTitle: () => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              
              <TouchableOpacity
                onPress={() => console.log('This is a button!')}
                style={{marginLeft: 4, marginRight:60, backgroundColor: '#333', paddingVertical: 6, paddingHorizontal: 6, borderRadius: 10,
                        flexDirection:'row', alignItems:'center'}}>
                          <Text style={{color: 'white'}}>Tok</Text>
                          
              </TouchableOpacity>
      
              <SegmentedControlTab
                values={['GPT-3.5', 'GPT-4.0']}
                selectedIndex={selectedIndex}
                onTabPress={handleIndexChange}
                tabStyle={{ borderColor: '#333', backgroundColor: 'white' }}
                activeTabStyle={{ backgroundColor: '#333' }}
                tabTextStyle={{ color: '#333' }}
                activeTabTextStyle={{ color: 'white' }}
              />
      
              <TouchableOpacity
                onPress={() => console.log('This is another button!')}
                style={{marginLeft: 60, marginRight: 5,backgroundColor: '#333', paddingVertical: 6, paddingHorizontal: 6, borderRadius: 10,
                flexDirection:'row', alignItems:'center'}}>
                <Text style={{color: 'white'}}>Set</Text>
              </TouchableOpacity>
            </View>
          ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
