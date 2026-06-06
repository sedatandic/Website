import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Send, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { FadeIn } from '../components/FadeIn';
import { submitContact } from '../lib/api';
import { toast } from 'sonner';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', country: '', product_interest: '', message: '' });
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
          src="https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=1260"
          alt=""
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left - Company Info */}
            <FadeIn className="lg:col-span-3">
              <div>
                <h2 className="text-xl font-bold mb-6" style={{ color: '#1f2937' }}>Peninsula Agritrade LLC</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#7B1E2F' }} />
                    <div className="text-sm leading-relaxed" style={{ color: '#4b5563' }}>
                      <div className="font-semibold text-gray-900">Geneva, Switzerland</div>
                      <div className="text-xs italic mt-0.5" style={{ color: '#9ca3af' }}>(European Headquarters)</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#7B1E2F' }} />
                    <div className="text-sm leading-relaxed" style={{ color: '#4b5563' }}>
                      <div className="font-semibold text-gray-900">Dubai, UAE</div>
                      <div className="text-xs italic mt-0.5" style={{ color: '#9ca3af' }}>(Middle East & Africa Hub)</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#7B1E2F' }} />
                    <div className="text-sm" style={{ color: '#4b5563' }}>
                      +41 22 000 0000
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#7B1E2F' }} />
                    <div className="text-sm" style={{ color: '#4b5563' }}>
                      info@peninsula-agritrade.com
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Middle - Map */}
            <FadeIn delay={0.1} className="lg:col-span-4">
              <div className="h-full min-h-[400px] rounded-xl overflow-hidden shadow-sm border" style={{ borderColor: '#e5e7eb' }}>
                <iframe
                  title="Peninsula Agritrade Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43867.95160296721!2d6.1!3d46.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c64ef6f596d61%3A0x4bc4e82b2b946b81!2sGeneva%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
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
                    onClick={() => { setSubmitted(false); setForm({ name: '', company: '', email: '', phone: '', country: '', product_interest: '', message: '' }); }}
                    className="rounded-full"
                    style={{ background: '#7B1E2F', color: 'white' }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <div className="bg-white rounded-xl border p-6 lg:p-8" style={{ borderColor: '#e5e7eb' }}>
                  <h3 className="text-lg font-bold mb-4" style={{ color: '#1f2937' }}>Send us a message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="c-company" className="text-sm font-medium" style={{ color: '#374151' }}>Company</Label>
                        <Input
                          id="c-company"
                          value={form.company}
                          onChange={e => setForm({ ...form, company: e.target.value })}
                          className="mt-1 rounded-lg bg-white"
                          data-testid="contact-form-company"
                        />
                      </div>
                      <div>
                        <Label htmlFor="c-phone" className="text-sm font-medium" style={{ color: '#374151' }}>Phone</Label>
                        <Input
                          id="c-phone"
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          className="mt-1 rounded-lg bg-white"
                          data-testid="contact-form-phone"
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
                    <div>
                      <Label htmlFor="c-message" className="text-sm font-medium" style={{ color: '#374151' }}>Message *</Label>
                      <Textarea
                        id="c-message"
                        rows={4}
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        className="mt-1 rounded-lg bg-white"
                        placeholder="Tell us about your requirements..."
                        data-testid="contact-form-message"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={submitting}
                      size="lg"
                      className="rounded-full px-8 w-full"
                      style={{ background: '#7B1E2F', color: 'white' }}
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
