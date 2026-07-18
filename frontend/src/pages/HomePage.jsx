import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Ship, BarChart3, Globe, Wheat, Shield, ChevronRight, CircleDollarSign, Boxes, Sprout, Building2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

/* ─── Hero Slides ─── */
const slides = [
  {
    image: 'https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
    action: 'Connecting',
    headline: 'Qatar to the global agricultural value chain\nand supporting long-term national food security goals.',
    subtext: "Qatar\u2019s premier integrated agri\u2011supply\u2011chain manager and global trading platform, defining the national standard for seamless, end\u2011to\u2011end commodity flows between producers and consumers worldwide.",
  },
  {
    image: 'https://customer-assets-wrfwihn1.emergentagent.net/job_a46d9f4e-718c-4add-95f0-4ba36a75bba8/artifacts/53os6rjt_image.png',
    action: 'Grounded',
    headline: 'in discipline, integrity, and proven\noperational excellence across global markets.',
    subtext: 'Supported by a team with 25+ years of global trading experience, we execute every commitment\nwith precision — price, quality, and timing delivered as promised.',
  },
  {
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
    action: 'Partnerships',
    headline: "built on trust, long-term alignment,\nand Qatar's Food Security Vision 2030.",
    subtext: 'From inland grain origins to major global port terminals, we cultivate relationships that reinforce\nnational food resilience and support sustainable international supply chains.',
  },
];

/* ─── Stats ─── */
const stats = [
  { value: 250, suffix: 'M+', prefix: '', unit: 'USD', label: 'Annual Turnover', icon: CircleDollarSign },
  { value: 600, suffix: 'K+', prefix: '', unit: 'MTS', label: 'Annual Trade Volume', icon: Boxes },
  { value: 200, suffix: '+', prefix: '', unit: 'VESSELS', label: 'Chartered Annually', icon: Ship },
  { value: 25, suffix: '+', prefix: '', unit: 'COMMODITIES', label: 'Traded Globally', icon: Sprout },
  { value: 22, suffix: '+', prefix: '', unit: 'DESTINATION', label: 'Countries Served', icon: Globe },
  { value: 4, suffix: '', prefix: '', unit: 'OFFICES & STAFF', label: 'in 3 Countries', icon: Building2 },
];

function AnimatedCounter({ value, suffix, prefix, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const step = Math.max(Math.floor((duration * 1000) / end), 16);
    const inc = Math.ceil(end / (duration * 1000 / step));
    const t = setInterval(() => {
      start += inc;
      if (start >= end) { setCount(end); clearInterval(t); } else { setCount(start); }
    }, step);
    return () => clearInterval(t);
  }, [isInView, value, duration]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ─── Commodities ─── */
const commodities = [
  { name: 'Grains & Feeds', path: '/commodities/grains-feeds', image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Oilseeds', path: '/commodities/oilseeds', image: 'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Pulses & Beans', path: '/commodities/pulses-beans', image: 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Sugar & Rice', path: '/commodities/sugar-rice', image: 'https://images.pexels.com/photos/2523650/pexels-photo-2523650.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Coffee', path: '/commodities/coffee', image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

/* ─── Differentiators ─── */
const differentiators = [
  { title: 'Multi-Origin Sourcing', desc: 'Direct procurement across Black Sea, Americas, Africa and Asia — reducing single-origin risk and optimizing landed costs.', icon: Globe },
  { title: 'Risk Management', desc: 'Stringent counterparty assessment, mark-to-market monitoring, and hedging strategies protect every transaction.', icon: Shield },
  { title: 'Freight & Logistics', desc: 'Vessel chartering, containerized shipments, and end-to-end documentation from origin to destination.', icon: Ship },
  { title: 'Trade Compliance', desc: 'All operations adhere to GAFTA, FOSFA and ICC regulations, ensuring legal certainty and global recognition.', icon: BarChart3 },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [insights, setInsights] = useState([]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 4750);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
    fetch(`${backendUrl}/api/insights`)
      .then((r) => r.json())
      .then((d) => setInsights(Array.isArray(d) ? d.slice(0, 3) : []))
      .catch(() => setInsights([]));
  }, []);

  return (
    <div className="flex flex-col flex-1">

      {/* ══════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative w-full flex-1" style={{ minHeight: '420px' }} data-testid="hero-section">
        <AnimatePresence mode="wait">
          <motion.div key={currentSlide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0">
            <img src={slides[currentSlide].image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(11,18,32,0.6) 0%, rgba(11,18,32,0.42) 50%, rgba(11,18,32,0.55) 100%)' }} />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <AnimatePresence mode="wait">
              <motion.div key={currentSlide} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 1 }} className="max-w-7xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-white leading-[1.14] tracking-tight whitespace-pre-line" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
                  <span style={{ color: '#8A1538', textShadow: '0 1px 3px rgba(0,0,0,0.55), 0 2px 14px rgba(0,0,0,0.75)' }}>{slides[currentSlide].action}</span>{' '}{slides[currentSlide].headline}
                </h1>
                <p className="mt-6 text-base sm:text-lg italic text-white leading-relaxed max-w-4xl mx-auto whitespace-pre-line" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>{slides[currentSlide].subtext}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Button asChild size="lg" className="rounded-full px-8 font-medium shadow-lg transition-all hover:-translate-y-0.5" style={{ background: '#8A1538', color: 'white' }} data-testid="hero-discover-us-button">
                    <Link to="/about/who-we-are">Discover Us</Link>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
              {slides.map((s, i) => (
                <button key={s.action} onClick={() => setCurrentSlide(i)} className="group" data-testid={`hero-dot-${i}`}>
                  <div className="h-[3px] rounded-full transition-all duration-500" style={{ width: i === currentSlide ? '32px' : '16px', background: i === currentSlide ? '#8A1538' : 'rgba(255,255,255,0.3)' }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. STATS
      ══════════════════════════════════════════════════ */}
      <section style={{ background: '#fdf2f5', borderBottom: '1px solid #f3d6df' }}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
              <div key={s.label} className="flex flex-row items-center justify-center gap-3 px-3 py-2 lg:border-l lg:first:border-l-0" style={{ borderColor: '#f0cdd8' }}>
                <Icon className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" strokeWidth={1.5} style={{ color: '#8A1538' }} data-testid={`stat-icon-${i}`} />
                <div className="flex flex-col items-center text-center gap-1">
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight leading-none" style={{ color: '#8A1538' }}>
                    {s.text ? s.text : <><AnimatedCounter value={s.value} suffix={s.suffix} prefix={s.prefix} /><span className="text-sm sm:text-base font-semibold ml-1 align-baseline">{s.unit}</span></>}
                  </div>
                  <div className="text-[11px] leading-tight font-semibold tracking-wide uppercase" style={{ color: '#6b7280' }}>{s.label}</div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA removed
      ══════════════════════════════════════════════════ */}

    </div>
  );
}
