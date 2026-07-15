import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown, ChevronRight } from 'lucide-react';
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
  {
    name: 'About Us',
    path: '/about',
    dropdown: aboutLinks,
  },
  {
    name: 'Our Commodities',
    path: '/commodities',
    dropdown: commodityLinks,
  },
  { name: 'Our Partners', path: '/partners' },
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
      style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(14px)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
      data-testid="site-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-24 lg:h-[120px]">
          {/* Logo */}
          <Link to="/" className="flex items-center group" data-testid="site-header-logo">
            <img
              src="/logo.png"
              alt="Peninsula Agritrade LLC"
              className="h-[120px] w-auto transition-transform duration-200 group-hover:scale-105"
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
                    isActive(link.path) ? 'text-[#8A1538]' : 'text-gray-600 hover:text-[#8A1538]'
                  }`}
                  style={{ letterSpacing: '0.02em' }}
                  data-testid={`nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.name}
                  {link.dropdown && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                  )}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] rounded-full" style={{ background: '#8A1538' }} />
                  )}
                </Link>

                {/* Simplified Mega Dropdown */}
                {link.dropdown && openDropdown === link.name && (
                  <div
                    className="absolute top-full left-1/2 pt-2 z-50"
                    style={{ transform: 'translateX(-50%)', minWidth: '170px' }}
                    onMouseEnter={() => handleMouseEnter(link.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="absolute top-2 left-1/2 w-0 h-0" style={{ transform: 'translateX(-50%)', borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '10px solid white', zIndex: 51 }} />
                    <div className="bg-white rounded-sm overflow-hidden" style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08)', marginTop: '8px' }}>
                      <div className="py-6 px-3">
                        <div className="flex flex-col gap-1">
                          {link.dropdown.map((sub) => (
                            <Link key={sub.path} to={sub.path} className="group/link flex items-center justify-center px-2 py-2 rounded transition-colors duration-150 hover:bg-gray-50" onClick={() => setOpenDropdown(null)} data-testid={`dropdown-link-${sub.name.toLowerCase().replace(/\s+/g, '-')}`}>
                              <span className="text-xs font-semibold tracking-wide text-center transition-colors duration-150 group-hover/link:text-[#8A1538]" style={{ color: '#374151', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{sub.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="w-full h-[3px]" style={{ background: 'linear-gradient(to right, #8A1538, #6E0F2A)' }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100" data-testid="mobile-menu-trigger">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0 border-l-0" style={{ background: '#ffffff' }} aria-describedby={undefined}>
              <div className="sr-only" id="mobile-nav-title">Navigation Menu</div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-8">
                  <img src="/logo.png" alt="Peninsula Agritrade LLC" className="h-12 w-auto" />
                </div>
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.name}>
                      {link.dropdown ? (
                        <>
                          <button onClick={() => setMobileDropdowns(prev => ({ ...prev, [link.name]: !prev[link.name] }))} className="w-full flex items-center justify-between px-3 py-2.5 text-gray-700 hover:text-[#8A1538] hover:bg-gray-100 rounded-md text-sm font-medium transition-colors duration-150" data-testid={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}>
                            {link.name}
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileDropdowns[link.name] ? 'rotate-180' : ''}`} />
                          </button>
                          {mobileDropdowns[link.name] && (
                            <div className="mt-1 ml-3 pl-3 space-y-0.5" style={{ borderLeft: '2px solid #8A1538' }}>
                              {link.dropdown.map((sub) => (
                                <Link key={sub.path} to={sub.path} className="block px-3 py-2 text-gray-500 hover:text-[#8A1538] text-xs font-medium tracking-wide rounded-md hover:bg-gray-100 transition-colors duration-150 uppercase" style={{ letterSpacing: '0.05em' }} onClick={() => setMobileOpen(false)}>{sub.name}</Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link to={link.path} className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ${isActive(link.path) ? 'text-[#8A1538] bg-[#8A1538]/10' : 'text-gray-700 hover:text-[#8A1538] hover:bg-gray-100'}`} onClick={() => setMobileOpen(false)} data-testid={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}>{link.name}</Link>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                  <Link to="/contact" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-sm font-medium text-white transition-colors duration-200" style={{ background: '#8A1538' }} onClick={() => setMobileOpen(false)}>
                    Get In Touch <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
      <div className="w-full h-px" style={{ background: 'rgba(0,0,0,0.06)' }} />
    </header>
  );
}
