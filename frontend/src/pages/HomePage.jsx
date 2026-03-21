import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { getProfileDownloadUrl } from '../lib/api';

const slides = [
  {
    image: 'https://images.pexels.com/photos/36091328/pexels-photo-36091328.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    headline: 'GlobalAgri Commodities is an international commodity trading house dealing with agricultural cash-crops.',
    subtext: 'Specializing in merchandising of bulk and containerized shipments of agri-commodities, such as: Grains & Feeds, Oilseeds, Pulses & Beans, Rice, Sugar and Coffee.',
  },
  {
    image: 'https://images.pexels.com/photos/5732561/pexels-photo-5732561.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    headline: 'Sourcing agricultural commodities from less accessible origins to high demand markets.',
    subtext: 'Our principal expertise are mainly with a strong origination and sourcing capabilities in Black Sea region, Europe, Americas and Africa with a niche focus on the Middle East, Asia and African countries.',
  },
  {
    image: 'https://images.pexels.com/photos/1211787/pexels-photo-1211787.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    headline: 'We are a long-term partner in global agri-commodity markets acting as a bridge between suppliers and buyers worldwide.',
    subtext: 'In view of our wealth of experience in agri-commodities trading, the experience gained enable us to perform in a steadfast manner regardless of the challenges in market conditions.',
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 68px)', minHeight: '500px' }}>
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.3) 100%)' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-white leading-tight tracking-tight">
                {slides[currentSlide].headline}
              </h1>
              <p className="mt-5 text-sm sm:text-base text-white/70 leading-relaxed max-w-xl mx-auto">
                {slides[currentSlide].subtext}
              </p>
              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-8 font-medium shadow-lg hover:shadow-xl transition-all"
                  style={{ background: '#e67e22', color: 'white' }}
                  data-testid="hero-discover-us-button"
                >
                  <Link to="/about/who-we-are">Discover Us</Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === currentSlide ? 'scale-110' : 'opacity-50 hover:opacity-75'
                }`}
                style={{ background: i === currentSlide ? '#e67e22' : 'rgba(255,255,255,0.7)' }}
                data-testid={`hero-dot-${i}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
