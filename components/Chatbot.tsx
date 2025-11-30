import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! Welcome to Page 3 La' Beige. How can I assist you with your luxury experience today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulated Bot Response Logic
    setTimeout(() => {
      let botText = "Thank you for reaching out. Our concierge will be with you shortly.";
      const lowerInput = userMsg.text.toLowerCase();

      if (lowerInput.includes('book') || lowerInput.includes('appointment')) {
        botText = "You can book an appointment easily by clicking the 'Book Now' button in the top menu, or I can guide you to our Booking page.";
      } else if (lowerInput.includes('price') || lowerInput.includes('cost')) {
        botText = "Our services start from ₹2,000. You can view our full menu and pricing on the Services page.";
      } else if (lowerInput.includes('location') || lowerInput.includes('address')) {
        botText = "We are located at Jubilee Hills, Road No 10, Hyderabad. You can find a map at the bottom of the page!";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        botText = "Hi there! Ready to glow today?";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: botText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[90] p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 ${isOpen ? 'rotate-90 bg-slate-800 text-white dark:bg-slate-700' : 'bg-cta-gradient text-white hover:-translate-y-1'}`}
        aria-label="Toggle Chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
        )}
      </button>

      {/* Chat Window */}
      <div 
        className={`
          fixed bottom-24 right-6 z-[90] w-[90vw] md:w-[380px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-700 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'}
        `}
        style={{ height: 'min(500px, 70vh)' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-purple-600 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-md">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-bold text-white font-display text-lg">La' Beige Concierge</h3>
            <p className="text-teal-100 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              Online Now
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-slate-50/50 dark:bg-black/20">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200' : 'bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-200'}`}>
                {msg.sender === 'user' ? <User size={14} /> : <Sparkles size={14} />}
              </div>
              <div 
                className={`
                  max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
                  ${msg.sender === 'user' 
                    ? 'bg-purple-600 text-white rounded-br-none' 
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-none border border-slate-100 dark:border-slate-700'}
                `}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-200 flex items-center justify-center">
                 <Sparkles size={14} />
               </div>
               <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1">
                 <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                 <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                 <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-teal/50 text-slate-800 dark:text-white placeholder:text-slate-400 transition-all text-sm"
            />
            <button 
              type="submit" 
              disabled={!inputValue.trim()}
              className="absolute right-2 p-2 bg-cta-gradient text-white rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:shadow-none transition-all active:scale-95"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};