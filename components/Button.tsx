import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  isLoading = false,
  disabled,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const variants = {
    primary: "bg-cta-gradient text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-1 hover:brightness-105",
    secondary: "bg-white dark:bg-card-dark border-2 border-teal text-teal dark:text-teal-ultra hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:shadow-md",
    ghost: "bg-transparent text-purple-dark dark:text-purple-light hover:bg-purple-50 dark:hover:bg-purple-900/10 hover:text-purple-dark",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Ripple/Shine effect for primary buttons */}
      {variant === 'primary' && !isLoading && (
        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[shimmer_1s_infinite]"></span>
      )}

      {isLoading ? (
        <span className="flex items-center gap-2 relative z-10">
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : <span className="relative z-10">{children}</span>}
    </button>
  );
};