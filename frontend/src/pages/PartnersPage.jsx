import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/FadeIn';
import { getPartners } from '../lib/api';

export default function PartnersPage() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    getPartners().then(res => setPartners(res.data)).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative" style={{ height: '280px' }}>
        <img
          src="https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=1260"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.55))' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">Our Partners</h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b" style={{ borderColor: '#e5e7eb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs" style={{ color: '#6b7280' }}>
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Our Partners</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 lg:py-16" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1f2937' }}>Our Partners</h2>
            <p className="text-sm sm:text-base leading-relaxed mb-10" style={{ color: '#4b5563' }}>
              Peninsula Agritrade LLC is the reliable partner in international agri-commodity venue. A vast experienced team of physical trading, trade-finance, shipping & execution professionals to make sure custom-made service to our trade partners — Government Institutions, Port & Custom Authorities, Business Chambers, Independent Surveyors, Ship Owners, Shipping Lines, Cargo Insurers and our Trade Finance Partners.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {partners.map((partner) => (
              <FadeInItem key={partner.id}>
                <Card className="border text-center h-full" style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}>
                  <CardContent className="p-6 flex flex-col items-center justify-center" style={{ minHeight: '140px' }}>
                    <div className="text-lg font-bold mb-1" style={{ color: '#1f2937' }}>{partner.name}</div>
                    <div className="text-xs" style={{ color: '#9ca3af' }}>{partner.category}</div>
                  </CardContent>
                </Card>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>
    </div>
  );
}
