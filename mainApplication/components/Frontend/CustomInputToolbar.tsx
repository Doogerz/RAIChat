/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

export const CustomInputToolbar = (props: any) => {
  const [text, setText] = useState('');

  const onSend = () => {
    if (text.trim().length > 0) {
      const messages = [
        {
          _id: Math.round(Math.random() * 1000000),
          text: text.trim(),
          createdAt: new Date(),
          user: {
            _id: 1,
          },
        },
      ];

      setText('');
      props.onSend(messages);
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
      }}>
      <TextInput
        style={{
          flex: 1,
          color: 'white',
          paddingHorizontal: 10,
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 20,
          backgroundColor: 'gray',
        }}
        value={text}
        onChangeText={setText}
        multiline={false}
      />
      <TouchableOpacity
        onPress={onSend}
        style={{
          marginLeft: 10,
          backgroundColor: 'teal',
          padding: 10,
          borderRadius: 20,
        }}>
        <Text style={{color: 'white'}}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};
