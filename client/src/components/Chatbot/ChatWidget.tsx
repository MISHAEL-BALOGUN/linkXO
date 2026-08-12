import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, X, Send, Bot, Globe, Minimize2 } from 'lucide-react';
import { languages } from '../../data/mockData';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

export default function ChatWidget() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: t('chatbot.greeting'),
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectCategory = (input: string): string => {
    const lower = input.toLowerCase();
    if (lower.includes('bill') || lower.includes('pay') || lower.includes('refund') || lower.includes('invoice'))
      return 'billing';
    if (lower.includes('ship') || lower.includes('deliver') || lower.includes('track') || lower.includes('order'))
      return 'shipping';
    if (lower.includes('account') || lower.includes('password') || lower.includes('login') || lower.includes('profile'))
      return 'account';
    if (lower.includes('bug') || lower.includes('error') || lower.includes('technical') || lower.includes('api'))
      return 'technical';
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) return 'greeting';
    return 'default';
  };

  const getBotResponse = (category: string): string => {
    const responses = t(`chatbot.responses.${category}`, { returnObjects: true }) as string[];
    if (responses && responses.length > 0) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
    const defaultResponses = t('chatbot.responses.default', { returnObjects: true }) as string[];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue('');

    setIsTyping(true);
    setTimeout(() => {
      const category = detectCategory(inputValue);
      const response = getBotResponse(category);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: response,
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const quickReplies = ['Track order', 'Billing help', 'Account support', 'Technical issue'];

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '16px',
          background: isOpen
            ? '#374151'
            : 'linear-gradient(135deg, #22c55e, #16a34a)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(22, 163, 74, 0.4)',
          transition: 'all 0.3s ease',
          zIndex: 1000,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {isOpen ? (
          <X size={24} color="#ffffff" />
        ) : (
          <MessageSquare size={24} color="#ffffff" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '96px',
            right: '24px',
            width: '400px',
            height: '560px',
            background: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 999,
            animation: 'fadeIn 0.3s ease',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #166534, #16a34a)',
              padding: '20px',
              color: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Bot size={22} color="#ffffff" />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>{t('chatbot.title')}</h4>
                  <p style={{ fontSize: '11px', opacity: 0.8, margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
                    {t('chat.online')}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  <Globe size={16} color="#ffffff" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Minimize2 size={16} color="#ffffff" />
                </button>
              </div>
            </div>

            {/* Language Menu */}
            {showLanguageMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: '80px',
                  right: '20px',
                  background: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                  overflow: 'hidden',
                  zIndex: 10,
                  width: '160px',
                }}
              >
                {languages.slice(0, 6).map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setShowLanguageMenu(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 14px',
                      border: 'none',
                      background: i18n.language === lang.code ? '#f0fdf4' : 'transparent',
                      color: '#374151',
                      fontSize: '13px',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflow: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              background: '#f9fafb',
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  animation: 'fadeIn 0.3s ease',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'flex-end',
                    maxWidth: '85%',
                  }}
                >
                  {msg.sender === 'bot' && (
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Bot size={14} color="#ffffff" />
                    </div>
                  )}
                  <div>
                    <div
                      style={{
                        padding: '10px 14px',
                        borderRadius: msg.sender === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                        background: msg.sender === 'user' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : '#ffffff',
                        color: msg.sender === 'user' ? '#ffffff' : '#374151',
                        fontSize: '13px',
                        lineHeight: '1.5',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {msg.text}
                    </div>
                    <p
                      style={{
                        fontSize: '10px',
                        color: '#9ca3af',
                        marginTop: '4px',
                        textAlign: msg.sender === 'user' ? 'right' : 'left',
                      }}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Bot size={14} color="#ffffff" />
                </div>
                <div
                  style={{
                    background: '#ffffff',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    display: 'flex',
                    gap: '4px',
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: '#22c55e',
                        animation: `pulse 1s ease ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div
            style={{
              display: 'flex',
              gap: '6px',
              padding: '8px 16px',
              overflow: 'auto',
              borderTop: '1px solid #f3f4f6',
            }}
          >
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => setInputValue(reply)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '16px',
                  border: '1px solid #bbf7d0',
                  background: '#f0fdf4',
                  color: '#16a34a',
                  fontSize: '11px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#22c55e';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f0fdf4';
                  e.currentTarget.style.color = '#16a34a';
                }}
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 16px',
              borderTop: '1px solid #f3f4f6',
              background: '#ffffff',
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={t('chatbot.placeholder')}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                fontSize: '13px',
                color: '#374151',
                outline: 'none',
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                border: 'none',
                background: inputValue.trim()
                  ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                  : '#e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
              }}
            >
              <Send size={16} color="#ffffff" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
