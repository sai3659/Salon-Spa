import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ServicesPage } from './pages/ServicesPage';
import { StylistsPage } from './pages/StylistsPage';
import { StylistProfilePage } from './pages/StylistProfilePage';
import { BookingPage } from './pages/BookingPage';
import { GalleryPage } from './pages/GalleryPage';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/stylists" element={<StylistsPage />} />
          <Route path="/stylists/:id" element={<StylistProfilePage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;