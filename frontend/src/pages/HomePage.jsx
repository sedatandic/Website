import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, BarChart3, Scale, Wheat, Leaf, Bean, Droplets, Coffee, CandyCane, Globe, TrendingUp, Download, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/FadeIn';
import { getInsights, getProfileDownloadUrl } from '../lib/api';

const commodities = [
  { name: 'Grains', slug: 'grains', icon: Wheat, desc: 'Wheat, corn, barley, and more for food and feed applications.' },
  { name: 'Feedstuff', slug: 'feedstuff', icon: Leaf, desc: 'Protein-rich feed ingredients tailored to livestock and aquaculture needs.' },
  { name: 'Pulses', slug: 'pulses', icon: Bean, desc: 'Beans, lentils, chickpeas, and peas sourced from key origins.' },
  { name: 'Oilseeds', slug: 'oilseeds', icon: Droplets, desc: 'Soybeans, sunflower seeds, rapeseed, and related products.' },
  { name: 'Rice', slug: 'rice', icon: Wheat, desc: 'Long-grain, medium-grain, and specialty rice varieties.' },
  { name: 'Sugar', slug: 'sugar', icon: CandyCane, desc: 'Raw and refined sugar for industrial users.' },
  { name: 'Coffee', slug: 'coffee', icon: Coffee, desc: 'Green coffee from major producing regions, tailored to roasters and traders.' },
];

const pillars = [
  { icon: Shield, title: 'Reliability', desc: 'Long-term relationships with producers, exporters, and logistics partners ensure consistent supply and execution.' },
  { icon: BarChart3, title: 'Risk Management', desc: 'Structured contracts, hedging strategies, and disciplined execution to protect both sides of the trade.' },
  { icon: Scale, title: 'Compliance & Integrity', desc: 'Aligned with international standards on quality, documentation, and sanctions compliance.' },
];

const hubs = [
  { name: 'Geneva', region: 'European HQ' },
  { name: 'Dubai', region: 'Middle East & Africa' },
  { name: 'Singapore', region: 'Asia-Pacific' },
  { name: 'Nairobi', region: 'East Africa' },
  { name: 'Sao Paulo', region: 'South America' },
  { name: 'Kyiv', region: 'Black Sea' },
];

