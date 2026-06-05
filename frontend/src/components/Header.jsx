import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const aboutDescription = 'Peninsula Agritrade is an international trading firm and supply chain manager of agricultural products. We connect supply and demand effectively, profitably and sustainably.';
const commoditiesDescription = 'Deep market knowledge, solid expertise, and strategic long-term partnerships across key agricultural commodity markets worldwide.';

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
  {
    name: 'About Us',
    path: '/about',
    dropdown: aboutLinks,
    megaTitle: 'ABOUT US',
    megaDescription: aboutDescription,
  },
  {
    name: 'Our Commodities',
    path: '/commodities',
    dropdown: commodityLinks,
    megaTitle: 'OUR COMMODITIES',
    megaDescription: commoditiesDescription,
  },
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
  const dropdownTimeoutRef = useRef(null);
  const navItemRefs = useRef({});

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    setOpenDropdown(null);
  }, [location.pathname]);

  const handleMouseEnter = (linkName) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setOpenDropdown(linkName);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const splitIntoColumns = (links) => {
    if (links.length <= 4) return [links];
    const mid = Math.ceil(links.length / 2);
    return [links.slice(0, mid), links.slice(mid)];
  };

  return (
    <header
      className="sticky top-0 z-50"
      style={{ background: 'rgba(11, 18, 32, 0.95)', backdropFilter: 'blur(14px)' }}
      data-testid="site-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center group" data-testid="site-header-logo">
            <img
              src="/logo.png"
              alt="Peninsula Agritrade LLC"
              className="h-14 w-auto transition-transform duration-200 group-hover:scale-105"
              style={{ mixBlendMode: 'screen', filter: 'brightness(1.1)' }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                ref={(el) => (navItemRefs.current[link.name] = el)}
                onMouseEnter={() => link.dropdown ? handleMouseEnter(link.name) : null}
                onMouseLeave={() => link.dropdown ? handleMouseLeave() : null}
              >
                <Link
                  to={link.path}
                  className={`px-3.5 py-2 text-[13px] font-medium inline-flex items-center gap-1.5 transition-all duration-200 relative ${
                    isActive(link.path) ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                  style={{ letterSpacing: '0.02em' }}
                  data-testid={`nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.name}
                  {link.dropdown && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                  )}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] rounded-full" style={{ background: '#7B1E2F' }} />
                  )}
                </Link>

                {/* Quadra-style Mega Dropdown */}
                {link.dropdown && openDropdown === link.name && (
                  <div
                    className="absolute top-full left-1/2 pt-2 z-50"
                    style={{ transform: 'translateX(-50%)', minWidth: link.dropdown.length > 4 ? '580px' : '480px' }}
                    onMouseEnter={() => handleMouseEnter(link.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="absolute top-2 left-1/2 w-0 h-0" style={{ transform: 'translateX(-50%)', borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '10px solid white', zIndex: 51 }} />
                    <div className="bg-white rounded-sm overflow-hidden" style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08)', marginTop: '8px' }}>
                      <div className="flex">
                        <div className="flex-shrink-0 p-6" style={{ width: '220px', borderRight: '1px solid #e5e7eb' }}>
                          <h3 className="text-sm font-bold tracking-wide mb-3" style={{ color: '#1a2a3a', letterSpacing: '0.04em' }}>{link.megaTitle}</h3>
                          <p className="text-xs leading-relaxed" style={{ color: '#6b7280', lineHeight: '1.7' }}>{link.megaDescription}</p>
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex gap-8">
                            {splitIntoColumns(link.dropdown).map((col, colIndex) => (
                              <div key={colIndex} className="flex flex-col gap-1">
                                {col.map((sub) => (
                                  <Link key={sub.path} to={sub.path} className="group/link flex items-center gap-2 px-2 py-2 rounded transition-colors duration-150 hover:bg-gray-50" onClick={() => setOpenDropdown(null)} data-testid={`dropdown-link-${sub.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                    <span className="text-xs font-semibold tracking-wide transition-colors duration-150 group-hover/link:text-[#7B1E2F]" style={{ color: '#374151', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{sub.name}</span>
                                    <ChevronRight className="w-3 h-3 opacity-0 -translate-x-1 transition-all duration-150 group-hover/link:opacity-100 group-hover/link:translate-x-0" style={{ color: '#7B1E2F' }} />
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-[3px]" style={{ background: 'linear-gradient(to right, #7B1E2F, #A0354A)' }} />
                    </div>
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
            <SheetContent side="right" className="w-80 p-0 border-l-0" style={{ background: '#0b1220' }} aria-describedby={undefined}>
              <div className="sr-only" id="mobile-nav-title">Navigation Menu</div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-8">
                  <img src="/logo.png" alt="Peninsula Agritrade LLC" className="h-12 w-auto" style={{ mixBlendMode: 'screen', filter: 'brightness(1.1)' }} />
                </div>
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.name}>
                      {link.dropdown ? (
                        <>
                          <button onClick={() => setMobileDropdowns(prev => ({ ...prev, [link.name]: !prev[link.name] }))} className="w-full flex items-center justify-between px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/5 rounded-md text-sm font-medium transition-colors duration-150" data-testid={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}>
                            {link.name}
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileDropdowns[link.name] ? 'rotate-180' : ''}`} />
                          </button>
                          {mobileDropdowns[link.name] && (
                            <div className="mt-1 ml-3 pl-3 space-y-0.5" style={{ borderLeft: '2px solid #7B1E2F' }}>
                              {link.dropdown.map((sub) => (
                                <Link key={sub.path} to={sub.path} className="block px-3 py-2 text-white/60 hover:text-white text-xs font-medium tracking-wide rounded-md hover:bg-white/5 transition-colors duration-150 uppercase" style={{ letterSpacing: '0.05em' }} onClick={() => setMobileOpen(false)}>{sub.name}</Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link to={link.path} className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ${isActive(link.path) ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/5'}`} onClick={() => setMobileOpen(false)} data-testid={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}>{link.name}</Link>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <Link to="/contact" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-sm font-medium text-white transition-colors duration-200" style={{ background: '#7B1E2F' }} onClick={() => setMobileOpen(false)}>
                    Get In Touch <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
      <div className="w-full h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
    </header>
  );
}
