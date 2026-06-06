import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Briefcase, Clock, Send, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/FadeIn';
import { getJobs, submitCareerInquiry } from '../lib/api';
import { toast } from 'sonner';

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getJobs()
      .then(res => setJobs(res.data))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  const handleInquiry = async (e) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    try {
      await submitCareerInquiry(inquiryForm);
      toast.success('Inquiry submitted successfully!');
      setInquiryForm({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error('Failed to submit inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative" style={{ height: '280px' }}>
        <img src="https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=1260" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.55))' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">Careers</h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b" style={{ borderColor: '#e5e7eb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs" style={{ color: '#6b7280' }}>
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Careers</span>
          </nav>
        </div>
      </div>

      {/* Why Join */}
      <section className="py-10" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1f2937' }}>Why Join Peninsula Agritrade?</h2>
            <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: '#4b5563' }}>
              At Peninsula Agritrade LLC, you'll work in a fast-paced, entrepreneurial environment where your contributions directly impact the business. We offer global exposure, competitive compensation, and a collaborative culture.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Global exposure', 'Competitive compensation', 'Career growth', 'Collaborative culture'].map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs" style={{ background: '#f3f4f6', color: '#374151' }}>{tag}</Badge>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-10" style={{ background: '#f9fafb' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-semibold mb-8" style={{ color: '#1f2937' }}>Open Positions</h2>
          </FadeIn>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-xl border p-6 animate-pulse bg-white" style={{ borderColor: '#e5e7eb' }}>
                  <div className="h-5 rounded w-1/3 mb-3 bg-gray-100" />
                  <div className="h-4 rounded w-2/3 bg-gray-100" />
                </div>
              ))}
            </div>
          ) : (
            <FadeInStagger className="space-y-4">
              {jobs.map((job) => (
                <FadeInItem key={job.id}>
                  <Link to={`/careers/${job.slug || job.id}`}>
                    <Card
                      className="group cursor-pointer border hover:shadow-lg transition-shadow duration-200 bg-white"
                      style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}
                      data-testid={`job-card-${job.slug}`}
                    >
                      <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-base mb-2" style={{ color: '#1f2937' }}>{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-xs flex items-center gap-1" style={{ color: '#6b7280' }}>
                              <MapPin className="w-3 h-3" /> {job.location}
                            </span>
                            <span className="text-xs flex items-center gap-1" style={{ color: '#6b7280' }}>
                              <Briefcase className="w-3 h-3" /> {job.department}
                            </span>
                            <span className="text-xs flex items-center gap-1" style={{ color: '#6b7280' }}>
                              <Clock className="w-3 h-3" /> {job.type}
                            </span>
                          </div>
                          <p className="text-sm mt-2" style={{ color: '#6b7280' }}>{job.summary}</p>
                        </div>
                        <span className="text-xs font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: '#8B5CF6' }}>
                          View role <ArrowRight className="w-3 h-3" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </FadeInItem>
              ))}
            </FadeInStagger>
          )}
        </div>
      </section>

      {/* General Inquiry */}
      <section className="py-10" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <FadeIn>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1f2937' }}>General Inquiry</h2>
              <p className="text-sm leading-relaxed" style={{ color: '#4b5563' }}>
                Don't see a matching role? Send us a message and we'll keep your details on file.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <form onSubmit={handleInquiry} className="space-y-4">
                <div>
                  <Label htmlFor="inq-name" className="text-sm font-medium" style={{ color: '#374151' }}>Name *</Label>
                  <Input id="inq-name" value={inquiryForm.name} onChange={e => setInquiryForm({ ...inquiryForm, name: e.target.value })} className="mt-1 rounded-lg bg-white" data-testid="career-inquiry-name" />
                </div>
                <div>
                  <Label htmlFor="inq-email" className="text-sm font-medium" style={{ color: '#374151' }}>Email *</Label>
                  <Input id="inq-email" type="email" value={inquiryForm.email} onChange={e => setInquiryForm({ ...inquiryForm, email: e.target.value })} className="mt-1 rounded-lg bg-white" data-testid="career-inquiry-email" />
                </div>
                <div>
                  <Label htmlFor="inq-message" className="text-sm font-medium" style={{ color: '#374151' }}>Message *</Label>
                  <Textarea id="inq-message" rows={4} value={inquiryForm.message} onChange={e => setInquiryForm({ ...inquiryForm, message: e.target.value })} className="mt-1 rounded-lg bg-white" data-testid="career-inquiry-message" />
                </div>
                <Button type="submit" disabled={submitting} className="rounded-full px-6" style={{ background: '#8B5CF6', color: 'white' }} data-testid="career-inquiry-submit">
                  <Send className="w-4 h-4 mr-2" />
                  {submitting ? 'Submitting...' : 'Submit Inquiry'}
                </Button>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
