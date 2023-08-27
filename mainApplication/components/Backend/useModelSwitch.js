import ChatService from './ChatService';
import { useState } from 'react';

export function useModelSwitch() {
  const modelApiIdentifiers = ['gpt-3.5-turbo', 'gpt-4'];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleIndexChange = (index) => {
    setSelectedIndex(index);
    ChatService.setModel(modelApiIdentifiers[index]);
    console.log('Selected model:', ChatService.getModel());
  };

  return { selectedIndex, handleIndexChange };
}

