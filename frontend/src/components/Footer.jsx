import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, Globe } from 'lucide-react';

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
  { name: 'Our Partners', path: '/partners' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact Us', path: '/contact' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0b1220' }} data-testid="site-footer">
      <div className="h-px" style={{ background: 'rgba(123,47,160,0.2)' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center group mb-5">
              <img src="/logo.png" alt="Peninsula Agritrade LLC" className="h-20 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed max-w-sm mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
              An international commodity trading house specializing in the merchandising of agricultural cash-crops. Connecting harvests to markets, reliably and responsibly.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold tracking-wider uppercase text-white mb-2" style={{ letterSpacing: '0.1em' }}>Trading Offices</h4>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>Doha | Geneva | Dubai | Istanbul | Singapore</p>
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-wider uppercase text-white mb-2" style={{ letterSpacing: '0.1em' }}>Origination Offices</h4>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>Russia | Ukraine | Kazakhstan | Moldova | Canada</p>
              </div>
              <div className="pt-2 space-y-3">
                <div className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#7B1E2F' }} />
                  <span>Office No.4, 9th Floor QFC Tower 1<br />Doha - State of Qatar</span>
                </div>
                <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#7B1E2F' }} />
                  <span>+974 4419 6680</span>
                </div>
                <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#7B1E2F' }} />
                  <span>info@peninsula.com.qa</span>
                </div>
                <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  <Globe className="w-4 h-4 flex-shrink-0" style={{ color: '#7B1E2F' }} />
                  <a href="https://www.peninsula.com.qa" target="_blank" rel="noopener noreferrer" className="hover:text-[#A0354A] transition-colors duration-150">www.peninsula.com.qa</a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-white mb-5" style={{ letterSpacing: '0.1em' }}>About</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}><Link to={link.path} className="text-sm transition-colors duration-150 hover:text-[#A0354A]" style={{ color: 'rgba(255,255,255,0.45)' }}>{link.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-white mb-5" style={{ letterSpacing: '0.1em' }}>Commodities</h3>
            <ul className="space-y-3">
              {commodityLinks.map((link) => (
                <li key={link.path}><Link to={link.path} className="text-sm transition-colors duration-150 hover:text-[#A0354A]" style={{ color: 'rgba(255,255,255,0.45)' }}>{link.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-white mb-5" style={{ letterSpacing: '0.1em' }}>Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.path}><Link to={link.path} className="text-sm transition-colors duration-150 hover:text-[#A0354A]" style={{ color: 'rgba(255,255,255,0.45)' }}>{link.name}</Link></li>
              ))}
            </ul>
            <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all hover:gap-2.5" style={{ color: '#A0354A' }}>Get in Touch <ArrowRight className="w-3 h-3" /></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>&copy; {new Date().getFullYear()} Peninsula Agritrade LLC. All rights reserved.</p>
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
