import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Message } from '../data/mockData';

interface ChatContextType {
  messages: Message[];
  addMessage: (text: string, sender: 'user' | 'bot' | 'agent') => void;
  isTyping: boolean;
  setIsTyping: (value: boolean) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  isChatOpen: boolean;
  setIsChatOpen: (value: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const addMessage = (text: string, sender: 'user' | 'bot' | 'agent') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      language: selectedLanguage,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        isTyping,
        setIsTyping,
        selectedLanguage,
        setSelectedLanguage,
        isChatOpen,
        setIsChatOpen,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
