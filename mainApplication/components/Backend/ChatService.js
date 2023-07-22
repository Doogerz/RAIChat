import OpenAiApiClient from './OpenAiApiClient';
import {createAssistantMessage, createUserMessage} from './MessageFactory';

class ChatService {
  static conversation = [];

  static async sendMessage(messages) {
    try {
      const newMessage = createUserMessage(messages[0]);
      this.conversation.push(newMessage);
      const response = await OpenAiApiClient.post(this.conversation);
      const responseMessage = createAssistantMessage(
        response.data.choices[0].message.content,
      );
      this.conversation.push({
        role: 'assistant',
        content: responseMessage.text,
      });
      return responseMessage;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while sending the message.');
    }
  }
}

export default ChatService;
