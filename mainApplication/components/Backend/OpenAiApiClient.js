import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = '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';

const OpenAiApiClient = {
  post: async conversation => {
    return await axios.post(
      API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: conversation,
        temperature: 0.5,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
  },
};

export default OpenAiApiClient;
