import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  UserPlus,
  Globe,
  Bot,
  Headphones,
  ArrowLeft,
} from 'lucide-react';
import { conversations, botResponses } from '../data/mockData';

export default function Chat() {
  const { t } = useTranslation();
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState<
    Array<{ id: number; text: string; sender: 'customer' | 'agent' | 'bot'; time: string }>
  >([
    { id: 1, text: 'Hello! I need help with my recent order.', sender: 'customer', time: '10:30 AM' },
    {
      id: 2,
      text: "Hi Maria! I'd be happy to help you with your order. Could you please provide your order number?",
      sender: 'agent',
      time: '10:31 AM',
    },
    { id: 3, text: 'My order number is #ORD-7892.', sender: 'customer', time: '10:32 AM' },
    {
      id: 4,
      text: "Thank you! I can see your order. It's currently being processed and should ship within 24 hours. You'll receive a tracking number via email.",
      sender: 'agent',
      time: '10:33 AM',
    },
    { id: 5, text: 'Thank you for your help!', sender: 'customer', time: '10:34 AM' },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth < 768;
  const [showConversationList, setShowConversationList] = useState(isMobile);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const sendMessage = () => {
    if (!messageInput.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: messageInput,
      sender: 'agent' as const,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setMessageInput('');

    setIsTyping(true);
    setTimeout(() => {
      const category = detectCategory(messageInput);
      const responses = botResponses[category] || botResponses.default;
      const response = responses[Math.floor(Math.random() * responses.length)];

      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: response,
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

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
    return 'default';
  };

  const quickReplies = ['Track my order', 'Request a refund', 'Account help', 'Technical support'];

  const handleSelectChat = (conv: typeof conversations[0]) => {
    setSelectedChat(conv);
    if (isMobile) {
      setShowConversationList(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 128px)', gap: '0', animation: 'fadeIn 0.4s ease' }}>
      {/* Conversations List */}
      <div
        style={{
          width: isMobile ? '100%' : '340px',
          background: '#ffffff',
          borderRadius: isMobile ? '14px' : '14px 0 0 14px',
          border: '1px solid #e5e7eb',
          borderRight: 'none',
          flexDirection: 'column',
          overflow: 'hidden',
          display: (isMobile && !showConversationList) ? 'none' : 'flex',
          position: isMobile ? 'absolute' : 'relative',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: isMobile ? 10 : 'auto',
        }}
      >
        <div
          style={{
            padding: isMobile ? '16px' : '20px',
            borderBottom: '1px solid #f3f4f6',
          }}
        >
          <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 700, color: '#1f2937', marginBottom: '12px' }}>
            {t('chat.title')}
          </h3>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['All', 'Active', 'Waiting', 'Resolved'].map((filter) => (
              <button
                key={filter}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: filter === 'All' ? '#16a34a' : '#f3f4f6',
                  color: filter === 'All' ? '#ffffff' : '#6b7280',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'auto' }}>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => handleSelectChat(conv)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: isMobile ? '12px 16px' : '14px 20px',
                cursor: 'pointer',
                background: selectedChat.id === conv.id ? '#f0fdf4' : 'transparent',
                borderLeft: selectedChat.id === conv.id ? '3px solid #22c55e' : '3px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {conv.customerAvatar}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#1f2937' }}>
                    {conv.customerName}
                  </span>
                  <span style={{ fontSize: '11px', color: '#9ca3af' }}>
                    {conv.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#6b7280',
                      margin: 0,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: isMobile ? '140px' : '180px',
                    }}
                  >
                    {conv.lastMessage}
                  </p>
                  {conv.unread > 0 && (
                    <span
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: '#22c55e',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {conv.unread}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <Globe size={12} color="#9ca3af" />
                  <span style={{ fontSize: '11px', color: '#9ca3af' }}>
                    {conv.language.toUpperCase()}
                  </span>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background:
                        conv.status === 'active'
                          ? '#22c55e'
                          : conv.status === 'waiting'
                            ? '#f59e0b'
                            : '#6b7280',
                      marginLeft: '4px',
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div
        style={{
          flex: 1,
          background: '#ffffff',
          flexDirection: 'column',
          border: '1px solid #e5e7eb',
          display: (isMobile && showConversationList) ? 'none' : 'flex',
        }}
      >
        {/* Chat Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isMobile ? '12px 16px' : '16px 24px',
            borderBottom: '1px solid #f3f4f6',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px' }}>
            {isMobile && (
              <button
                onClick={() => setShowConversationList(true)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ArrowLeft size={16} color="#374151" />
              </button>
            )}
            <div
              style={{
                width: isMobile ? '36px' : '40px',
                height: isMobile ? '36px' : '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              {selectedChat.customerAvatar}
            </div>
            <div>
              <h4 style={{ fontSize: isMobile ? '14px' : '15px', fontWeight: 600, color: '#1f2937', margin: 0 }}>
                {selectedChat.customerName}
              </h4>
              <p style={{ fontSize: '12px', color: '#22c55e', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                {t('chat.online')} · {selectedChat.language.toUpperCase()}
              </p>
            </div>
          </div>
          {!isMobile && (
            <div style={{ display: 'flex', gap: '8px' }}>
              {[Phone, Video, UserPlus, Bot, MoreVertical].map((Icon, i) => (
                <button
                  key={i}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Icon size={16} color="#6b7280" />
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
            padding: isMobile ? '16px' : '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: '#f9fafb',
          }}
        >
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: msg.sender === 'agent' ? 'flex-end' : 'flex-start',
                animation: 'fadeIn 0.3s ease',
              }}
            >
              <div
                style={{
                  maxWidth: '80%',
                  display: 'flex',
                  flexDirection: msg.sender === 'agent' ? 'row-reverse' : 'row',
                  gap: '8px',
                  alignItems: 'flex-end',
                }}
              >
                {msg.sender !== 'agent' && (
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      background:
                        msg.sender === 'bot'
                          ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                          : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {msg.sender === 'bot' ? (
                      <Bot size={14} color="#ffffff" />
                    ) : (
                      <Headphones size={14} color="#ffffff" />
                    )}
                  </div>
                )}
                <div>
                  <div
                    style={{
                      padding: isMobile ? '10px 12px' : '12px 16px',
                      borderRadius: msg.sender === 'agent' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                      background:
                        msg.sender === 'agent'
                          ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                          : '#ffffff',
                      color: msg.sender === 'agent' ? '#ffffff' : '#374151',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {msg.text}
                  </div>
                  <p
                    style={{
                      fontSize: '11px',
                      color: '#9ca3af',
                      marginTop: '4px',
                      textAlign: msg.sender === 'agent' ? 'right' : 'left',
                    }}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '0 8px' }}>
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
            padding: isMobile ? '8px 12px' : '12px 24px',
            overflow: 'auto',
            borderTop: '1px solid #f3f4f6',
          }}
        >
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => setMessageInput(reply)}
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
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Message Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '8px' : '12px',
            padding: isMobile ? '12px 16px' : '16px 24px',
            borderTop: '1px solid #f3f4f6',
          }}
        >
          {!isMobile && (
            <button
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: 'none',
                background: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Paperclip size={18} color="#6b7280" />
            </button>
          )}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              background: '#f3f4f6',
              borderRadius: '10px',
              padding: '4px 12px',
            }}
          >
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={t('chat.placeholder')}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                padding: '10px 0',
                fontSize: '14px',
                color: '#374151',
                outline: 'none',
              }}
            />
            {!isMobile && (
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <Smile size={20} color="#9ca3af" />
              </button>
            )}
          </div>
          <button
            onClick={sendMessage}
            style={{
              width: isMobile ? '38px' : '42px',
              height: isMobile ? '38px' : '42px',
              borderRadius: '10px',
              border: 'none',
              background: messageInput.trim()
                ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                : '#e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: messageInput.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
            }}
          >
            <Send size={isMobile ? 16 : 18} color="#ffffff" />
          </button>
        </div>
      </div>

      {/* Customer Info Sidebar - Hidden on mobile */}
      {!isMobile && (
        <div
          style={{
            width: '280px',
            background: '#ffffff',
            borderRadius: '0 14px 14px 0',
            border: '1px solid #e5e7eb',
            borderLeft: 'none',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '22px',
                fontWeight: 700,
                margin: '0 auto 12px',
              }}
            >
              {selectedChat.customerAvatar}
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937', margin: 0 }}>
              {selectedChat.customerName}
            </h4>
            <p style={{ fontSize: '12px', color: '#9ca3af', margin: '4px 0 0' }}>
              Customer since Jan 2025
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'Email', value: 'maria@example.com' },
              { label: 'Phone', value: '+1 (555) 123-4567' },
              { label: 'Language', value: selectedChat.language.toUpperCase() },
              { label: 'Total Orders', value: '12' },
              { label: 'Open Tickets', value: '1' },
            ].map((info, i) => (
              <div key={i}>
                <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {info.label}
                </p>
                <p style={{ fontSize: '14px', fontWeight: 500, color: '#374151', margin: 0 }}>{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
