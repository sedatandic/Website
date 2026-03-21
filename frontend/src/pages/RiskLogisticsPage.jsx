import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Ship, FileText, BarChart3, Clock, Anchor } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import PageHero from '../components/PageHero';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/FadeIn';

const riskItems = [
  { icon: BarChart3, title: 'Price Risk Management', desc: 'We structure contracts and hedging strategies aligned with our clients\' risk appetite, using futures, options, and physical positions to manage price and basis risk.' },
  { icon: Shield, title: 'Counterparty Risk', desc: 'Rigorous counterparty assessment and credit management processes ensure the security of every transaction in our book.' },
  { icon: FileText, title: 'Contract Structuring', desc: 'Flexible contract terms including fixed-price, basis, and participation structures to meet diverse commercial requirements.' },
];

const logisticsSteps = [
  { icon: FileText, title: 'Contract & Documentation', desc: 'Trade confirmation, L/C coordination, and certificate management from day one.' },
  { icon: Ship, title: 'Chartering & Freight', desc: 'Vessel nomination, freight negotiation, and optimal route selection for each shipment.' },
  { icon: Clock, title: 'Loading & Inspection', desc: 'Coordination with port agents, surveyors, and independent inspectors at origin.' },
  { icon: Anchor, title: 'Transit & Monitoring', desc: 'Real-time shipment tracking and proactive communication throughout the voyage.' },
  { icon: FileText, title: 'Discharge & Delivery', desc: 'Destination coordination, customs clearance support, and quality reconciliation.' },
];

export default function RiskLogisticsPage() {
  return (
    <div>
      <PageHero
        title="Risk Management & Logistics"
        subtitle="Disciplined risk management and robust logistics execution across every trade."
        breadcrumbs={[{ label: 'Risk Management & Logistics' }]}
      />

      {/* Risk Management */}
      <section className="ga-section" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Badge variant="outline" className="mb-4 text-xs" style={{ borderColor: 'rgba(217,164,65,0.4)', color: 'var(--ga-gold-2)' }}>
              <Shield className="w-3 h-3 mr-1" /> Risk Management
            </Badge>
            <h2 className="h-serif text-2xl sm:text-3xl font-semibold tracking-tight mb-3" style={{ color: 'var(--ga-navy)' }}>
              Protecting both sides of the trade
            </h2>
            <p className="text-sm sm:text-base max-w-2xl mb-10" style={{ color: 'var(--ga-muted)' }}>
              We structure contracts and hedging strategies aligned with our clients' risk appetite, using futures, options, and physical positions to manage price and basis risk.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {riskItems.map((item) => {
              const Icon = item.icon;
              return (
                <FadeInItem key={item.title}>
                  <Card className="border h-full" style={{ borderColor: 'var(--ga-border)', borderRadius: 'var(--ga-radius-md)' }}>
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(11,60,93,0.08)' }}>
                        <Icon className="w-5 h-5" style={{ color: 'var(--ga-navy)' }} />
                      </div>
                      <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--ga-navy)' }}>{item.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--ga-muted)' }}>{item.desc}</p>
                    </CardContent>
                  </Card>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      <Separator className="max-w-7xl mx-auto" />

      {/* Logistics */}
      <section className="ga-section" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Badge variant="outline" className="mb-4 text-xs" style={{ borderColor: 'rgba(217,164,65,0.4)', color: 'var(--ga-gold-2)' }}>
              <Ship className="w-3 h-3 mr-1" /> Logistics
            </Badge>
            <h2 className="h-serif text-2xl sm:text-3xl font-semibold tracking-tight mb-3" style={{ color: 'var(--ga-navy)' }}>
              From loading to discharge
            </h2>
            <p className="text-sm sm:text-base max-w-2xl mb-10" style={{ color: 'var(--ga-muted)' }}>
              From FOB to CIF and delivered terms, we coordinate ocean freight, inland transport, storage, and documentation. Our team monitors each shipment from loading to discharge.
            </p>
          </FadeIn>

          <div className="space-y-0">
            {logisticsSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeIn key={step.title} delay={i * 0.1}>
                  <div className="flex gap-6 py-6 relative">
                    {/* Timeline line */}
                    {i < logisticsSteps.length - 1 && (
                      <div className="absolute left-5 top-16 bottom-0 w-px" style={{ background: 'var(--ga-border)' }} />
                    )}
                    <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center z-10" style={{ background: 'var(--ga-navy)' }}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-mono font-semibold" style={{ color: 'var(--ga-gold)' }}>Step {i + 1}</span>
                        <h3 className="font-semibold text-base" style={{ color: 'var(--ga-navy)' }}>{step.title}</h3>
                      </div>
                      <p className="text-sm" style={{ color: 'var(--ga-muted)' }}>{step.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn>
            <div className="mt-10 p-6 rounded-xl border" style={{ background: 'var(--ga-surface-2)', borderColor: 'var(--ga-border)' }}>
              <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--ga-navy)' }}>Trade Terms</h3>
              <p className="text-sm" style={{ color: 'var(--ga-muted)' }}>
                We operate under standard Incoterms including FOB, CFR, CIF, and DAP. Our team can advise on the most suitable terms for your specific requirements and destinations.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: 'var(--ga-navy)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="h-serif text-2xl sm:text-3xl font-semibold text-white">Need logistics support?</h2>
            <p className="mt-3 text-white/70 max-w-xl mx-auto">Our operations team can coordinate your next shipment from origin to destination.</p>
            <div className="mt-8">
              <Button asChild size="lg" className="rounded-full px-8" style={{ background: 'var(--ga-gold)', color: 'var(--ga-text)' }}>
                <Link to="/contact">Get in Touch <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
