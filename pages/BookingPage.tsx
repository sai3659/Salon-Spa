import React from 'react';
import { BookingForm } from '../components/BookingForm';

export const BookingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-page-light dark:bg-page-dark pt-12 pb-24">
       <div className="container mx-auto px-4 md:px-6">
         <div className="max-w-3xl mx-auto">
            <BookingForm />
            
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Need help? Call us at <span className="text-teal font-semibold">+91 98765 43210</span>
              </p>
            </div>
         </div>
       </div>
    </div>
  );
};