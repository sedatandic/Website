import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Ship, BarChart3, Globe, Shield, Wheat, Leaf, Briefcase, ChevronRight, Coffee, Droplets, CandyCane } from 'lucide-react';
import { Button } from '../components/ui/button';
import { getProfileDownloadUrl } from '../lib/api';

/* ─────── Hero Slides (Sucden-inspired numbered carousel) ─────── */
const slides = [
  {
    image: 'https://images.pexels.com/photos/36091328/pexels-photo-36091328.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    action: 'Connects',
    headline: 'harvests to markets, reliably and responsibly.',
    subtext: 'An international commodity trading house specializing in merchandising of bulk and containerized shipments of agricultural cash-crops.',
  },
  {
    image: 'https://images.pexels.com/photos/5732561/pexels-photo-5732561.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    action: 'Sources',
    headline: 'agricultural commodities from origins to demand markets.',
    subtext: 'Strong origination and sourcing capabilities in the Black Sea region, Europe, Americas and Africa with a niche focus on the Middle East, Asia and African countries.',
  },
  {
    image: 'https://images.pexels.com/photos/1211787/pexels-photo-1211787.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    action: 'Delivers',
    headline: 'with discipline, integrity and long-term commitment.',
    subtext: 'Our wealth of experience in agri-commodities trading enables us to perform in a steadfast manner regardless of the challenges in market conditions.',
  },
];

/* ─────── Counter Stats (Quadra-inspired) ─────── */
const stats = [
  { value: 250, suffix: 'M+', prefix: '$', label: 'USD Annual Turnover', icon: BarChart3 },
  { value: 500, suffix: 'K+', prefix: '', label: 'MTS Annual Volume', icon: Ship },
  { value: 25, suffix: '+', prefix: '', label: 'Countries Served', icon: Globe },
  { value: 25, suffix: '+', prefix: '', label: 'Commodities Traded', icon: Wheat },
];

