import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Shield, FileCheck, Handshake, Globe, Scale } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import PageHero from '../components/PageHero';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/FadeIn';

const commitments = [
  { icon: Leaf, title: 'Responsible Sourcing', desc: 'Preference for suppliers with traceability, good agricultural practices, and environmental stewardship programs.' },
  { icon: Shield, title: 'Quality & Food Safety', desc: 'Adherence to international standards and independent inspection protocols to ensure product integrity.' },
  { icon: Scale, title: 'Regulatory Compliance', desc: 'Sanctions screening, KYC procedures, and documentation aligned with destination market requirements.' },
  { icon: Handshake, title: 'Ethical Business Conduct', desc: 'Zero tolerance for bribery and corruption. All operations conducted with integrity and transparency.' },
  { icon: Globe, title: 'Environmental Awareness', desc: 'Working to reduce the environmental footprint of our supply chains through optimized logistics and partner selection.' },
  { icon: FileCheck, title: 'Documentation & Traceability', desc: 'Comprehensive trade documentation ensuring full traceability from origin to destination for every shipment.' },
];

export default function SustainabilityPage() {
  return (
    <div>
      <PageHero
        title="Sustainability & Compliance"
        subtitle="We believe responsible trading supports resilient supply chains and long-term value for all stakeholders."
        breadcrumbs={[{ label: 'Sustainability & Compliance' }]}
      />

      {/* Intro */}
      <section className="ga-section" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <Badge variant="outline" className="mb-4 text-xs" style={{ borderColor: 'rgba(217,164,65,0.4)', color: 'var(--ga-gold-2)' }}>
                  <Leaf className="w-3 h-3 mr-1" /> Our Approach
                </Badge>
                <h2 className="h-serif text-2xl sm:text-3xl font-semibold tracking-tight mb-4" style={{ color: 'var(--ga-navy)' }}>
                  Trading today with tomorrow in mind
                </h2>
                <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--ga-muted)' }}>
                  <p>
                    We work with suppliers who share our commitment to traceability, responsible sourcing, and reduced environmental impact. From farm-level programs to transparent documentation, we aim to make every shipment count—for our partners and for the planet.
                  </p>
                  <p>
                    Our sustainability approach is practical and incremental. We focus on measurable improvements in our supply chains while maintaining the commercial viability that enables long-term partnerships.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Sustainable farming"
                  className="w-full h-64 lg:h-80 object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Commitments grid */}
      <section className="ga-section" style={{ background: 'var(--ga-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="h-serif text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: 'var(--ga-navy)' }}>Our Commitments</h2>
              <p className="mt-3 text-sm sm:text-base" style={{ color: 'var(--ga-muted)' }}>
                Principles that guide every trade we execute
              </p>
            </div>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commitments.map((c) => {
              const Icon = c.icon;
              return (
                <FadeInItem key={c.title}>
                  <Card className="border h-full hover:shadow-md transition-shadow" style={{ borderColor: 'var(--ga-border)', borderRadius: 'var(--ga-radius-md)' }}>
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(11,60,93,0.08)' }}>
                        <Icon className="w-5 h-5" style={{ color: 'var(--ga-navy)' }} />
                      </div>
                      <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--ga-navy)' }}>{c.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--ga-muted)' }}>{c.desc}</p>
                    </CardContent>
                  </Card>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: 'var(--ga-navy)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="h-serif text-2xl sm:text-3xl font-semibold text-white">Questions about our compliance?</h2>
            <p className="mt-3 text-white/70 max-w-xl mx-auto">Our compliance team is available to discuss our policies and documentation standards.</p>
            <div className="mt-8">
              <Button asChild size="lg" className="rounded-full px-8" style={{ background: 'var(--ga-gold)', color: 'var(--ga-text)' }}>
                <Link to="/contact">Contact Us <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
