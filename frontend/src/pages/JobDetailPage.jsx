import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Clock, Calendar, Send, CheckCircle, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Skeleton } from '../components/ui/skeleton';
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
    getJob(slug).then(res => setJob(res.data)).catch(() => setJob(null)).finally(() => setLoading(false));
  }, [slug]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) { toast.error('Please fill in name and email'); return; }
    setSubmitting(true);
    try {
      await applyJob({ ...form, job_id: job.id });
      toast.success('Application submitted successfully!');
      setApplied(true);
    } catch (err) {
      toast.error('Failed to submit application.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-20"><Skeleton className="h-8 w-64 mb-4" /><Skeleton className="h-60 w-full rounded-xl" /></div>;
  }

  if (!job) {
    return <div className="text-center py-20"><h2 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>Job not found</h2><Button asChild variant="outline" className="rounded-full"><Link to="/careers"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Careers</Link></Button></div>;
  }

  const postedDate = job.posted_at ? new Date(job.posted_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <div>
      {/* Hero */}
      <section className="relative" style={{ height: '280px' }}>
        <img src="https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=1260" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.55))' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">{job.title}</h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b" style={{ borderColor: '#e5e7eb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs" style={{ color: '#6b7280' }}>
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/careers" className="hover:text-gray-900">Careers</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">{job.title}</span>
          </nav>
        </div>
      </div>

      <section className="py-10 lg:py-14" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <FadeIn className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <Badge variant="secondary" className="text-xs" style={{ background: '#f3f4f6', color: '#374151' }}>
                  <Briefcase className="w-3 h-3 mr-1" /> {job.department}
                </Badge>
                <span className="text-xs flex items-center gap-1" style={{ color: '#6b7280' }}><MapPin className="w-3 h-3" /> {job.location}</span>
                <span className="text-xs flex items-center gap-1" style={{ color: '#6b7280' }}><Clock className="w-3 h-3" /> {job.type}</span>
                {postedDate && <span className="text-xs flex items-center gap-1" style={{ color: '#6b7280' }}><Calendar className="w-3 h-3" /> Posted {postedDate}</span>}
              </div>

              <div className="text-sm sm:text-base leading-relaxed space-y-4" style={{ color: '#4b5563' }}>
                {job.description.split('\n\n').map((para, i) => {
                  if (para.startsWith('**') && para.endsWith('**')) {
                    return <h3 key={i} className="text-lg font-semibold mt-6 mb-3" style={{ color: '#1f2937' }}>{para.replace(/\*\*/g, '')}</h3>;
                  }
                  if (para.startsWith('- ')) {
                    const items = para.split('\n').filter(l => l.startsWith('- '));
                    return <ul key={i} className="list-disc pl-5 space-y-1.5">{items.map((item, j) => <li key={j}>{item.replace('- ', '')}</li>)}</ul>;
                  }
                  const parts = para.split(/\*\*(.*?)\*\*/);
                  return <p key={i}>{parts.map((part, j) => (j % 2 === 1 ? <strong key={j} style={{ color: '#1f2937' }}>{part}</strong> : <span key={j}>{part}</span>))}</p>;
                })}
              </div>

              {job.requirements && job.requirements.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4" style={{ color: '#1f2937' }}>Requirements</h3>
                  <ul className="space-y-2">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#4b5563' }}>
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#8B5CF6' }} />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-10 pt-6 border-t" style={{ borderColor: '#e5e7eb' }}>
                <Button asChild variant="outline" className="rounded-full" style={{ borderColor: '#d1d5db', color: '#374151' }}>
                  <Link to="/careers"><ArrowLeft className="w-4 h-4 mr-1" /> All Positions</Link>
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <Card className="border sticky top-24" style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}>
                <CardContent className="p-6">
                  {applied ? (
                    <div className="text-center py-4">
                      <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: '#22c55e' }} />
                      <h3 className="font-semibold text-base mb-2" style={{ color: '#1f2937' }}>Application Received</h3>
                      <p className="text-sm" style={{ color: '#6b7280' }}>Thank you. We will review and get back to you.</p>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-semibold text-base mb-4" style={{ color: '#1f2937' }}>Apply for this role</h3>
                      <form onSubmit={handleApply} className="space-y-3">
                        <div>
                          <Label htmlFor="a-name" className="text-xs font-medium" style={{ color: '#374151' }}>Full Name *</Label>
                          <Input id="a-name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1 rounded-lg text-sm bg-white" data-testid="job-apply-name" />
                        </div>
                        <div>
                          <Label htmlFor="a-email" className="text-xs font-medium" style={{ color: '#374151' }}>Email *</Label>
                          <Input id="a-email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-1 rounded-lg text-sm bg-white" data-testid="job-apply-email" />
                        </div>
                        <div>
                          <Label htmlFor="a-phone" className="text-xs font-medium" style={{ color: '#374151' }}>Phone</Label>
                          <Input id="a-phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="mt-1 rounded-lg text-sm bg-white" data-testid="job-apply-phone" />
                        </div>
                        <div>
                          <Label htmlFor="a-linkedin" className="text-xs font-medium" style={{ color: '#374151' }}>LinkedIn URL</Label>
                          <Input id="a-linkedin" value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} className="mt-1 rounded-lg text-sm bg-white" data-testid="job-apply-linkedin" />
                        </div>
                        <div>
                          <Label htmlFor="a-cover" className="text-xs font-medium" style={{ color: '#374151' }}>Cover Letter</Label>
                          <Textarea id="a-cover" rows={3} value={form.cover_letter} onChange={e => setForm({ ...form, cover_letter: e.target.value })} className="mt-1 rounded-lg text-sm bg-white" data-testid="job-apply-cover-letter" />
                        </div>
                        <Button type="submit" disabled={submitting} className="w-full rounded-full mt-2" style={{ background: '#8B5CF6', color: 'white' }} data-testid="careers-apply-submit-button">
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
