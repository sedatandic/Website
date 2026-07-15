import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Send, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { FadeIn } from '../components/FadeIn';
import { submitContact } from '../lib/api';
import { toast } from 'sonner';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', country: '', product_interest: '', message: '', website: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields (Name, Email, Message)');
      return;
    }
    setSubmitting(true);
    try {
      await submitContact(form);
      toast.success('Message sent successfully! Our team will respond promptly.');
      setSubmitted(true);
    } catch (err) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative" style={{ height: '280px' }}>
        <img
          src="https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600"
          alt="Doha West Bay skyline, Qatar"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.55))' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">Contact Us</h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b" style={{ borderColor: '#e5e7eb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs" style={{ color: '#6b7280' }}>
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Contact Us</span>
          </nav>
        </div>
      </div>

      {/* Contact Section with 3 columns: Address | Map | Form */}
      <section className="py-12 lg:py-16" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left - Company Info */}
            <FadeIn className="lg:col-span-3">
              <div className="flex flex-col h-full">
                <div className="mb-4" style={{ maxWidth: '280px' }}>
                  <img src="/logo_tight.png" alt="Peninsula Agritrade LLC" className="w-full h-auto block" />
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#8A1538' }} />
                    <div className="text-sm leading-relaxed" style={{ color: '#4b5563' }}>
                      Level 22, Tornado Tower<br />
                      Majlis Al Taawon Street, West Bay<br />
                      Doha, State of Qatar
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#8A1538' }} />
                    <div className="text-sm" style={{ color: '#4b5563' }}>
                      +974 4419 6680
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#8A1538' }} />
                    <div className="text-sm" style={{ color: '#4b5563' }}>
                      info@peninsula.com.qa
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#8A1538' }} />
                    <a href="https://www.peninsula.com.qa" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: '#4b5563' }}>
                      www.peninsula.com.qa
                    </a>
                  </div>
                </div>
                <div className="space-y-4 mt-auto">
                  <div>
                    <h3 className="text-xs font-bold tracking-wider uppercase mb-2" style={{ color: '#1f2937', letterSpacing: '0.1em' }}>Trading Offices</h3>
                    <p className="text-sm" style={{ color: '#4b5563' }}>Doha | Geneva | Dubai | Istanbul | Singapore</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold tracking-wider uppercase mb-2" style={{ color: '#1f2937', letterSpacing: '0.1em' }}>Origination Offices</h3>
                    <p className="text-sm" style={{ color: '#4b5563' }}>Russia | Ukraine | Kazakhstan | Canada</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Middle - Tornado Tower photo (top) + Map (below) */}
            <FadeIn delay={0.1} className="lg:col-span-4">
              <div className="rounded-xl overflow-hidden shadow-sm border relative" style={{ borderColor: '#e5e7eb', height: '320px' }}>
                <img
                  src="https://customer-assets.emergentagent.com/job_1c2ecdee-46b4-4501-824e-998904d91028/artifacts/h7yif8lc_image.png"
                  alt="Tornado Tower"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: 'center 20%' }}
                />
                <span className="absolute bottom-2 left-3 z-10 text-xs font-medium text-white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>Tornado Tower</span>
                <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.75), rgba(15,23,42,0))' }} />
              </div>
              <div className="rounded-xl overflow-hidden shadow-sm border mt-4" style={{ borderColor: '#e5e7eb', height: '300px' }}>
                <iframe
                  title="Tornado Tower, West Bay, Doha"
                  src="https://maps.google.com/maps?width=100%25&amp;height=190&amp;hl=en&amp;q=Tornado%20Tower,%20Majlis%20Al%20Taawon%20Street,%20West%20Bay,%20Doha+(Peninsula%20Agritrade%20LLC)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  data-testid="contact-map"
                />
              </div>
            </FadeIn>

            {/* Right - Form */}
            <FadeIn delay={0.2} className="lg:col-span-5">
              {submitted ? (
                <div className="bg-white rounded-xl border p-8 text-center" style={{ borderColor: '#e5e7eb' }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(34,197,94,0.1)' }}>
                    <Send className="w-7 h-7" style={{ color: '#22c55e' }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#1f2937' }}>Message Sent!</h3>
                  <p className="text-sm mb-4" style={{ color: '#6b7280' }}>Thank you. Our team will respond within 1-2 business days.</p>
                  <Button
                    onClick={() => { setSubmitted(false); setForm({ name: '', company: '', email: '', phone: '', country: '', product_interest: '', message: '', website: '' }); }}
                    className="rounded-full"
                    style={{ background: '#8A1538', color: 'white' }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <div className="bg-white rounded-xl border p-6 lg:p-8 h-full flex flex-col" style={{ borderColor: '#e5e7eb' }}>
                  <form onSubmit={handleSubmit} className="space-y-5 flex flex-col flex-1">
                    <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} aria-hidden="true" data-testid="contact-honeypot" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="c-name" className="text-sm font-medium" style={{ color: '#374151' }}>Full Name *</Label>
                        <Input
                          id="c-name"
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          className="mt-1 rounded-lg bg-white"
                          data-testid="contact-form-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="c-email" className="text-sm font-medium" style={{ color: '#374151' }}>Email Address *</Label>
                        <Input
                          id="c-email"
                          type="email"
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          className="mt-1 rounded-lg bg-white"
                          data-testid="contact-form-email"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="c-subject" className="text-sm font-medium" style={{ color: '#374151' }}>Subject</Label>
                      <Input
                        id="c-subject"
                        value={form.product_interest}
                        onChange={e => setForm({ ...form, product_interest: e.target.value })}
                        className="mt-1 rounded-lg bg-white"
                        placeholder="e.g., Grains inquiry, General question..."
                        data-testid="contact-form-subject"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <Label htmlFor="c-message" className="text-sm font-medium" style={{ color: '#374151' }}>Message *</Label>
                      <Textarea
                        id="c-message"
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        className="mt-1 rounded-lg bg-white flex-1 resize-none"
                        style={{ minHeight: '160px' }}
                        placeholder="Tell us about your requirements..."
                        data-testid="contact-form-message"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={submitting}
                      size="lg"
                      className="rounded-full px-8 w-full"
                      style={{ background: '#8A1538', color: 'white' }}
                      data-testid="contact-form-submit"
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
