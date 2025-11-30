import React from 'react';
import { Link } from 'react-router-dom';
import { STYLISTS } from '../constants';
import { Star } from 'lucide-react';
import { Button } from '../components/Button';

export const StylistsPage: React.FC = () => {
  return (
    <div className="pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-5xl md:text-6xl font-bold font-display mb-6 text-slate-800 dark:text-white">Meet Our Artisans</h1>
          <p className="text-slate-600 dark:text-slate-300 text-xl leading-relaxed">
             Talented professionals dedicated to perfecting your look with passion and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
           {STYLISTS.map((stylist, index) => (
             <div 
               key={stylist.id} 
               className="group relative bg-white dark:bg-card-dark rounded-[2rem] overflow-hidden shadow-soft transition-all duration-500 hover:-translate-y-2 animate-in fade-in zoom-in duration-500"
               style={{ animationDelay: `${index * 100}ms` }}
             >
               {/* RGB Glow Border */}
               <div className="absolute inset-0 bg-gradient-to-tr from-teal-400 via-purple-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none p-[2px] rounded-[2rem] -z-10"></div>
               
               <div className="bg-white dark:bg-card-dark h-full rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 group-hover:border-transparent transition-colors">
                 <div className="aspect-[4/5] relative overflow-hidden">
                   <img src={stylist.image} alt={stylist.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                     <Star size={14} className="fill-yellow-400 text-yellow-400" />
                     <span className="text-sm font-bold text-slate-800">{stylist.rating}</span>
                   </div>
                   
                   {/* Overlay Content */}
                   <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-20">
                     <h3 className="text-2xl font-bold font-display text-white mb-1">{stylist.name}</h3>
                     <p className="text-teal-light font-medium text-sm">{stylist.designation}</p>
                   </div>
                 </div>
                 
                 <div className="p-6">
                   <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">{stylist.bio}</p>
                   
                   <div className="flex flex-wrap gap-2 mb-8">
                     {stylist.specializations.slice(0,3).map((spec, i) => (
                       <span key={i} className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700">
                         {spec}
                       </span>
                     ))}
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     <Link to={`/stylists/${stylist.id}`}>
                       <Button variant="secondary" className="w-full !px-2 text-sm">View Profile</Button>
                     </Link>
                     <Link to={`/book?stylist=${stylist.id}`}>
                       <Button className="w-full !px-2 text-sm">Book Now</Button>
                     </Link>
                   </div>
                 </div>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};