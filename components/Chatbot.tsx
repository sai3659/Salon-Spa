import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, MinusCircle, User, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! Welcome to Page 3 La' Beige. ✨ How can I help you pamper yourself today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      let botResponseText = "Thank you for reaching out! One of our concierge staff will be with you shortly.";
      const lowerInput = newUserMsg.text.toLowerCase();

      if (lowerInput.includes('book') || lowerInput.includes('appointment')) {
        botResponseText = "I can certainly help with that! You can book an appointment directly through our online booking system. Would you like me to take you there?";
      } else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('how much')) {
        botResponseText = "Our pricing varies depending on the stylist level and specific treatment. You can view our full menu on the Services page.";
      } else if (lowerInput.includes('location') || lowerInput.includes('where') || lowerInput.includes('address')) {
        botResponseText = "We are located at Road No 10 Jubilee Hills, Hyderabad. Right above ICICI bank!";
      } else if (lowerInput.includes('time') || lowerInput.includes('open')) {
        botResponseText = "We are open from 10:00 AM to 8:00 PM every day. We'd love to see you!";
      }

      const newBotMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newBotMsg]);
      setIsTyping(false);
    }, 1500);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-cta-gradient text-white shadow-lg shadow-purple-500/40 flex items-center justify-center hover:scale-110 transition-transform duration-300 group animate-in slide-in-from-bottom-10"
      >
        <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 w-full max-w-[360px] bg-white dark:bg-card-dark rounded-2xl shadow-2xl shadow-purple-900/20 border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col transition-all duration-300 animate-in slide-in-from-bottom-5 ${isMinimized ? 'h-[70px]' : 'h-[500px]'}`}>
      
      {/* Header */}
      <div className="bg-cta-gradient p-4 flex items-center justify-between shrink-0 cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
            <Sparkles className="text-white" size={20} />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">La' Beige Assistant</h3>
            <p className="text-white/80 text-xs flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-white/80">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <MinusCircle size={18} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center shrink-0 
                  ${msg.sender === 'user' ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300' : 'bg-teal/10 text-teal'}
                `}>
                  {msg.sender === 'user' ? <User size={16} /> : <Sparkles size={16} />}
                </div>
                <div className={`
                  max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed
                  ${msg.sender === 'user' 
                    ? 'bg-cta-gradient text-white rounded-tr-none' 
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none shadow-sm'}
                `}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-teal/10 text-teal flex items-center justify-center shrink-0">
                  <Sparkles size={16} />
                </div>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700 shadow-sm flex gap-1 items-center">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-card-dark border-t border-slate-100 dark:border-slate-800">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
                className="w-full pl-4 pr-12 py-3 rounded-full bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-teal/50 outline-none text-sm text-slate-800 dark:text-white"
              />
              <button 
                type="submit" 
                disabled={!inputText.trim()}
                className="absolute right-2 p-2 bg-cta-gradient text-white rounded-full hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-center mt-2">
               <Link to="/book" onClick={() => setIsOpen(false)} className="text-[10px] text-teal hover:underline font-medium uppercase tracking-wider">
                 Ready to book? Click here
               </Link>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
