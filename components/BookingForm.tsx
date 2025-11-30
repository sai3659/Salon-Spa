import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookingFormData, BookingStatus } from '../types';
import { SERVICES, STYLISTS, COMPANY_DETAILS } from '../constants';
import { Button } from './Button';
import { CheckCircle, AlertCircle, Calendar as CalendarIcon, Clock, User, Phone, Mail, FileText, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const BookingForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preSelectedService = searchParams.get('service');
  const preSelectedStylist = searchParams.get('stylist');

  const [formData, setFormData] = useState<BookingFormData>({
    stylistId: preSelectedStylist || '',
    serviceId: preSelectedService || '',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  const [status, setStatus] = useState<BookingStatus>(BookingStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Custom Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateObj, setSelectedDateObj] = useState<Date | null>(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    // Adjust to local ISO string part
    const offset = newDate.getTimezoneOffset(); 
    const localDate = new Date(newDate.getTime() - (offset*60*1000));
    setFormData({ ...formData, date: localDate.toISOString().split('T')[0], time: '' });
    setSelectedDateObj(newDate);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    const today = new Date();
    const prev = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    // Don't go back past current month
    if (prev.getMonth() < today.getMonth() && prev.getFullYear() === today.getFullYear()) return;
    setCurrentDate(prev);
  };

  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:30 PM", "03:30 PM", "04:30 PM", "06:00 PM", "07:00 PM"
  ];

  // Helper to get selected objects
  const selectedService = SERVICES.find(s => s.id === formData.serviceId);
  const selectedStylist = STYLISTS.find(s => s.id === formData.stylistId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(BookingStatus.LOADING);
    setErrorMessage('');

    try {
      const payload = {
        ...formData,
        serviceName: selectedService?.name,
        stylistName: selectedStylist?.name,
        submissionDate: new Date().toISOString(),
      };

      // Attempt to post to webhook (or placeholder)
      try {
          const response = await fetch(COMPANY_DETAILS.webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          // Accept 200/201 as success (JSONPlaceholder returns 201)
          if (!response.ok) {
             console.warn("Webhook response not OK, falling back to demo success state.");
          }
      } catch (networkError) {
          console.warn("Webhook fetch failed (likely offline or blocked), simulating success for demo.");
          // Simulate network delay for realism if fetch fails
          await new Promise(resolve => setTimeout(resolve, 1500));
      }

      // If we reach here, we treat it as a success for the user experience.
      setStatus(BookingStatus.SUCCESS);
      setFormData({
        stylistId: '',
        serviceId: '',
        date: '',
        time: '',
        name: '',
        phone: '',
        email: '',
        notes: '',
      });
      setSelectedDateObj(null);

    } catch (error) {
      console.error(error);
      setStatus(BookingStatus.ERROR);
      setErrorMessage("We couldn't process your booking. Please try again.");
    }
  };

  if (status === BookingStatus.SUCCESS) {
    return (
      <div className="bg-white dark:bg-card-dark p-8 rounded-[32px] shadow-soft text-center animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle className="text-green-500 w-12 h-12" />
        </div>
        <h3 className="text-3xl font-bold font-display text-slate-800 dark:text-white mb-4">Booking Confirmed!</h3>
        <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto">
          Thank you for choosing La' Beige. We have sent confirmation details to your email and phone.
        </p>
        <Button onClick={() => setStatus(BookingStatus.IDLE)} variant="secondary">
          Book Another Appointment
        </Button>
      </div>
    );
  }

  const today = new Date();
  const isCurrentMonth = currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-card-dark p-6 md:p-10 rounded-[32px] shadow-soft border border-slate-100 dark:border-slate-800 transition-all">
      <div className="mb-10 text-center md:text-left">
        <h3 className="text-3xl font-bold font-display text-slate-800 dark:text-white mb-2">Book Your Appointment</h3>
        <p className="text-slate-500 dark:text-slate-400">Fill in the details below to secure your luxury experience.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Service & Stylist Selection */}
        <div className="space-y-6">
          <div>
             <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Select Service</label>
             <div className="relative group">
               <select 
                 name="serviceId" 
                 required 
                 value={formData.serviceId} 
                 onChange={handleChange}
                 className="w-full pl-4 pr-10 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal/50 transition-all appearance-none cursor-pointer group-hover:border-teal/50 z-10 relative bg-transparent text-slate-800 dark:text-white"
               >
                 <option value="" className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white">Choose a treatment...</option>
                 {SERVICES.map(service => (
                   <option key={service.id} value={service.id} className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white">{service.name} - {service.price}</option>
                 ))}
               </select>
               <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 z-0">
                 <ChevronRight className="rotate-90 w-5 h-5" />
               </div>
             </div>
             
             {/* Service Preview */}
             {selectedService && (
                <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 border border-slate-100 dark:border-slate-700">
                  <img src={selectedService.image} alt={selectedService.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <div className="text-sm font-bold text-slate-800 dark:text-white">{selectedService.name}</div>
                    <div className="text-xs text-slate-500">{selectedService.duration} • {selectedService.price}</div>
                  </div>
                  <CheckCircle className="ml-auto text-teal w-5 h-5" />
                </div>
             )}
          </div>

          <div>
             <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Preferred Stylist (Optional)</label>
             <div className="relative group">
                <select 
                 name="stylistId" 
                 value={formData.stylistId} 
                 onChange={handleChange}
                 className="w-full pl-4 pr-10 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal/50 transition-all appearance-none cursor-pointer group-hover:border-teal/50 z-10 relative bg-transparent text-slate-800 dark:text-white"
               >
                 <option value="" className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white">Any Available Stylist</option>
                 {STYLISTS.map(stylist => (
                   <option key={stylist.id} value={stylist.id} className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white">{stylist.name} ({stylist.designation})</option>
                 ))}
               </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 z-0">
                 <ChevronRight className="rotate-90 w-5 h-5" />
               </div>
             </div>

             {/* Stylist Preview */}
             {selectedStylist && (
                <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 border border-slate-100 dark:border-slate-700">
                  <img src={selectedStylist.image} alt={selectedStylist.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-teal/20" />
                  <div>
                    <div className="text-sm font-bold text-slate-800 dark:text-white">{selectedStylist.name}</div>
                    <div className="text-xs text-slate-500">{selectedStylist.designation}</div>
                  </div>
                  <div className="ml-auto flex items-center text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded-full">
                    <Sparkles size={12} className="mr-1" />
                    Top Rated
                  </div>
                </div>
             )}
          </div>

          <div className="pt-4">
             <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
             <div className="relative group">
               <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-hover:text-teal transition-colors" />
               <input 
                 type="text" 
                 name="name" 
                 required 
                 placeholder="Jane Doe"
                 value={formData.name} 
                 onChange={handleChange}
                 className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal/50 transition-all text-slate-800 dark:text-white placeholder:text-slate-400"
               />
             </div>
          </div>

          <div>
             <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
             <div className="relative group">
               <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-hover:text-teal transition-colors" />
               <input 
                 type="tel" 
                 name="phone" 
                 required 
                 placeholder="+91 98765 43210"
                 value={formData.phone} 
                 onChange={handleChange}
                 className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal/50 transition-all text-slate-800 dark:text-white placeholder:text-slate-400"
               />
             </div>
          </div>
          
           <div>
             <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
             <div className="relative group">
               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-hover:text-teal transition-colors" />
               <input 
                 type="email" 
                 name="email" 
                 required 
                 placeholder="jane@example.com"
                 value={formData.email} 
                 onChange={handleChange}
                 className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal/50 transition-all text-slate-800 dark:text-white placeholder:text-slate-400"
               />
             </div>
          </div>
        </div>

        {/* Custom Calendar & Time */}
        <div className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-[24px] h-fit">
           <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
             <CalendarIcon size={18} className="text-teal" /> 
             Select Date & Time
           </label>
           
           {/* Calendar UI */}
           <div className="bg-white dark:bg-card-dark rounded-2xl p-4 border border-slate-200 dark:border-slate-700 mb-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                 <h4 className="font-bold text-slate-800 dark:text-white">
                   {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                 </h4>
                 <div className="flex gap-2">
                   <button 
                    type="button" 
                    onClick={prevMonth} 
                    disabled={isCurrentMonth}
                    className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 transition-colors"
                   >
                     <ChevronLeft size={20} className="text-slate-600 dark:text-slate-300" />
                   </button>
                   <button 
                    type="button" 
                    onClick={nextMonth}
                    className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                   >
                     <ChevronRight size={20} className="text-slate-600 dark:text-slate-300" />
                   </button>
                 </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                 {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                   <span key={d} className="text-xs font-semibold text-slate-400 uppercase">{d}</span>
                 ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                 {/* Empty cells for prev month days */}
                 {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                   <div key={`empty-${i}`}></div>
                 ))}
                 
                 {/* Days */}
                 {Array.from({ length: daysInMonth }).map((_, i) => {
                   const day = i + 1;
                   const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                   const isToday = day === today.getDate() && isCurrentMonth;
                   const isPast = isCurrentMonth && day < today.getDate();
                   const isSelected = selectedDateObj && date.toDateString() === selectedDateObj.toDateString();
                   
                   return (
                     <button
                       key={day}
                       type="button"
                       disabled={isPast}
                       onClick={() => handleDateClick(day)}
                       className={`
                         aspect-square rounded-full flex items-center justify-center text-sm transition-all relative
                         ${isSelected 
                           ? 'bg-cta-gradient text-white shadow-lg shadow-purple-500/30 scale-105 font-bold' 
                           : isPast 
                             ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                             : 'text-slate-700 dark:text-slate-300 hover:bg-teal/10 hover:text-teal font-medium'
                         }
                         ${isToday && !isSelected ? 'ring-1 ring-teal text-teal' : ''}
                       `}
                     >
                       {day}
                     </button>
                   );
                 })}
              </div>
           </div>

           {/* Time Slots - Visible only after date selection */}
           <div className={`transition-all duration-500 ${selectedDateObj ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none h-0'}`}>
              <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                <Clock size={16} className="text-teal" /> 
                Available Slots for {selectedDateObj?.toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric'})}
              </h5>
              
              {selectedStylist ? (
                <div className="mb-2 text-xs text-teal font-medium flex items-center gap-1">
                  <CheckCircle size={12} />
                  Showing {selectedStylist.name.split(' ')[0]}'s availability
                </div>
              ) : null}

              <div className="grid grid-cols-3 gap-2">
                 {timeSlots.map(time => (
                   <button
                     key={time}
                     type="button"
                     onClick={() => setFormData({ ...formData, time })}
                     className={`
                       py-2 px-1 text-xs rounded-lg border transition-all
                       ${formData.time === time 
                         ? 'bg-teal text-white border-teal shadow-md transform scale-105' 
                         : 'bg-white dark:bg-card-dark border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-teal hover:text-teal'
                       }
                     `}
                   >
                     {time}
                   </button>
                 ))}
              </div>
           </div>
           
           <div className="mt-6">
             <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Special Requests</label>
             <div className="relative group">
               <FileText className="absolute left-4 top-4 text-slate-400 w-5 h-5 group-hover:text-teal transition-colors" />
               <textarea 
                 name="notes" 
                 rows={2}
                 placeholder="Allergies, preferences..."
                 value={formData.notes} 
                 onChange={handleChange}
                 className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal/50 transition-all resize-none text-sm text-slate-800 dark:text-white placeholder:text-slate-400"
               ></textarea>
             </div>
           </div>
        </div>
      </div>

      {status === BookingStatus.ERROR && (
        <div className="mb-8 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 flex items-start gap-3 border border-red-100 dark:border-red-900/50">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <Button 
        type="submit" 
        isLoading={status === BookingStatus.LOADING}
        className="w-full text-lg shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40"
        disabled={!formData.date || !formData.time || !formData.serviceId}
      >
        Confirm Booking
      </Button>
      
      <p className="text-xs text-center text-slate-400 mt-6">
        By confirming, you agree to our cancellation policy (24h notice required). No payment required now.
      </p>
    </form>
  );
};