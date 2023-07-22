export const createAssistantMessage = text => {
  return {
    _id: Math.random().toString(),
    text,
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'ChatGPT',
    },
  };
};

export const createUserMessage = message => {
  return {
    role: message.user._id === 1 ? 'user' : 'assistant',
    content: message.text,
  };
};