function AnimatedCounter({ value, suffix, prefix, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const stepTime = Math.max(Math.floor((duration * 1000) / end), 16);
    const increment = Math.ceil(end / (duration * 1000 / stepTime));
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ─────── Commodities Showcase (Mediterra-inspired) ─────── */
const commodities = [
  { name: 'GRAINS & FEEDS', slug: 'grains-feeds', icon: Wheat, image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'OILSEEDS', slug: 'oilseeds', icon: Droplets, image: 'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'PULSES & BEANS', slug: 'pulses-beans', icon: Leaf, image: 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'SUGAR & RICE', slug: 'sugar-rice', icon: CandyCane, image: 'https://images.pexels.com/photos/2523650/pexels-photo-2523650.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'COFFEE', slug: 'coffee', icon: Coffee, image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

/* ─────── Value Chain (Agrocorp-inspired) ─────── */
const valueChain = [
  { step: '01', title: 'Origination & Sourcing', desc: 'Direct relationships with producers and exporters across key growing regions.', icon: Wheat },
  { step: '02', title: 'Risk Management', desc: 'Structured contracts, hedging strategies and disciplined execution.', icon: Shield },
  { step: '03', title: 'Logistics & Shipping', desc: 'Vessel chartering, documentation and freight management door-to-door.', icon: Ship },
  { step: '04', title: 'Distribution & Delivery', desc: 'Timely delivery to industrial buyers, millers, feed producers and traders.', icon: Globe },
];

/* ─────── Section Cards (Sucden-inspired hover cards) ─────── */
const sectionCards = [
  { title: 'About GlobalAgri', desc: 'An international trading firm and supply chain manager of agricultural products.', link: '/about/who-we-are', icon: Briefcase },
  { title: 'Our Commodities', desc: 'Grains, feeds, oilseeds, pulses, sugar, rice and coffee from key origins.', link: '/commodities/at-a-glance', icon: Wheat },
  { title: 'Our Partners', desc: 'Working with leading inspection, shipping and trade finance partners globally.', link: '/partners', icon: Shield },
  { title: 'Market Insights', desc: 'Monitoring global fundamentals, freight and policy to support informed decisions.', link: '/insights', icon: BarChart3 },
  { title: 'Careers', desc: 'Join a dynamic team at the intersection of global agriculture, trade and logistics.', link: '/careers', icon: Leaf },
  { title: 'Contact Us', desc: 'Tell us about your requirements and our team will respond promptly.', link: '/contact', icon: Globe },
];

/* ─────── Partners marquee ─────── */
const partnerNames = ['SGS', 'Maersk', 'Intertek', 'CMA CGM', 'MSC', 'Bureau Veritas', 'GAFTA', 'FOSFA', 'GPC', 'Standard Chartered'];

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
    <div>
      {/* ═══════ HERO CAROUSEL ═══════ */}
      <section className="relative w-full" style={{ height: 'calc(100vh - 68px)', minHeight: '560px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img src={slides[currentSlide].image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.5) 100%)' }} />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
                <div className="mb-4">
                  <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#e67e22' }}>GlobalAgri</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                  <span style={{ color: '#e67e22' }}>{slides[currentSlide].action}</span>{' '}
                  {slides[currentSlide].headline}
                </h1>
                <p className="mt-6 text-base sm:text-lg text-white/65 leading-relaxed max-w-2xl mx-auto">
                  {slides[currentSlide].subtext}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Button asChild size="lg" className="rounded-full px-8 font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5" style={{ background: '#e67e22', color: 'white' }} data-testid="hero-discover-us-button">
                    <Link to="/about/who-we-are">Discover Us</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full px-8 font-medium border-white/25 text-white hover:bg-white/10 hover:text-white" data-testid="pdf-download-company-profile">
                    <a href={getProfileDownloadUrl()} target="_blank" rel="noopener noreferrer">Company Profile</a>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Numbered dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-5 items-center">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)} className="flex items-center gap-2 group transition-all" data-testid={`hero-dot-${i}`}>
                  <span className={`text-xs font-mono font-bold transition-colors ${i === currentSlide ? 'text-[#e67e22]' : 'text-white/40 group-hover:text-white/70'}`}>0{i + 1}</span>
                  <div className="h-[2px] transition-all duration-500" style={{ width: i === currentSlide ? '40px' : '20px', background: i === currentSlide ? '#e67e22' : 'rgba(255,255,255,0.25)' }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ ANIMATED STATS (Quadra-inspired) ═══════ */}
      <section style={{ background: '#0b1220' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center">
                  <Icon className="w-5 h-5 mx-auto mb-3" style={{ color: '#e67e22' }} />
                  <div className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-none tracking-tight">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <div className="mt-2 h-px w-12 mx-auto" style={{ background: 'rgba(230,126,34,0.4)' }} />
                  <div className="mt-3 text-xs sm:text-sm font-medium tracking-wide uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ ABOUT TEASER (Mediterra-inspired: image + text) ═══════ */}
      <section className="py-20 lg:py-24" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Left - Image composition */}
            <div className="relative flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <img src="https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Grain silos" className="w-full h-full object-cover" />
                </div>
                {/* Small accent circle */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img src="https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=200" alt="Wheat" className="w-full h-full object-cover" />
                </div>
                {/* Decorative dots */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ background: '#e67e22' }} />
                  <div className="w-4 h-4 rounded-full" style={{ background: 'rgba(230,126,34,0.3)' }} />
                </div>
              </div>
            </div>

            {/* Right - Text */}
            <div>
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#e67e22' }}>About Us</span>
              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-snug" style={{ color: '#0b1220' }}>
                Your reliable business partner in global agricultural commodity trade.
              </h2>
              <p className="mt-5 text-sm sm:text-base leading-relaxed" style={{ color: '#6b7280' }}>
                GlobalAgri Commodities, as a result of its trade policy based on trust, principled and ethical work, has achieved a respectable position in international markets. The combined in-depth trading experience coupled with strong, reliable relationships fostered over the years are the main strengths of the company.
              </p>
              <div className="mt-8">
                <Button asChild className="rounded-full px-7 font-medium" style={{ background: '#0b1220', color: 'white' }}>
                  <Link to="/about/who-we-are">Discover <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ COMMODITIES SHOWCASE (Mediterra-inspired cards) ═══════ */}
      <section className="py-16 lg:py-20" style={{ background: '#f8f9fb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: '#0b1220' }}>
              <span className="italic" style={{ color: '#e67e22' }}>OUR</span> COMMODITIES
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {commodities.map((c, i) => {
              const Icon = c.icon;
              return (
                <Link
                  key={i}
                  to={`/commodities/${c.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  data-testid={`commodity-showcase-${c.slug}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {/* Icon badge at bottom-center (Mediterra style) */}
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10" style={{ background: '#e67e22' }}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="pt-8 pb-5 px-3 text-center">
                    <span className="text-xs sm:text-sm font-bold tracking-wide" style={{ color: '#0b1220' }}>{c.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Button asChild className="rounded-full px-7 font-medium" style={{ background: '#e67e22', color: 'white' }}>
              <Link to="/commodities/at-a-glance">Discover <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════ SUSTAINABILITY BANNER (Mediterra-inspired full-width) ═══════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '400px' }}>
        <img src="https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=1260" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(11,60,40,0.85) 0%, rgba(11,60,40,0.6) 60%, rgba(11,60,40,0.4) 100%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="max-w-xl">
            <span className="text-xs font-mono tracking-widest uppercase text-white/60">Sustainability</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white leading-snug">
              Trading today with tomorrow in mind.
            </h2>
            <p className="mt-5 text-base text-white/70 leading-relaxed">
              We work with suppliers who share our commitment to traceability, responsible sourcing, and reduced environmental impact. From farm-level programs to transparent documentation, we aim to make every shipment count.
            </p>
            <div className="mt-8">
              <Button asChild className="rounded-full px-7 font-medium" style={{ background: 'white', color: '#0b1220' }}>
                <Link to="/about/strengths">Discover <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ VALUE CHAIN (Agrocorp-inspired) ═══════ */}
      <section className="py-16 lg:py-20" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#e67e22' }}>How We Operate</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: '#0b1220' }}>End-to-End Trading Model</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {valueChain.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="relative p-8 group" style={{ borderRight: i < valueChain.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                  <div className="text-[4rem] font-bold leading-none absolute top-4 right-6 select-none" style={{ color: 'rgba(230,126,34,0.08)' }}>{item.step}</div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors group-hover:bg-[#e67e22]/10" style={{ background: '#f3f4f6' }}>
                      <Icon className="w-5 h-5" style={{ color: '#e67e22' }} />
                    </div>
                    <h3 className="font-bold text-base mb-2" style={{ color: '#0b1220' }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{item.desc}</p>
                  </div>
                  {i < valueChain.length - 1 && (
                    <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-7 h-7 rounded-full items-center justify-center" style={{ background: '#ffffff', border: '2px solid #e5e7eb' }}>
                      <ChevronRight className="w-3.5 h-3.5" style={{ color: '#e67e22' }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ SECTION CARDS (Sucden / Quadra inspired) ═══════ */}
      <section className="py-16 lg:py-20" style={{ background: '#f8f9fb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sectionCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Link key={i} to={card.link} className="group relative bg-white rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style={{ borderColor: '#e5e7eb' }} data-testid={`section-card-${i}`}>
                  <div className="p-7">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors group-hover:bg-[#e67e22]/10" style={{ background: '#f3f4f6' }}>
                        <Icon className="w-5 h-5 transition-colors group-hover:text-[#e67e22]" style={{ color: '#374151' }} />
                      </div>
                      <ArrowRight className="w-4 h-4 transition-all opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" style={{ color: '#e67e22' }} />
                    </div>
                    <h3 className="font-bold text-base mb-2 transition-colors group-hover:text-[#e67e22]" style={{ color: '#0b1220' }}>{card.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{card.desc}</p>
                    <div className="mt-5 text-xs font-semibold inline-flex items-center gap-1 transition-all group-hover:gap-2" style={{ color: '#e67e22' }}>Learn more <ArrowRight className="w-3 h-3" /></div>
                  </div>
                  <div className="h-[3px] w-0 group-hover:w-full transition-all duration-300" style={{ background: '#e67e22' }} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ PARTNERS MARQUEE (Mediterra-inspired auto-scroll) ═══════ */}
      <section className="py-14" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight" style={{ color: '#0b1220' }}>
              <span className="italic" style={{ color: '#e67e22' }}>OUR</span> PARTNERS
            </h2>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee gap-12 items-center">
            {[...partnerNames, ...partnerNames].map((name, i) => (
              <div key={i} className="flex-shrink-0 px-8 py-4 rounded-xl border" style={{ borderColor: '#e5e7eb', minWidth: '180px' }}>
                <div className="text-center font-bold text-sm" style={{ color: '#374151' }}>{name}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* ═══════ FOUNDER QUOTE (Agrocorp-inspired) ═══════ */}
      <section className="py-16 lg:py-20" style={{ background: '#0b1220' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-px mx-auto mb-8" style={{ background: '#e67e22' }} />
          <blockquote className="text-xl sm:text-2xl lg:text-[1.65rem] font-medium text-white leading-relaxed italic">
            "We believe strongly in fair trade and always endeavor to deliver on our contractual promises. The combined in-depth trading experience coupled with strong, reliable relationships fostered over the years are the main strengths of the company."
          </blockquote>
          <div className="mt-8">
            <div className="text-sm font-bold text-white">Leadership Team</div>
            <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>GlobalAgri Commodities</div>
          </div>
        </div>
      </section>

      {/* ═══════ CTA BAND ═══════ */}
      <section className="py-14" style={{ background: '#e67e22' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Ready to discuss your requirements?</h2>
          <p className="mt-3 text-base text-white/80 max-w-xl mx-auto">Whether you need grains, oilseeds, sugar, or coffee — our trading desk is ready to help.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 font-medium hover:-translate-y-0.5" style={{ background: '#0b1220', color: 'white' }}>
              <Link to="/contact">Contact Our Team</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 font-medium border-white/40 text-white hover:bg-white/10 hover:text-white">
              <Link to="/commodities/at-a-glance">Browse Commodities</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
