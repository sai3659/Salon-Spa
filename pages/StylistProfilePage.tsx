import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { STYLISTS } from '../constants';
import { Button } from '../components/Button';
import { Star, CheckCircle, Clock } from 'lucide-react';

export const StylistProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const stylist = STYLISTS.find(s => s.id === id);

  if (!stylist) {
    return <Navigate to="/stylists" />;
  }

  return (
    <div className="pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Profile Header Card */}
        <div className="bg-white dark:bg-card-dark rounded-[32px] p-6 md:p-12 shadow-soft border border-slate-100 dark:border-slate-800 mb-12">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <div className="w-full md:w-1/3">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg mb-6">
                 <img src={stylist.image} alt={stylist.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center justify-center gap-8 text-center">
                 <div>
                   <div className="text-2xl font-bold font-display text-slate-800 dark:text-white">500+</div>
                   <div className="text-xs text-slate-500 uppercase tracking-wider">Clients</div>
                 </div>
                 <div className="w-px h-10 bg-slate-200 dark:bg-slate-700"></div>
                 <div>
                   <div className="text-2xl font-bold font-display text-slate-800 dark:text-white">{stylist.rating}</div>
                   <div className="text-xs text-slate-500 uppercase tracking-wider">Rating</div>
                 </div>
              </div>
            </div>

            <div className="w-full md:w-2/3">
               <div className="flex flex-wrap items-center gap-3 mb-4">
                 <h1 className="text-4xl font-bold font-display text-slate-800 dark:text-white">{stylist.name}</h1>
                 <span className="px-3 py-1 rounded-full bg-teal/10 text-teal border border-teal/20 text-sm font-semibold">{stylist.designation}</span>
               </div>
               
               <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">{stylist.bio}</p>

               <div className="mb-8">
                 <h3 className="font-bold text-slate-900 dark:text-white mb-4">Specializations</h3>
                 <div className="flex flex-wrap gap-3">
                   {stylist.specializations.map((spec, i) => (
                     <div key={i} className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                        <CheckCircle size={16} className="text-teal" />
                        <span className="text-sm text-slate-600 dark:text-slate-300">{spec}</span>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="mb-8">
                 <h3 className="font-bold text-slate-900 dark:text-white mb-4">Upcoming Availability</h3>
                 <div className="flex gap-3 overflow-x-auto pb-2">
                   {['Today', 'Tomorrow', 'Wed 24'].map((day, i) => (
                     <div key={i} className={`flex-shrink-0 w-24 p-3 rounded-xl border text-center ${i === 0 ? 'border-teal bg-teal/5' : 'border-slate-200 dark:border-slate-700'}`}>
                        <div className="text-xs text-slate-500 mb-1">{day}</div>
                        <div className="font-bold text-slate-800 dark:text-white">3 Slots</div>
                     </div>
                   ))}
                 </div>
               </div>

               <Link to={`/book?stylist=${stylist.id}`}>
                 <Button className="w-full md:w-auto px-8">Book Appointment with {stylist.name.split(' ')[0]}</Button>
               </Link>
            </div>
          </div>
        </div>

        {/* Portfolio / Gallery */}
        <h2 className="text-2xl font-bold font-display mb-8 text-slate-800 dark:text-white">Transformation Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {stylist.portfolio.map((img, i) => (
             <div key={i} className="group relative rounded-2xl overflow-hidden aspect-video shadow-md">
               <img src={img} alt="Portfolio work" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
               <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/80 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                 Result
               </div>
             </div>
           ))}
        </div>

      </div>
    </div>
  );
};