import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Briefcase, Clock, Send } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import PageHero from '../components/PageHero';
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
      toast.success('Inquiry submitted successfully! We will be in touch.');
      setInquiryForm({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error('Failed to submit inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHero
        title="Careers"
        subtitle="Join a dynamic team at the intersection of global agriculture, trade, and logistics. We're looking for talented professionals to grow with us."
        breadcrumbs={[{ label: 'Careers' }]}
      />

      {/* Why Join Us */}
      <section className="ga-section" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl">
              <h2 className="h-serif text-2xl sm:text-3xl font-semibold tracking-tight mb-4" style={{ color: 'var(--ga-navy)' }}>
                Why Join GlobalAgri?
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--ga-muted)' }}>
                <p>At GlobalAgri Commodities, you'll work in a fast-paced, entrepreneurial environment where your contributions directly impact the business. We offer global exposure, competitive compensation, and a collaborative culture that values expertise and integrity.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Global exposure', 'Competitive compensation', 'Career growth', 'Collaborative culture', 'Entrepreneurial environment'].map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs" style={{ background: 'var(--ga-surface-2)', color: 'var(--ga-navy)' }}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Open Positions */}
      <section className="ga-section" style={{ background: 'var(--ga-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="h-serif text-2xl sm:text-3xl font-semibold tracking-tight mb-10" style={{ color: 'var(--ga-navy)' }}>
              Open Positions
            </h2>
          </FadeIn>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-xl border p-6 animate-pulse" style={{ borderColor: 'var(--ga-border)', background: 'var(--ga-surface)' }}>
                  <div className="h-5 rounded w-1/3 mb-3" style={{ background: 'var(--ga-border)' }} />
                  <div className="h-4 rounded w-2/3" style={{ background: 'var(--ga-border)' }} />
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm" style={{ color: 'var(--ga-muted)' }}>No open positions at this time. Submit a general inquiry below.</p>
            </div>
          ) : (
            <FadeInStagger className="space-y-4">
              {jobs.map((job) => (
                <FadeInItem key={job.id}>
                  <Link to={`/careers/${job.slug || job.id}`}>
                    <Card
                      className="group cursor-pointer border hover:shadow-lg hover:border-[color:rgba(11,60,93,0.35)] transition-shadow transition-colors duration-200"
                      style={{ borderColor: 'var(--ga-border)', borderRadius: 'var(--ga-radius-md)' }}
                      data-testid={`job-card-${job.slug}`}
                    >
                      <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--ga-navy)' }}>{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-xs flex items-center gap-1" style={{ color: 'var(--ga-muted)' }}>
                              <MapPin className="w-3 h-3" /> {job.location}
                            </span>
                            <span className="text-xs flex items-center gap-1" style={{ color: 'var(--ga-muted)' }}>
                              <Briefcase className="w-3 h-3" /> {job.department}
                            </span>
                            <span className="text-xs flex items-center gap-1" style={{ color: 'var(--ga-muted)' }}>
                              <Clock className="w-3 h-3" /> {job.type}
                            </span>
                          </div>
                          <p className="text-sm mt-2" style={{ color: 'var(--ga-muted)' }}>{job.summary}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="text-xs font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: 'var(--ga-gold-2)' }}>
                            View role <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </FadeInItem>
              ))}
            </FadeInStagger>
          )}
        </div>
      </section>

      {/* General Inquiry Form */}
      <section className="ga-section" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <FadeIn>
              <div>
                <h2 className="h-serif text-2xl sm:text-3xl font-semibold tracking-tight mb-4" style={{ color: 'var(--ga-navy)' }}>
                  General Inquiry
                </h2>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--ga-muted)' }}>
                  Don't see a role that matches your profile? We're always interested in hearing from talented professionals in the commodity trading space. Send us a message and we'll keep your details on file.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <form onSubmit={handleInquiry} className="space-y-4">
                <div>
                  <Label htmlFor="inq-name" className="text-sm font-medium" style={{ color: 'var(--ga-navy)' }}>Name *</Label>
                  <Input
                    id="inq-name"
                    value={inquiryForm.name}
                    onChange={e => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    className="mt-1 rounded-lg"
                    data-testid="career-inquiry-name"
                  />
                </div>
                <div>
                  <Label htmlFor="inq-email" className="text-sm font-medium" style={{ color: 'var(--ga-navy)' }}>Email *</Label>
                  <Input
                    id="inq-email"
                    type="email"
                    value={inquiryForm.email}
                    onChange={e => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    className="mt-1 rounded-lg"
                    data-testid="career-inquiry-email"
                  />
                </div>
                <div>
                  <Label htmlFor="inq-message" className="text-sm font-medium" style={{ color: 'var(--ga-navy)' }}>Message *</Label>
                  <Textarea
                    id="inq-message"
                    rows={4}
                    value={inquiryForm.message}
                    onChange={e => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                    className="mt-1 rounded-lg"
                    data-testid="career-inquiry-message"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full px-6"
                  style={{ background: 'var(--ga-navy)', color: 'white' }}
                  data-testid="career-inquiry-submit"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {submitting ? 'Submitting...' : 'Submit Inquiry'}
                </Button>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Equal Opportunity */}
      <section className="py-10" style={{ background: 'var(--ga-surface-2)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-center leading-relaxed" style={{ color: 'var(--ga-muted)' }}>
            GlobalAgri Commodities is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.
          </p>
        </div>
      </section>
    </div>
  );
}
