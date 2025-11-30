import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { SERVICES, STYLISTS, TESTIMONIALS } from '../constants';
import { Star, ArrowRight, Sparkles, Scissors, Wind, Heart } from 'lucide-react';
import { useToast } from '../components/Toast';

export const Home: React.FC = () => {
  const { addToast } = useToast();

  const handleProductView = () => {
    addToast("Saved to your Wishlist! (Demo)", 'luxury');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-28 md:pb-40">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           {/* Abstract Hair Strands Animation */}
           <svg className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M-100 400C200 200 400 600 800 400C1200 200 1400 500 1600 300" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="10 10">
                <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="20s" repeatCount="indefinite" />
                <animate attributeName="d" values="M-100 400C200 200 400 600 800 400C1200 200 1400 500 1600 300; M-100 450C250 250 450 650 850 450C1250 250 1450 550 1600 350; M-100 400C200 200 400 600 800 400C1200 200 1400 500 1600 300" dur="10s" repeatCount="indefinite" />
             </path>
             <path d="M-100 500C300 300 500 700 900 500C1300 300 1500 600 1700 400" stroke="url(#gradient2)" strokeWidth="3">
                <animate attributeName="d" values="M-100 500C300 300 500 700 900 500C1300 300 1500 600 1700 400; M-100 550C350 350 550 750 950 550C1350 350 1550 650 1700 450; M-100 500C300 300 500 700 900 500C1300 300 1500 600 1700 400" dur="15s" repeatCount="indefinite" />
             </path>
             <defs>
               <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#06B6D4" />
                 <stop offset="100%" stopColor="#9C4DFF" />
               </linearGradient>
               <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#82E6D8" />
                 <stop offset="100%" stopColor="#7A3CFF" />
               </linearGradient>
             </defs>
           </svg>

           {/* Floating Dynamic Salon Icons - Now Wandering Freely */}
           <div className="absolute top-20 left-10 text-teal/30 animate-wander">
             <Scissors size={64} />
           </div>
           <div className="absolute top-1/2 right-20 text-purple-light/30 animate-wander-reverse delay-1000">
             <Wind size={56} />
           </div>
           <div className="absolute bottom-20 left-1/3 text-teal-dark/20 animate-float-wild delay-500">
             <Sparkles size={48} />
           </div>
           
           {/* Gradient Blobs */}
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-teal-light/30 to-transparent rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-pulse dark:opacity-20"></div>
           <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-purple-light/30 to-transparent rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-pulse dark:opacity-20" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-card-dark/80 backdrop-blur-sm border border-teal/20 text-teal-700 dark:text-teal font-medium text-sm mb-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Sparkles size={16} className="text-purple-500 animate-pulse" />
                <span>New: Summer Glow Package</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-[1.1] mb-8 text-slate-900 dark:text-white animate-in fade-in slide-in-from-bottom-8 duration-1000">
                Refresh <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-teal-500 bg-300% animate-shimmer">Your Look</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                Luxury salon & spa treatments crafted for your best self. Book a stylist or enjoy a full-day pamper session in Jubilee Hills.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
                <Link to="/book" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto text-lg px-8">Book Appointment</Button>
                </Link>
                <Link to="/services" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full sm:w-auto text-lg px-8">Explore Services</Button>
                </Link>
              </div>
            </div>
            
            <div className="flex-1 relative animate-in fade-in zoom-in duration-1000 delay-500">
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-teal/20 transform rotate-3 hover:rotate-0 transition-all duration-700 group border-4 border-white dark:border-slate-800">
                <img 
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Luxury Salon Interior" 
                  className="w-full h-auto object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-10">
                  <div className="flex items-center gap-3 text-white">
                    <div className="bg-yellow-400 p-2 rounded-full text-black shadow-lg shadow-yellow-400/50">
                      <Star size={20} fill="currentColor" />
                    </div>
                    <div>
                        <div className="font-bold text-xl">4.9/5 Rating</div>
                        <div className="text-white/80 text-sm">Based on 200+ Reviews</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative floating shapes */}
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-cta-gradient rounded-full blur-2xl opacity-40 animate-pulse"></div>
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-teal rounded-full blur-2xl opacity-30 animate-pulse delay-700"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services - Horizontal Scrolling Row */}
      <section className="py-24 bg-white/50 dark:bg-card-dark/30 backdrop-blur-sm relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
             <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-slate-800 dark:text-white">Curated Experiences</h2>
             <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">Discover our most popular treatments designed to rejuvenate your body and enhance your natural beauty.</p>
          </div>
          
          <div className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {SERVICES.slice(0, 4).map((service) => (
              <div key={service.id} className="min-w-[85vw] md:min-w-[380px] snap-center group relative rounded-[2rem] p-[2px] transition-all hover:shadow-glow duration-500">
                {/* Gradient Border Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal via-purple-500 to-teal rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                <div className="relative bg-white dark:bg-card-dark rounded-[1.8rem] h-full overflow-hidden shadow-soft flex flex-col">
                    <div className="relative h-64 overflow-hidden">
                      <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-slate-800 shadow-sm">
                        {service.price}
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="text-xs font-bold tracking-wider text-teal uppercase mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-teal"></span>
                        {service.category}
                      </div>
                      <h3 className="text-2xl font-bold font-display mb-3 text-slate-800 dark:text-white group-hover:text-purple-600 transition-colors">{service.name}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed line-clamp-2">{service.description}</p>
                      
                      <div className="mt-auto">
                        <Link to={`/book?service=${service.id}`} className="group/btn flex items-center gap-2 text-slate-800 dark:text-white font-bold hover:text-teal transition-colors">
                          <span className="border-b-2 border-slate-200 dark:border-slate-700 group-hover/btn:border-teal pb-0.5 transition-colors">Book Now</span>
                          <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/services">
              <Button variant="ghost" className="text-lg">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Stylists - Horizontal Scrolling Row */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-slate-800 dark:text-white">Meet Our Experts</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-xl text-lg">Our team of certified professionals is dedicated to providing personalized care and exceptional results.</p>
              </div>
              <Link to="/stylists" className="hidden md:block">
                <Button variant="secondary">View All Team</Button>
              </Link>
           </div>

           <div className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
             {STYLISTS.slice(0, 4).map((stylist) => (
               <Link to={`/stylists/${stylist.id}`} key={stylist.id} className="min-w-[80vw] md:min-w-[320px] snap-center block group relative">
                 {/* RGB Glow Effect on Hover */}
                 <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 rounded-[2.5rem] opacity-0 group-hover:opacity-70 blur-md transition-opacity duration-500"></div>
                 
                 <div className="relative rounded-[2rem] overflow-hidden aspect-[3/4] shadow-lg">
                   <img src={stylist.image} alt={stylist.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                   
                   <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                     <h3 className="text-white text-3xl font-bold font-display mb-1">{stylist.name}</h3>
                     <p className="text-teal-light font-medium text-lg mb-4">{stylist.designation}</p>
                     <div className="flex gap-2">
                       {stylist.specializations.slice(0,2).map((s, i) => (
                         <span key={i} className="text-xs text-white/90 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">{s}</span>
                       ))}
                     </div>
                   </div>
                 </div>
               </Link>
             ))}
           </div>
           
           <div className="mt-8 md:hidden text-center">
             <Link to="/stylists">
               <Button variant="secondary">View All Team</Button>
             </Link>
           </div>
        </div>
      </section>

      {/* Testimonials - Horizontal Row */}
      <section className="py-24 bg-gradient-to-b from-teal/5 to-transparent dark:from-slate-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-center mb-16 text-slate-800 dark:text-white">Client Love</h2>
          <div className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="min-w-[85vw] md:min-w-[400px] snap-center bg-white dark:bg-card-dark p-10 rounded-[2rem] shadow-soft hover:shadow-xl transition-shadow duration-300 relative border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="absolute -top-6 left-10 w-14 h-14 bg-cta-gradient rounded-full flex items-center justify-center text-white text-3xl font-serif shadow-lg shadow-purple-500/30">"</div>
                  <div className="flex gap-1 mb-6 pt-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-8 italic text-lg leading-relaxed">"{t.comment}"</p>
                </div>
                <div className="flex items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-teal/20" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-base">{t.name}</div>
                    <div className="text-sm text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Product Recommendation Banner - Keep Glow Going */}
      {/* Background updated to match Teal/Purple theme */}
      <section className="py-20 bg-gradient-to-r from-teal-900 via-purple-900 to-indigo-900 text-white overflow-hidden relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 animate-pulse"></div>
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-500/30 rounded-full blur-3xl"></div>
         
         <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
           <div className="text-center md:text-left">
             <div className="flex items-center justify-center md:justify-start gap-2 text-teal-200 mb-2">
                <Heart className="fill-teal-200" size={20} />
                <span className="uppercase tracking-widest text-sm font-bold">Self Care</span>
             </div>
             <h3 className="text-4xl md:text-5xl font-bold font-display mb-4 text-white">Keep the Glow Going</h3>
             <p className="text-teal-100/90 max-w-xl text-lg leading-relaxed">Get personalized product recommendations based on your service history. Our smart system selects the best care for you.</p>
           </div>
           
           {/* Hydrating Serum Kit Block with Matching Color */}
           <div onClick={handleProductView} className="bg-gradient-to-br from-white/10 to-purple-500/20 backdrop-blur-xl rounded-2xl p-6 flex gap-6 items-center border border-white/20 shadow-2xl max-w-md w-full hover:bg-white/15 transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-teal-900 font-bold shadow-lg group-hover:scale-110 transition-transform">Rx</div>
              <div className="flex-grow">
                <div className="text-xs text-teal-200 uppercase tracking-wider font-bold mb-1">Your Perfect Match</div>
                <div className="font-bold text-xl mb-1 text-white">Hydrating Serum Kit</div>
                <div className="text-sm text-teal-100">Rejuvenate overnight</div>
              </div>
              <Button variant="secondary" className="!py-2 !px-4 !text-sm whitespace-nowrap !bg-white !text-teal-800 !border-none hover:!bg-teal-50 shadow-lg pointer-events-none">View</Button>
           </div>
         </div>
      </section>

      {/* Map is handled in Layout.tsx */}
    </>
  );
};