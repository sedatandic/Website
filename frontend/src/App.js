import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CommoditiesPage from './pages/CommoditiesPage';
import PartnersPage from './pages/PartnersPage';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import JobDetailPage from './pages/JobDetailPage';
import InsightsPage from './pages/InsightsPage';
import InsightDetailPage from './pages/InsightDetailPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--ga-bg)' }}>
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/:tab" element={<AboutPage />} />
            <Route path="/commodities" element={<CommoditiesPage />} />
            <Route path="/commodities/:tab" element={<CommoditiesPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/careers/:slug" element={<JobDetailPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/insights/:id" element={<InsightDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster position="top-right" richColors />
    </Router>
  );
}

export default App;
