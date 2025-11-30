import { Service, Stylist, Testimonial } from './types';

export const COMPANY_DETAILS = {
  name: "Page 3 La' Beige",
  address: "8-2-293/82/A/271/102, Apurupa BDR Road No 10 Jubilee Hills, Opp to Diamond, Next to zero 40, above ICICI bank, Hyderabad, Telangana 500033",
  phone: "+91 98765 43210",
  email: "bookings@labeigesalon.com",
  // Using JSONPlaceholder for reliable demo success responses (prevents 'Failed to fetch')
  webhookUrl: "https://jsonplaceholder.typicode.com/posts"
};

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: "Signature HydraFacial",
    description: "Deep cleansing, exfoliation, extraction, hydration and antioxidant protection for a radiant glow.",
    price: "₹4,500",
    duration: "60 min",
    category: "skin",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 's2',
    name: "Keratin Hair Treatment",
    description: "Smoothing therapy that eliminates frizz and improves hair health, leaving hair shiny and manageable.",
    price: "₹6,000",
    duration: "120 min",
    category: "hair",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 's3',
    name: "Bridal Makeup Package",
    description: "Complete bridal look including trial, hair styling, draping, and premium airbrush makeup.",
    price: "₹25,000",
    duration: "180 min",
    category: "makeup",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 's4',
    name: "Aromatherapy Massage",
    description: "Relaxing full body massage using essential oils to reduce stress and improve circulation.",
    price: "₹3,200",
    duration: "90 min",
    category: "spa",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 's5',
    name: "Creative Hair Coloring",
    description: "Balayage, Ombre, or Global color by expert colorists using ammonia-free products.",
    price: "₹5,500",
    duration: "150 min",
    category: "hair",
    image: "https://images.unsplash.com/photo-1595476103518-3c8ad0299a31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 's6',
    name: "Luxury Manicure & Pedicure",
    description: "Complete nail care with scrub, mask, hot towel, and gel polish application.",
    price: "₹2,000",
    duration: "75 min",
    category: "spa",
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export const STYLISTS: Stylist[] = [
  {
    id: 'st1',
    name: "Aarav Mehta",
    designation: "Senior Hair Director",
    specializations: ["Creative Cut", "Balayage", "Styling"],
    bio: "With over 10 years of experience in London and Mumbai, Aarav transforms hair into art using precision cutting techniques.",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1537368910025-bc005caeb1f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    portfolio: [
        "https://images.unsplash.com/photo-1582095133179-bfd08d2fc6b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
        "https://images.unsplash.com/photo-1620331313123-6e40501195aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 'st2',
    name: "Priya Sharma",
    designation: "Lead Esthetician",
    specializations: ["HydraFacial", "Anti-Aging", "Chemical Peels"],
    bio: "Priya specializes in skin rejuvenation and personalized skincare routines for glowing, healthy skin.",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    portfolio: [
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
        "https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 'st3',
    name: "Zara Khan",
    designation: "Celebrity Makeup Artist",
    specializations: ["Bridal", "Editorial", "Airbrush"],
    bio: "Zara has worked with top models and brides, creating flawless, long-lasting looks that photograph beautifully.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    portfolio: [
        "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
        "https://images.unsplash.com/photo-1455686950540-8b07e6605382?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 'st4',
    name: "Rohan Verma",
    designation: "Hair Stylist",
    specializations: ["Men's Grooming", "Fades", "Beard Styling"],
    bio: "Expert in modern men's cuts and grooming, Rohan brings precision and style to every gentleman's appointment.",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    portfolio: [
        "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1593702295094-aea8c5c13d99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 'st5',
    name: "Elena Rodriguez",
    designation: "Nail Artist",
    specializations: ["Nail Art", "Gel Extensions", "Manicure"],
    bio: "Elena's intricate nail art designs are famous across the city. She turns nails into miniature canvases.",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1595956553066-fe2428f59218?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    portfolio: [
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522337360705-2b1d8d775347?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: "Sanya R.",
    role: "Regular Client",
    comment: "The best salon experience in Jubilee Hills. The ambiance is so calming and the staff is incredibly professional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 't2',
    name: "Vikram D.",
    role: "Actor",
    comment: "Aarav is a magician with hair. I wouldn't trust anyone else with my look. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 't3',
    name: "Meera K.",
    role: "Bride",
    comment: "My bridal makeup was exactly what I dreamed of. Natural, glowing, and lasted all night!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  }
];