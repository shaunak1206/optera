import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiClient, ChatHistoryItem } from '@/lib/api';

interface Message {
  type: 'bot' | 'user';
  content: string;
  timestamp?: string;
  loading?: boolean;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: 'MARA AI Assistant online. How can I help you understand the resource allocation system?' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Load chat history on component mount
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const { history } = await apiClient.getChatHistory(5);
        if (history.length > 0) {
          const historicalMessages: Message[] = [];
          history.forEach(item => {
            historicalMessages.push({ type: 'user', content: item.user_message, timestamp: item.timestamp });
            historicalMessages.push({ type: 'bot', content: item.ai_response, timestamp: item.timestamp });
          });
          setMessages(prev => [...prev, ...historicalMessages]);
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
        setIsOnline(false);
      }
    };
    
    loadChatHistory();
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setInputValue('');
    setIsLoading(true);
    
    // Add loading message
    const loadingMessageId = Date.now();
    setMessages(prev => [...prev, { 
      type: 'bot', 
      content: 'Analyzing system status and generating response...', 
      loading: true 
    }]);
    
    try {
      const response = await apiClient.sendChatMessage(userMessage);
      
      // Remove loading message and add real response
      setMessages(prev => prev.slice(0, -1).concat([{
        type: 'bot',
        content: response.response,
        timestamp: response.timestamp
      }]));
      
      setIsOnline(true);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => prev.slice(0, -1).concat([{
        type: 'bot',
        content: 'Sorry, I encountered an error connecting to the system. Please try again.',
        timestamp: new Date().toISOString()
      }]));
      setIsOnline(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-terminal-surface p-4 h-96 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-normal text-terminal-text">AI Assistant</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-terminal-success animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-xs text-terminal-muted">{isOnline ? 'Online' : 'Offline'}</span>
        </div>
      </div>
      
      <div className="flex-1 space-y-3 overflow-y-auto mb-4 pr-2 scrollbar-thin">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
              message.type === 'user' 
                ? 'bg-terminal-accent text-terminal-bg' 
                : 'bg-terminal-border text-terminal-text'
            } ${message.loading ? 'animate-pulse' : ''}`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex space-x-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about system status..."
          className="bg-terminal-bg border-0 text-terminal-text"
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button 
          onClick={handleSend}
          disabled={isLoading || !isOnline}
          className="bg-terminal-accent text-terminal-bg hover:bg-terminal-accent/90 disabled:opacity-50"
        >
          {isLoading ? '...' : 'Send'}
        </Button>
      </div>
    </div>
  );
};

export default Chatbot;
