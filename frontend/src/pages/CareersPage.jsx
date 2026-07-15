import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Briefcase, Clock, Send, ChevronRight, Paperclip } from 'lucide-react';
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
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', message: '', website: '' });
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getJobs()
      .then(res => setJobs(res.data))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) { setResumeFile(null); return; }
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['pdf', 'doc', 'docx'].includes(ext)) {
      toast.error('Resume must be a PDF, DOC, or DOCX file');
      e.target.value = '';
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Resume must be under 10MB');
      e.target.value = '';
      return;
    }
    setResumeFile(file);
  };

  const handleInquiry = async (e) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('name', inquiryForm.name);
      fd.append('email', inquiryForm.email);
      fd.append('message', inquiryForm.message);
      fd.append('website', inquiryForm.website);
      if (resumeFile) fd.append('resume', resumeFile);
      await submitCareerInquiry(fd);
      toast.success('Inquiry submitted successfully!');
      setInquiryForm({ name: '', email: '', message: '', website: '' });
      setResumeFile(null);
    } catch (err) {
      toast.error('Failed to submit inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative" style={{ height: '140px' }}>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1f2937' }}>Why Join Peninsula Agritrade?</h2>
            <p className="text-sm sm:text-base leading-relaxed mb-6 max-w-3xl" style={{ color: '#4b5563' }}>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-semibold mb-8" style={{ color: '#1f2937' }}>Open Positions</h2>
          </FadeIn>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="rounded-xl border p-6 animate-pulse bg-white" style={{ borderColor: '#e5e7eb' }}>
                  <div className="h-5 rounded w-2/3 mb-3 bg-gray-100" />
                  <div className="h-4 rounded w-full bg-gray-100" />
                </div>
              ))}
            </div>
          ) : (
            <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {jobs.slice(0, 6).map((job) => (
                <FadeInItem key={job.id} className="h-full">
                  <Link to={`/careers/${job.slug || job.id}`} className="block h-full">
                    <Card
                      className="group cursor-pointer border hover:shadow-lg transition-shadow duration-200 bg-white h-full"
                      style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}
                      data-testid={`job-card-${job.slug}`}
                    >
                      <CardContent className="p-6 flex flex-col h-full">
                        <h3 className="font-semibold text-base mb-3" style={{ color: '#1f2937' }}>{job.title}</h3>
                        <div className="flex flex-col gap-1.5 mb-3">
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
                        <p className="text-sm mb-4 flex-1" style={{ color: '#6b7280' }}>{job.summary}</p>
                        <span className="text-xs font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: '#8A1538' }}>
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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-semibold mb-3" style={{ color: '#1f2937' }}>General Inquiry</h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#4b5563' }}>
              Don't see a matching role? Send us a message and we'll keep your details on file.
            </p>
            <form onSubmit={handleInquiry} className="space-y-4">
              <input type="text" tabIndex={-1} autoComplete="off" value={inquiryForm.website} onChange={e => setInquiryForm({ ...inquiryForm, website: e.target.value })} style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} aria-hidden="true" data-testid="inquiry-honeypot" />
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
              <div>
                <Label htmlFor="inq-resume" className="text-sm font-medium" style={{ color: '#374151' }}>CV / Resume <span className="text-xs font-normal" style={{ color: '#9ca3af' }}>(PDF, DOC, DOCX — optional)</span></Label>
                <label htmlFor="inq-resume" className="mt-1 flex items-center gap-3 rounded-lg border border-dashed px-4 py-3 cursor-pointer bg-white hover:bg-gray-50 transition-colors" style={{ borderColor: '#d1d5db' }} data-testid="career-inquiry-resume-label">
                  <Paperclip className="w-4 h-4 flex-shrink-0" style={{ color: '#8A1538' }} />
                  <span className="text-sm truncate" style={{ color: resumeFile ? '#1f2937' : '#9ca3af' }}>
                    {resumeFile ? resumeFile.name : 'Attach your CV or resume'}
                  </span>
                </label>
                <input id="inq-resume" type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} className="hidden" data-testid="career-inquiry-resume" />
              </div>
              <Button type="submit" disabled={submitting} className="rounded-full px-6" style={{ background: '#8A1538', color: 'white' }} data-testid="career-inquiry-submit">
                <Send className="w-4 h-4 mr-2" />
                {submitting ? 'Submitting...' : 'Submit Inquiry'}
              </Button>
            </form>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
