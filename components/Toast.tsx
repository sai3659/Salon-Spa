import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, Info, Sparkles } from 'lucide-react';

export interface ToastData {
  id: string;
  message: string;
  type: 'success' | 'info' | 'luxury';
}

interface ToastContextType {
  addToast: (message: string, type?: ToastData['type']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((message: string, type: ToastData['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-24 right-4 z-[100] flex flex-col gap-3 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/20 
              transform transition-all animate-in slide-in-from-right-full duration-500 border
              ${toast.type === 'success' 
                ? 'bg-teal text-white border-teal-400' 
                : toast.type === 'luxury' 
                  ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white border-slate-700 shadow-purple-500/20'
                  : 'bg-white dark:bg-card-dark text-slate-800 dark:text-white border-slate-100 dark:border-slate-700'}
            `}
          >
            {toast.type === 'success' && <CheckCircle className="shrink-0" size={20} />}
            {toast.type === 'luxury' && <Sparkles className="shrink-0 text-yellow-400" size={20} />}
            {toast.type === 'info' && <Info className="shrink-0 text-teal" size={20} />}
            
            <p className="text-sm font-medium leading-tight">{toast.message}</p>
            
            <button 
              onClick={() => removeToast(toast.id)} 
              className="ml-auto p-1 rounded-full hover:bg-white/20 dark:hover:bg-slate-700 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};