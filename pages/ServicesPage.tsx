import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import { Button } from '../components/Button';
import { ArrowRight, Filter } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const categories = ['all', 'hair', 'skin', 'makeup', 'spa'];
  
  const filteredServices = activeCategory === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeCategory);

  return (
    <div className="pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6 text-slate-800 dark:text-white">Our Services</h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Indulge in a wide range of premium treatments crafted to rejuvenate your mind, body, and spirit.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
           {categories.map(cat => (
             <button
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`px-6 py-2 rounded-full capitalize text-sm font-medium transition-all ${
                 activeCategory === cat 
                   ? 'bg-teal text-white shadow-lg shadow-teal/30' 
                   : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
               }`}
             >
               {cat}
             </button>
           ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div key={service.id} className="group bg-white dark:bg-card-dark rounded-3xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold tracking-wider text-teal uppercase bg-teal/10 px-2 py-1 rounded">{service.category}</span>
                  <span className="font-bold text-slate-800 dark:text-white text-lg">{service.price}</span>
                </div>
                <h3 className="text-xl font-bold font-display mb-3 text-slate-800 dark:text-white">{service.name}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  {service.duration}
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-grow">{service.description}</p>
                
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                  <Link to={`/book?service=${service.id}`}>
                    <Button className="w-full">Book This Service</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};