import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Handshake, Award, Shield } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import PageHero from '../components/PageHero';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/FadeIn';

const values = [
  { icon: Shield, title: 'Integrity', desc: 'We honor our commitments and communicate openly.' },
  { icon: Award, title: 'Expertise', desc: 'We combine market intelligence with operational excellence.' },
  { icon: Handshake, title: 'Partnership', desc: 'We build relationships, not just transactions.' },
];

const leaders = [
  {
    name: 'Andreas Müller',
    role: 'CEO & Founder',
    bio: 'Over 20 years of experience in international commodity trading, with deep expertise in European and Black Sea grain markets. Previously held senior trading positions at major commodity houses.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Sarah Chen',
    role: 'Head of Trading, Asia-Pacific',
    bio: '15 years in agricultural commodity trading and risk management across Asian markets. Specializes in oilseeds and feed ingredients for the Southeast Asian market.',
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Omar Al-Rashid',
    role: 'Head of Operations, Middle East & Africa',
    bio: 'Extensive experience in commodity logistics, chartering, and trade finance across MENA and East African markets. Based in Dubai overseeing regional operations.',
    image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Maria Santos',
    role: 'Head of Risk & Compliance',
    bio: 'Former risk manager at a global trading firm, specializing in commodity derivatives, counterparty risk assessment, and regulatory compliance frameworks.',
    image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        title="About GlobalAgri Commodities"
        subtitle="An international trading company focused on agricultural raw materials, connecting reliable origins with demanding destination markets."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* Who we are */}
      <section className="ga-section" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <div>
                <Badge variant="outline" className="mb-4 text-xs" style={{ borderColor: 'rgba(217,164,65,0.4)', color: 'var(--ga-gold-2)' }}>
                  Who We Are
                </Badge>
                <h2 className="h-serif text-2xl sm:text-3xl font-semibold tracking-tight mb-6" style={{ color: 'var(--ga-navy)' }}>
                  Connecting producers and buyers across the globe
                </h2>
                <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--ga-muted)' }}>
                  <p>
                    GlobalAgri Commodities is an international trading company focused on agricultural raw materials. We connect producers, exporters, and industrial buyers through disciplined risk management, robust logistics, and transparent communication.
                  </p>
                  <p>
                    Our team brings deep experience in grains, feedstuff, pulses, oilseeds, rice, sugar, and coffee, serving industrial buyers, traders, and food manufacturers across multiple regions.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Shipping port"
                  className="w-full h-64 lg:h-80 object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="ga-section" style={{ background: 'var(--ga-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-4 text-xs" style={{ borderColor: 'rgba(217,164,65,0.4)', color: 'var(--ga-gold-2)' }}>
                <Target className="w-3 h-3 mr-1" /> Our Vision
              </Badge>
              <h2 className="h-serif text-2xl sm:text-3xl font-semibold tracking-tight mb-6" style={{ color: 'var(--ga-navy)' }}>
                A trusted, agile partner in global food and feed supply chains
              </h2>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--ga-muted)' }}>
                To be a trusted, agile partner in global food and feed supply chains, creating long-term value for all stakeholders through disciplined trading, transparent operations, and sustainable practices.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="ga-section" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="h-serif text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: 'var(--ga-navy)' }}>Our Values</h2>
            </div>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <FadeInItem key={v.title}>
                  <Card className="border h-full" style={{ borderColor: 'var(--ga-border)', borderRadius: 'var(--ga-radius-md)' }}>
                    <CardContent className="p-6 lg:p-8">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(11,60,93,0.08)' }}>
                        <Icon className="w-6 h-6" style={{ color: 'var(--ga-navy)' }} />
                      </div>
                      <h3 className="h-serif text-lg font-semibold mb-3" style={{ color: 'var(--ga-navy)' }}>{v.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--ga-muted)' }}>{v.desc}</p>
                    </CardContent>
                  </Card>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* Leadership */}
      <section className="ga-section" style={{ background: 'var(--ga-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="h-serif text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: 'var(--ga-navy)' }}>Leadership</h2>
              <p className="mt-3 text-sm sm:text-base" style={{ color: 'var(--ga-muted)' }}>
                Experienced professionals driving value across global commodity markets
              </p>
            </div>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.map((leader) => (
              <FadeInItem key={leader.name}>
                <Card className="border overflow-hidden h-full" style={{ borderColor: 'var(--ga-border)', borderRadius: 'var(--ga-radius-md)' }}>
                  <div className="aspect-square overflow-hidden">
                    <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-base" style={{ color: 'var(--ga-navy)' }}>{leader.name}</h3>
                    <p className="text-xs font-medium mt-1 mb-3" style={{ color: 'var(--ga-gold-2)' }}>{leader.role}</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--ga-muted)' }}>{leader.bio}</p>
                  </CardContent>
                </Card>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: 'var(--ga-navy)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="h-serif text-2xl sm:text-3xl font-semibold text-white tracking-tight">Want to work with us?</h2>
            <p className="mt-3 text-white/70 max-w-xl mx-auto">Get in touch to discuss how we can support your commodity needs.</p>
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