export default function HomePage() {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    getInsights().then(res => setInsights(res.data.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '580px' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/4570835/pexels-photo-4570835.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Port terminal"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(11,60,93,0.78) 0%, rgba(11,60,93,0.62) 45%, rgba(11,60,93,0.82) 100%)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <FadeIn>
            <h1 className="h-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight max-w-3xl">
              Global reach. Local expertise. Trusted agricultural supply.
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 text-base sm:text-lg text-white/75 max-w-2xl leading-relaxed">
              We source, trade, and deliver grains, feedstuff, pulses, oilseeds, rice, sugar, and coffee to partners across the globe—securely, efficiently, and transparently.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 font-medium shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
                style={{ background: 'var(--ga-gold)', color: 'var(--ga-text)' }}
                data-testid="hero-primary-cta-button"
              >
                <Link to="/products">Explore Products</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 font-medium border-white/30 text-white hover:bg-white/10 hover:text-white hover:-translate-y-0.5 active:scale-[0.98]"
                data-testid="pdf-download-company-profile"
              >
                <a href={getProfileDownloadUrl()} target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-2" />
                  Download Company Profile
                </a>
              </Button>
            </div>
          </FadeIn>
          {/* Trust row */}
          <FadeIn delay={0.45}>
            <div className="mt-12 flex flex-wrap gap-6">
              {['Global network', 'Risk-managed logistics', 'Quality assurance', 'Compliance-first'].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--ga-gold)' }} />
                  {item}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Commodities Strip */}
      <section className="ga-section" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="h-serif text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: 'var(--ga-navy)' }}>
                Our Core Commodities
              </h2>
              <p className="mt-3 text-sm sm:text-base" style={{ color: 'var(--ga-muted)' }}>
                Seven product categories serving food and feed industries worldwide
              </p>
            </div>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {commodities.map((c) => {
              const Icon = c.icon;
              return (
                <FadeInItem key={c.slug}>
                  <Link to={`/products/${c.slug}`}>
                    <Card
                      className="group cursor-pointer border hover:shadow-lg hover:border-[color:rgba(11,60,93,0.35)] transition-shadow transition-colors duration-200 h-full"
                      style={{ borderColor: 'var(--ga-border)', borderRadius: 'var(--ga-radius-md)' }}
                      data-testid={`commodity-card-${c.slug}`}
                    >
                      <CardContent className="p-5">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--ga-surface-2)' }}>
                          <Icon className="w-5 h-5" style={{ color: 'var(--ga-navy)' }} />
                        </div>
                        <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--ga-navy)' }}>{c.name}</h3>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--ga-muted)' }}>{c.desc}</p>
                        <span className="text-xs font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: 'var(--ga-gold-2)' }}>
                          Explore <ArrowRight className="w-3 h-3" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* Why GlobalAgri Pillars */}
      <section className="ga-section" style={{ background: 'var(--ga-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="h-serif text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: 'var(--ga-navy)' }}>
                Why GlobalAgri
              </h2>
              <p className="mt-3 text-sm sm:text-base" style={{ color: 'var(--ga-muted)' }}>
                Three pillars that define how we operate
              </p>
            </div>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <FadeInItem key={p.title}>
                  <Card className="border h-full hover:shadow-lg transition-shadow duration-200" style={{ borderColor: 'var(--ga-border)', borderRadius: 'var(--ga-radius-md)' }}>
                    <CardContent className="p-6 lg:p-8">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(11,60,93,0.08)' }}>
                        <Icon className="w-6 h-6" style={{ color: 'var(--ga-navy)' }} />
                      </div>
                      <h3 className="h-serif text-lg font-semibold mb-3" style={{ color: 'var(--ga-navy)' }}>{p.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--ga-muted)' }}>{p.desc}</p>
                    </CardContent>
                  </Card>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* Global Presence Teaser */}
      <section className="ga-section" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <FadeIn>
              <div>
                <Badge variant="outline" className="mb-4 border-[color:rgba(217,164,65,0.4)] text-xs" style={{ color: 'var(--ga-gold-2)' }}>
                  <Globe className="w-3 h-3 mr-1" /> Global Network
                </Badge>
                <h2 className="h-serif text-2xl sm:text-3xl font-semibold tracking-tight mb-4" style={{ color: 'var(--ga-navy)' }}>
                  From origin to destination, we are on the ground
                </h2>
                <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: 'var(--ga-muted)' }}>
                  Our network spans key origination and destination markets across Europe, the Middle East, Asia, and Africa. Through strategic partnerships, storage facilities, and port access, we connect harvests to demand centers with precision.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full"
                  style={{ borderColor: 'var(--ga-navy)', color: 'var(--ga-navy)' }}
                >
                  <Link to="/global-presence">View global presence <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {hubs.map((hub) => (
                  <div
                    key={hub.name}
                    className="p-4 rounded-xl border"
                    style={{ background: 'var(--ga-surface-2)', borderColor: 'var(--ga-border)' }}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--ga-gold)' }} />
                      <span className="font-semibold text-sm" style={{ color: 'var(--ga-navy)' }}>{hub.name}</span>
                    </div>
                    <span className="text-xs" style={{ color: 'var(--ga-muted)' }}>{hub.region}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Sustainability Teaser */}
      <section className="ga-section" style={{ background: 'var(--ga-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <FadeIn>
              <div>
                <Badge variant="outline" className="mb-4 border-[color:rgba(217,164,65,0.4)] text-xs" style={{ color: 'var(--ga-gold-2)' }}>
                  <Leaf className="w-3 h-3 mr-1" /> Sustainability
                </Badge>
                <h2 className="h-serif text-2xl sm:text-3xl font-semibold tracking-tight mb-4" style={{ color: 'var(--ga-navy)' }}>
                  Trading today with tomorrow in mind
                </h2>
                <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: 'var(--ga-muted)' }}>
                  We work with suppliers who share our commitment to traceability, responsible sourcing, and reduced environmental impact. From farm-level programs to transparent documentation, we aim to make every shipment count.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Traceability', 'Quality & food safety', 'Regulatory compliance', 'Long-term partnerships'].map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs font-medium" style={{ background: 'var(--ga-surface-2)', color: 'var(--ga-navy)' }}>
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  asChild
                  variant="ghost"
                  className="px-0 font-medium"
                  style={{ color: 'var(--ga-navy)' }}
                >
                  <Link to="/sustainability">Learn more about our approach <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '16/10' }}>
                <img
                  src="https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Sustainable agriculture"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Insights Teaser */}
      <section className="ga-section" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-end justify-between mb-10">
              <div>
                <Badge variant="outline" className="mb-4 border-[color:rgba(217,164,65,0.4)] text-xs" style={{ color: 'var(--ga-gold-2)' }}>
                  <TrendingUp className="w-3 h-3 mr-1" /> Market Intelligence
                </Badge>
                <h2 className="h-serif text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: 'var(--ga-navy)' }}>
                  Market Insights
                </h2>
                <p className="mt-2 text-sm" style={{ color: 'var(--ga-muted)' }}>
                  Intelligence that informs every trade
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="hidden sm:inline-flex rounded-full"
                style={{ borderColor: 'var(--ga-navy)', color: 'var(--ga-navy)' }}
              >
                <Link to="/insights">View all insights <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((item, i) => (
              <FadeInItem key={item.id}>
                <Link to={`/insights/${item.slug || item.id}`}>
                  <Card
                    className="group cursor-pointer border overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full"
                    style={{ borderColor: 'var(--ga-border)', borderRadius: 'var(--ga-radius-md)' }}
                    data-testid={`insights-card-${i}`}
                  >
                    {item.image && (
                      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs" style={{ background: 'var(--ga-surface-2)', color: 'var(--ga-navy)' }}>
                          {item.category}
                        </Badge>
                        <span className="text-xs" style={{ color: 'var(--ga-muted)' }}>{item.read_time}</span>
                      </div>
                      <h3 className="font-semibold text-base mb-2 line-clamp-2" style={{ color: 'var(--ga-navy)' }}>{item.title}</h3>
                      <p className="text-sm line-clamp-2" style={{ color: 'var(--ga-muted)' }}>{item.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              </FadeInItem>
            ))}
          </FadeInStagger>
          <div className="mt-6 text-center sm:hidden">
            <Button
              asChild
              variant="outline"
              className="rounded-full"
              style={{ borderColor: 'var(--ga-navy)', color: 'var(--ga-navy)' }}
            >
              <Link to="/insights">View all insights <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-16 sm:py-20" style={{ background: 'var(--ga-navy)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="h-serif text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Ready to discuss your requirements?
            </h2>
            <p className="mt-3 text-base text-white/70 max-w-xl mx-auto">
              Whether you need grains, oilseeds, sugar, or coffee, our trading desk is ready to help.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 font-medium"
                style={{ background: 'var(--ga-gold)', color: 'var(--ga-text)' }}
              >
                <Link to="/contact">Contact Our Team</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 font-medium border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
