import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Wheat, Leaf, Bean, Droplets, Grain, CoffeeIcon, CandyCane } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const productLinks = [
  { name: 'Grains', slug: 'grains', desc: 'Wheat, corn, barley' },
  { name: 'Feedstuff', slug: 'feedstuff', desc: 'Feed ingredients' },
  { name: 'Pulses', slug: 'pulses', desc: 'Beans, lentils, peas' },
  { name: 'Oilseeds', slug: 'oilseeds', desc: 'Soybeans, sunflower' },
  { name: 'Rice', slug: 'rice', desc: 'All varieties' },
  { name: 'Sugar', slug: 'sugar', desc: 'Raw & refined' },
  { name: 'Coffee', slug: 'coffee', desc: 'Green coffee' },
];

const navLinks = [
  { name: 'About', path: '/about' },
  { name: 'Products', path: '/products', hasDropdown: true },
  { name: 'Risk & Logistics', path: '/risk-logistics' },
  { name: 'Sustainability', path: '/sustainability' },
  { name: 'Insights', path: '/insights' },
  { name: 'Global Presence', path: '/global-presence' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ background: 'rgba(11, 60, 93, 0.97)', backdropFilter: 'blur(8px)', borderColor: 'rgba(255,255,255,0.08)' }}
      data-testid="site-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" data-testid="site-header-logo">
            <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: 'var(--ga-gold)' }}>
              <Wheat className="w-5 h-5 text-white" />
            </div>
            <div className="text-white">
              <span className="font-semibold text-sm tracking-wide">GLOBALAGRI</span>
              <span className="hidden sm:inline text-xs ml-1 opacity-70 tracking-wider">COMMODITIES</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setProductsOpen(true)}
                onMouseLeave={() => link.hasDropdown && setProductsOpen(false)}
              >
                <Link
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium rounded-md inline-flex items-center gap-1 transition-colors ${
                    isActive(link.path)
                      ? 'text-white bg-white/10'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                  data-testid={`site-header-${link.name.toLowerCase().replace(/\s+/g, '-')}-link`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {/* Products Dropdown */}
                {link.hasDropdown && productsOpen && (
                  <div
                    className="absolute top-full left-0 mt-0 w-72 bg-white rounded-lg shadow-xl border p-3 z-50"
                    style={{ borderColor: 'var(--ga-border)' }}
                    data-testid="site-header-products-menu"
                  >
                    <div className="grid gap-0.5">
                      {productLinks.map((product) => (
                        <Link
                          key={product.slug}
                          to={`/products/${product.slug}`}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[color:var(--ga-surface-2)] transition-colors group"
                          onClick={() => setProductsOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: 'var(--ga-surface-2)' }}>
                            <Wheat className="w-4 h-4" style={{ color: 'var(--ga-navy)' }} />
                          </div>
                          <div>
                            <div className="text-sm font-medium" style={{ color: 'var(--ga-navy)' }}>{product.name}</div>
                            <div className="text-xs" style={{ color: 'var(--ga-muted)' }}>{product.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t" style={{ borderColor: 'var(--ga-border)' }}>
                      <Link
                        to="/products"
                        className="text-xs font-medium px-3 py-1.5 rounded hover:bg-[color:var(--ga-surface-2)] block transition-colors"
                        style={{ color: 'var(--ga-navy)' }}
                        onClick={() => setProductsOpen(false)}
                      >
                        View all products &rarr;
                      </Link>
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
            <SheetContent side="right" className="w-80 p-0" style={{ background: 'var(--ga-navy)' }} aria-describedby={undefined}>
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
                      {link.hasDropdown ? (
                        <>
                          <button
                            onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                            className="w-full flex items-center justify-between px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/5 rounded-md text-sm font-medium"
                          >
                            {link.name}
                            <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
                          </button>
                          {mobileProductsOpen && (
                            <div className="pl-6 space-y-0.5 mt-1">
                              {productLinks.map((product) => (
                                <Link
                                  key={product.slug}
                                  to={`/products/${product.slug}`}
                                  className="block px-3 py-2 text-white/70 hover:text-white text-sm rounded-md hover:bg-white/5"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {product.name}
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
