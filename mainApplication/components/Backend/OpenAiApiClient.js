import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = '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';

const OpenAiApiClient = {
  post: async (conversation, model) => {
    return await axios.post(
      API_URL,
      {
        model: model,
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
