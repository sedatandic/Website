import React from 'react';
import { Link } from 'react-router-dom';
import { Wheat, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const quickLinks = [
  { name: 'Who We Are', path: '/about/who-we-are' },
  { name: 'Our Strengths', path: '/about/strengths' },
  { name: 'Key Facts', path: '/about/key-facts' },
  { name: 'Memberships', path: '/about/memberships' },
];

const commodityLinks = [
  { name: 'Grains & Feeds', path: '/commodities/grains-feeds' },
  { name: 'Oilseeds', path: '/commodities/oilseeds' },
  { name: 'Pulses & Beans', path: '/commodities/pulses-beans' },
  { name: 'Sugar & Rice', path: '/commodities/sugar-rice' },
  { name: 'Coffee', path: '/commodities/coffee' },
];

const companyLinks = [
  { name: 'Market Insights', path: '/insights' },
  { name: 'Our Partners', path: '/partners' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact Us', path: '/contact' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0b1220' }} data-testid="site-footer">
      {/* Top divider */}
      <div className="h-px" style={{ background: 'rgba(230,126,34,0.15)' }} />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 group mb-5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#e67e22' }}>
                <Wheat className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm tracking-widest leading-tight">GLOBALAGRI</div>
                <div className="text-[10px] tracking-wider leading-tight" style={{ color: 'rgba(255,255,255,0.4)' }}>COMMODITIES</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
              An international commodity trading house specializing in the merchandising of agricultural cash-crops. Connecting harvests to markets, reliably and responsibly.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#e67e22' }} />
                <span>Geneva | Dubai | Singapore | Nairobi</span>
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#e67e22' }} />
                <span>info@globalagri.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#e67e22' }} />
                <span>+41 22 000 0000</span>
              </div>
            </div>
          </div>

          {/* About column */}
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-white mb-5" style={{ letterSpacing: '0.1em' }}>About</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm transition-colors duration-150 hover:text-[#e67e22]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Commodities column */}
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-white mb-5" style={{ letterSpacing: '0.1em' }}>Commodities</h3>
            <ul className="space-y-3">
              {commodityLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm transition-colors duration-150 hover:text-[#e67e22]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-white mb-5" style={{ letterSpacing: '0.1em' }}>Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm transition-colors duration-150 hover:text-[#e67e22]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Newsletter CTA */}
            <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all hover:gap-2.5" style={{ color: '#e67e22' }}>
                Get in Touch <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              &copy; {new Date().getFullYear()} GlobalAgri Commodities. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Privacy Policy</span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Terms of Use</span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Cookie Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
