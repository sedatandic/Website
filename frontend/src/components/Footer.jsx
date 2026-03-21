import React from 'react';
import { Link } from 'react-router-dom';
import { Wheat, Mail, Phone, MapPin } from 'lucide-react';

const productLinks = [
  { name: 'Grains', slug: 'grains' },
  { name: 'Feedstuff', slug: 'feedstuff' },
  { name: 'Pulses', slug: 'pulses' },
  { name: 'Oilseeds', slug: 'oilseeds' },
  { name: 'Rice', slug: 'rice' },
  { name: 'Sugar', slug: 'sugar' },
  { name: 'Coffee', slug: 'coffee' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ga-navy-2)' }} data-testid="site-footer">
      {/* Gold separator */}
      <div className="h-px" style={{ background: 'rgba(217, 164, 65, 0.35)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'var(--ga-gold)' }}>
                <Wheat className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold text-sm tracking-wide">GLOBALAGRI</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              International agricultural commodities trading company focused on grains, feedstuff, pulses, oilseeds, rice, sugar, and coffee.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">COMPANY</h4>
            <div className="space-y-2.5">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Global Presence', path: '/global-presence' },
                { name: 'Sustainability', path: '/sustainability' },
                { name: 'Careers', path: '/careers' },
                { name: 'Market Insights', path: '/insights' },
              ].map(link => (
                <Link key={link.path} to={link.path} className="block text-sm hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">PRODUCTS</h4>
            <div className="space-y-2.5">
              {productLinks.map(link => (
                <Link key={link.slug} to={`/products/${link.slug}`} className="block text-sm hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">CONTACT</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--ga-gold)' }} />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>info@globalagri.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--ga-gold)' }} />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>+41 22 000 0000</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--ga-gold)' }} />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>Geneva, Switzerland</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            &copy; {new Date().getFullYear()} GlobalAgri Commodities. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-xs cursor-pointer hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>Privacy Policy</span>
            <span className="text-xs cursor-pointer hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
