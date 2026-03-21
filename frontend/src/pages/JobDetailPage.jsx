import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Clock, Calendar, Send, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Skeleton } from '../components/ui/skeleton';
import PageHero from '../components/PageHero';
import { FadeIn } from '../components/FadeIn';
import { getJob, applyJob } from '../lib/api';
import { toast } from 'sonner';

export default function JobDetailPage() {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', phone: '', linkedin: '', cover_letter: '' });
  const [submitting, setSubmitting] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    setLoading(true);
    getJob(slug)
      .then(res => setJob(res.data))
      .catch(() => setJob(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error('Please fill in name and email');
      return;
    }
    setSubmitting(true);
    try {
      await applyJob({ ...form, job_id: job.id });
      toast.success('Application submitted successfully!');
      setApplied(true);
    } catch (err) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-6 w-96 mb-8" />
        <Skeleton className="h-60 w-full rounded-xl" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--ga-navy)' }}>Job not found</h2>
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/careers"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Careers</Link>
        </Button>
      </div>
    );
  }

  const postedDate = job.posted_at ? new Date(job.posted_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <div>
      <PageHero
        title={job.title}
        subtitle={job.summary}
        breadcrumbs={[
          { label: 'Careers', path: '/careers' },
          { label: job.title }
        ]}
      />

      <section className="ga-section" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Job Details */}
            <FadeIn className="lg:col-span-2">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <Badge variant="secondary" className="text-xs" style={{ background: 'var(--ga-surface-2)', color: 'var(--ga-navy)' }}>
                  <Briefcase className="w-3 h-3 mr-1" /> {job.department}
                </Badge>
                <span className="text-xs flex items-center gap-1" style={{ color: 'var(--ga-muted)' }}>
                  <MapPin className="w-3 h-3" /> {job.location}
                </span>
                <span className="text-xs flex items-center gap-1" style={{ color: 'var(--ga-muted)' }}>
                  <Clock className="w-3 h-3" /> {job.type}
                </span>
                {postedDate && (
                  <span className="text-xs flex items-center gap-1" style={{ color: 'var(--ga-muted)' }}>
                    <Calendar className="w-3 h-3" /> Posted {postedDate}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="text-sm sm:text-base leading-relaxed space-y-4" style={{ color: 'var(--ga-muted)' }}>
                {job.description.split('\n\n').map((para, i) => {
                  if (para.startsWith('**') && para.endsWith('**')) {
                    return <h3 key={i} className="h-serif text-lg font-semibold mt-6 mb-3" style={{ color: 'var(--ga-navy)' }}>{para.replace(/\*\*/g, '')}</h3>;
                  }
                  if (para.startsWith('- ')) {
                    const items = para.split('\n').filter(l => l.startsWith('- '));
                    return (
                      <ul key={i} className="list-disc pl-5 space-y-1.5">
                        {items.map((item, j) => <li key={j}>{item.replace('- ', '')}</li>)}
                      </ul>
                    );
                  }
                  const parts = para.split(/\*\*(.*?)\*\*/);
                  return (
                    <p key={i}>
                      {parts.map((part, j) => (
                        j % 2 === 1
                          ? <strong key={j} style={{ color: 'var(--ga-navy)' }}>{part}</strong>
                          : <span key={j}>{part}</span>
                      ))}
                    </p>
                  );
                })}
              </div>

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <div className="mt-8">
                  <h3 className="h-serif text-lg font-semibold mb-4" style={{ color: 'var(--ga-navy)' }}>Requirements</h3>
                  <ul className="space-y-2">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--ga-muted)' }}>
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--ga-gold)' }} />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-10 pt-6 border-t" style={{ borderColor: 'var(--ga-border)' }}>
                <Button asChild variant="outline" className="rounded-full" style={{ borderColor: 'var(--ga-navy)', color: 'var(--ga-navy)' }}>
                  <Link to="/careers"><ArrowLeft className="w-4 h-4 mr-1" /> All Positions</Link>
                </Button>
              </div>
            </FadeIn>

            {/* Apply Sidebar */}
            <FadeIn delay={0.15}>
              <Card className="border sticky top-24" style={{ borderColor: 'var(--ga-border)', borderRadius: 'var(--ga-radius-md)' }}>
                <CardContent className="p-6">
                  {applied ? (
                    <div className="text-center py-4">
                      <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--ga-success)' }} />
                      <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--ga-navy)' }}>Application Received</h3>
                      <p className="text-sm" style={{ color: 'var(--ga-muted)' }}>Thank you for your interest. We will review your application and get back to you.</p>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-semibold text-base mb-4" style={{ color: 'var(--ga-navy)' }}>Apply for this role</h3>
                      <form onSubmit={handleApply} className="space-y-3">
                        <div>
                          <Label htmlFor="apply-name" className="text-xs font-medium" style={{ color: 'var(--ga-navy)' }}>Full Name *</Label>
                          <Input
                            id="apply-name"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            className="mt-1 rounded-lg text-sm"
                            data-testid="job-apply-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="apply-email" className="text-xs font-medium" style={{ color: 'var(--ga-navy)' }}>Email *</Label>
                          <Input
                            id="apply-email"
                            type="email"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            className="mt-1 rounded-lg text-sm"
                            data-testid="job-apply-email"
                          />
                        </div>
                        <div>
                          <Label htmlFor="apply-phone" className="text-xs font-medium" style={{ color: 'var(--ga-navy)' }}>Phone</Label>
                          <Input
                            id="apply-phone"
                            value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                            className="mt-1 rounded-lg text-sm"
                            data-testid="job-apply-phone"
                          />
                        </div>
                        <div>
                          <Label htmlFor="apply-linkedin" className="text-xs font-medium" style={{ color: 'var(--ga-navy)' }}>LinkedIn URL</Label>
                          <Input
                            id="apply-linkedin"
                            value={form.linkedin}
                            onChange={e => setForm({ ...form, linkedin: e.target.value })}
                            className="mt-1 rounded-lg text-sm"
                            data-testid="job-apply-linkedin"
                          />
                        </div>
                        <div>
                          <Label htmlFor="apply-cover" className="text-xs font-medium" style={{ color: 'var(--ga-navy)' }}>Cover Letter</Label>
                          <Textarea
                            id="apply-cover"
                            rows={3}
                            value={form.cover_letter}
                            onChange={e => setForm({ ...form, cover_letter: e.target.value })}
                            className="mt-1 rounded-lg text-sm"
                            data-testid="job-apply-cover-letter"
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={submitting}
                          className="w-full rounded-full mt-2"
                          style={{ background: 'var(--ga-navy)', color: 'white' }}
                          data-testid="careers-apply-submit-button"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          {submitting ? 'Submitting...' : 'Submit Application'}
                        </Button>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
