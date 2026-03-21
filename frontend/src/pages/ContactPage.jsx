import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import PageHero from '../components/PageHero';
import { FadeIn } from '../components/FadeIn';
import { submitContact } from '../lib/api';
import { toast } from 'sonner';

const countries = ['Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria', 'Bangladesh', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China', 'Colombia', 'Czech Republic', 'Denmark', 'Egypt', 'Ethiopia', 'Finland', 'France', 'Germany', 'Ghana', 'Greece', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Lebanon', 'Libya', 'Malaysia', 'Mexico', 'Morocco', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Saudi Arabia', 'Singapore', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Sweden', 'Switzerland', 'Tanzania', 'Thailand', 'Tunisia', 'Turkey', 'UAE', 'Uganda', 'UK', 'Ukraine', 'USA', 'Vietnam', 'Yemen', 'Other'];

const productInterests = ['Grains', 'Feedstuff', 'Pulses', 'Oilseeds', 'Rice', 'Sugar', 'Coffee', 'Multiple Products', 'Other'];

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const preselectedProduct = searchParams.get('product') || '';

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    product_interest: preselectedProduct ? preselectedProduct.charAt(0).toUpperCase() + preselectedProduct.slice(1) : '',
    message: '',
  });
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
      <PageHero
        title="Contact Us"
        subtitle="Tell us about your requirements in grains, feedstuff, pulses, oilseeds, rice, sugar, or coffee, and our team will respond promptly."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="ga-section" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <FadeIn>
              <div>
                <h2 className="h-serif text-2xl font-semibold tracking-tight mb-6" style={{ color: 'var(--ga-navy)' }}>
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(11,60,93,0.08)' }}>
                      <Mail className="w-5 h-5" style={{ color: 'var(--ga-navy)' }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--ga-navy)' }}>Email</h3>
                      <p className="text-sm" style={{ color: 'var(--ga-muted)' }}>info@globalagri.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(11,60,93,0.08)' }}>
                      <Phone className="w-5 h-5" style={{ color: 'var(--ga-navy)' }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--ga-navy)' }}>Phone</h3>
                      <p className="text-sm" style={{ color: 'var(--ga-muted)' }}>+41 22 000 0000</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(11,60,93,0.08)' }}>
                      <MapPin className="w-5 h-5" style={{ color: 'var(--ga-navy)' }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--ga-navy)' }}>Office</h3>
                      <p className="text-sm" style={{ color: 'var(--ga-muted)' }}>Geneva, Switzerland<br />Dubai, UAE<br />Singapore<br />Nairobi, Kenya</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn delay={0.15} className="lg:col-span-2">
              {submitted ? (
                <Card className="border" style={{ borderColor: 'var(--ga-border)', borderRadius: 'var(--ga-radius-md)' }}>
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(31,122,90,0.1)' }}>
                      <Send className="w-7 h-7" style={{ color: 'var(--ga-success)' }} />
                    </div>
                    <h3 className="h-serif text-xl font-semibold mb-3" style={{ color: 'var(--ga-navy)' }}>Message Sent Successfully</h3>
                    <p className="text-sm" style={{ color: 'var(--ga-muted)' }}>Thank you for reaching out. Our team will review your inquiry and respond within 1-2 business days.</p>
                    <Button
                      className="mt-6 rounded-full"
                      style={{ background: 'var(--ga-navy)', color: 'white' }}
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: '', company: '', email: '', phone: '', country: '', product_interest: '', message: '' });
                      }}
                    >
                      Send Another Message
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border" style={{ borderColor: 'var(--ga-border)', borderRadius: 'var(--ga-radius-md)' }}>
                  <CardContent className="p-6 lg:p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <Label htmlFor="contact-name" className="text-sm font-medium" style={{ color: 'var(--ga-navy)' }}>Name *</Label>
                          <Input
                            id="contact-name"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            className="mt-1 rounded-lg"
                            data-testid="contact-form-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contact-company" className="text-sm font-medium" style={{ color: 'var(--ga-navy)' }}>Company</Label>
                          <Input
                            id="contact-company"
                            value={form.company}
                            onChange={e => setForm({ ...form, company: e.target.value })}
                            className="mt-1 rounded-lg"
                            data-testid="contact-form-company"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contact-email" className="text-sm font-medium" style={{ color: 'var(--ga-navy)' }}>Email *</Label>
                          <Input
                            id="contact-email"
                            type="email"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            className="mt-1 rounded-lg"
                            data-testid="contact-form-email"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contact-phone" className="text-sm font-medium" style={{ color: 'var(--ga-navy)' }}>Phone</Label>
                          <Input
                            id="contact-phone"
                            value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                            className="mt-1 rounded-lg"
                            data-testid="contact-form-phone"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium" style={{ color: 'var(--ga-navy)' }}>Country</Label>
                          <Select value={form.country} onValueChange={v => setForm({ ...form, country: v })}>
                            <SelectTrigger className="mt-1 rounded-lg" data-testid="contact-form-country-select">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              {countries.map(c => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium" style={{ color: 'var(--ga-navy)' }}>Product Interest</Label>
                          <Select value={form.product_interest} onValueChange={v => setForm({ ...form, product_interest: v })}>
                            <SelectTrigger className="mt-1 rounded-lg" data-testid="contact-form-product-select">
                              <SelectValue placeholder="Select product" />
                            </SelectTrigger>
                            <SelectContent>
                              {productInterests.map(p => (
                                <SelectItem key={p} value={p}>{p}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="contact-message" className="text-sm font-medium" style={{ color: 'var(--ga-navy)' }}>Message *</Label>
                        <Textarea
                          id="contact-message"
                          rows={5}
                          value={form.message}
                          onChange={e => setForm({ ...form, message: e.target.value })}
                          className="mt-1 rounded-lg"
                          placeholder="Tell us about your commodity requirements, volumes, and delivery terms..."
                          data-testid="contact-form-message"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={submitting}
                        size="lg"
                        className="rounded-full px-8"
                        style={{ background: 'var(--ga-navy)', color: 'white' }}
                        data-testid="contact-form-submit"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {submitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
