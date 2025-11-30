export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: 'hair' | 'skin' | 'spa' | 'makeup';
  image: string;
}

export interface Stylist {
  id: string;
  name: string;
  designation: string;
  specializations: string[];
  bio: string;
  rating: number;
  image: string;
  portfolio: string[]; // URLs of before/after
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  image: string;
}

export interface BookingFormData {
  stylistId: string;
  serviceId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

export enum BookingStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}