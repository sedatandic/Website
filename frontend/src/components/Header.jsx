import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Wheat } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const aboutLinks = [
  { name: 'Who We Are', path: '/about/who-we-are' },
  { name: 'Strengths', path: '/about/strengths' },
  { name: 'Key Facts', path: '/about/key-facts' },
  { name: 'Memberships', path: '/about/memberships' },
];

const commodityLinks = [
  { name: 'At A Glance', path: '/commodities/at-a-glance' },
  { name: 'Grains & Feeds', path: '/commodities/grains-feeds' },
  { name: 'Oilseeds', path: '/commodities/oilseeds' },
  { name: 'Pulses & Beans', path: '/commodities/pulses-beans' },
  { name: 'Sugar & Rice', path: '/commodities/sugar-rice' },
  { name: 'Coffee', path: '/commodities/coffee' },
];

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About GlobalAgri', path: '/about', dropdown: aboutLinks },
  { name: 'Our Commodities', path: '/commodities', dropdown: commodityLinks },
  { name: 'Our Partners', path: '/partners' },
  { name: 'Market Insights', path: '/insights' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact Us', path: '/contact' },
];

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileDropdowns, setMobileDropdowns] = useState({});

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className="sticky top-0 z-50"
      style={{ background: 'rgba(11, 18, 32, 0.92)', backdropFilter: 'blur(12px)' }}
      data-testid="site-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-[68px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5" data-testid="site-header-logo">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--ga-gold)' }}>
              <Wheat className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm tracking-widest leading-tight">GLOBALAGRI</div>
              <div className="text-[10px] tracking-wider leading-tight" style={{ color: 'rgba(255,255,255,0.5)' }}>COMMODITIES</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setOpenDropdown(link.name)}
                onMouseLeave={() => link.dropdown && setOpenDropdown(null)}
              >
                <Link
                  to={link.path}
                  className={`px-3 py-2 text-[13px] font-medium rounded-md inline-flex items-center gap-1 transition-colors ${
                    isActive(link.path)
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                  data-testid={`nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className="w-3 h-3" />}
                </Link>

                {link.dropdown && openDropdown === link.name && (
                  <div
                    className="absolute top-full left-0 mt-0 w-56 bg-white rounded-lg shadow-xl border p-2 z-50"
                    style={{ borderColor: '#e5e7eb' }}
                  >
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className="block px-3 py-2 text-sm rounded-md hover:bg-gray-50 transition-colors"
                        style={{ color: '#374151' }}
                        onClick={() => setOpenDropdown(null)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" data-testid="mobile-menu-trigger">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0" style={{ background: '#0b1220' }} aria-describedby={undefined}>
              <div className="sr-only" id="mobile-nav-title">Navigation Menu</div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: 'var(--ga-gold)' }}>
                    <Wheat className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm tracking-wide">GLOBALAGRI</span>
                </div>
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.name}>
                      {link.dropdown ? (
                        <>
                          <button
                            onClick={() => setMobileDropdowns(prev => ({ ...prev, [link.name]: !prev[link.name] }))}
                            className="w-full flex items-center justify-between px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/5 rounded-md text-sm font-medium"
                          >
                            {link.name}
                            <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdowns[link.name] ? 'rotate-180' : ''}`} />
                          </button>
                          {mobileDropdowns[link.name] && (
                            <div className="pl-6 space-y-0.5 mt-1">
                              {link.dropdown.map((sub) => (
                                <Link
                                  key={sub.path}
                                  to={sub.path}
                                  className="block px-3 py-2 text-white/60 hover:text-white text-sm rounded-md hover:bg-white/5"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link
                          to={link.path}
                          className={`block px-3 py-2.5 rounded-md text-sm font-medium ${
                            isActive(link.path) ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/5'
                          }`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
