import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, ChevronRight } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { FadeIn } from '../components/FadeIn';
import { getInsight } from '../lib/api';

export default function InsightDetailPage() {
  const { id } = useParams();
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getInsight(id)
      .then(res => setInsight(res.data))
      .catch(() => setInsight(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-6 w-96 mb-8" />
        <Skeleton className="h-60 w-full rounded-xl mb-6" />
        <Skeleton className="h-4 w-full mb-2" />
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>Insight not found</h2>
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/insights"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Insights</Link>
        </Button>
      </div>
    );
  }

  const formattedDate = insight.date ? new Date(insight.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <div>
      {/* Hero */}
      <section className="relative" style={{ height: '140px' }}>
        <img src={insight.image || 'https://images.pexels.com/photos/6489275/pexels-photo-6489275.jpeg?auto=compress&cs=tinysrgb&w=1260'} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.55))' }} />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight text-center max-w-3xl">{insight.title}</h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b" style={{ borderColor: '#e5e7eb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs" style={{ color: '#6b7280' }}>
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/insights" className="hover:text-gray-900">Insights</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{insight.title}</span>
          </nav>
        </div>
      </div>

      <section className="py-10 lg:py-14" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <FadeIn className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <Badge variant="secondary" className="text-xs" style={{ background: '#f3f4f6', color: '#374151' }}>
                  <Tag className="w-3 h-3 mr-1" /> {insight.category}
                </Badge>
                {insight.date && (
                  <span className="text-xs flex items-center gap-1" style={{ color: '#9ca3af' }}>
                    <Calendar className="w-3 h-3" /> {formattedDate}
                  </span>
                )}
                {insight.read_time && (
                  <span className="text-xs flex items-center gap-1" style={{ color: '#9ca3af' }}>
                    <Clock className="w-3 h-3" /> {insight.read_time}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {insight.content.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return <h3 key={i} className="text-lg font-semibold mt-6 mb-3" style={{ color: '#1f2937' }}>{paragraph.replace(/\*\*/g, '')}</h3>;
                  }
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n').filter(l => l.startsWith('- '));
                    return (
                      <ul key={i} className="list-disc pl-5 space-y-1.5 my-3">
                        {items.map((item, j) => (
                          <li key={j} className="text-sm leading-relaxed" style={{ color: '#4b5563' }}>{item.replace('- ', '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  const parts = paragraph.split(/\*\*(.*?)\*\*/);
                  return (
                    <p key={i} className="text-sm sm:text-base leading-relaxed" style={{ color: '#4b5563' }}>
                      {parts.map((part, j) => (
                        j % 2 === 1
                          ? <strong key={j} style={{ color: '#1f2937' }}>{part}</strong>
                          : <span key={j}>{part}</span>
                      ))}
                    </p>
                  );
                })}
              </div>

              <div className="mt-10 pt-6 border-t" style={{ borderColor: '#e5e7eb' }}>
                <Button asChild variant="outline" className="rounded-full" style={{ borderColor: '#d1d5db', color: '#374151' }}>
                  <Link to="/insights"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Insights</Link>
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <Card className="border sticky top-24" style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-base mb-3" style={{ color: '#1f2937' }}>Need more details?</h3>
                  <p className="text-sm mb-5" style={{ color: '#6b7280' }}>
                    Contact our trading desk to discuss how this market update may affect your requirements.
                  </p>
                  <Button asChild className="w-full rounded-full" style={{ background: '#8A1538', color: 'white' }}>
                    <Link to="/contact">Contact Trading Desk</Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
