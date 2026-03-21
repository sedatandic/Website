import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/FadeIn';
import { getInsights } from '../lib/api';

const categories = ['All', 'Grains', 'Oilseeds', 'Pulses', 'Sugar', 'Coffee', 'Logistics'];

export default function InsightsPage() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const params = {};
    if (activeCategory !== 'All') params.category = activeCategory;
    if (search) params.search = search;
    setLoading(true);
    getInsights(params)
      .then(res => setInsights(res.data))
      .catch(() => setInsights([]))
      .finally(() => setLoading(false));
  }, [activeCategory, search]);

  return (
    <div>
      {/* Hero */}
      <section className="relative" style={{ height: '280px' }}>
        <img src="https://images.pexels.com/photos/6489275/pexels-photo-6489275.jpeg?auto=compress&cs=tinysrgb&w=1260" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.55))' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">Market Insights</h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b" style={{ borderColor: '#e5e7eb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs" style={{ color: '#6b7280' }}>
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Market Insights</span>
          </nav>
        </div>
      </div>

      <section className="py-10 lg:py-14" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <FadeIn>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex flex-wrap gap-2 flex-1">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={activeCategory === cat ? 'default' : 'outline'}
                    size="sm"
                    className="rounded-full text-xs"
                    style={
                      activeCategory === cat
                        ? { background: '#e67e22', color: 'white', border: 'none' }
                        : { borderColor: '#d1d5db', color: '#374151' }
                    }
                    onClick={() => setActiveCategory(cat)}
                    data-testid={`insights-filter-${cat.toLowerCase()}`}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9ca3af' }} />
                <Input
                  placeholder="Search insights..."
                  className="pl-9 rounded-full bg-white"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  data-testid="insights-search-input"
                />
              </div>
            </div>
          </FadeIn>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-xl border p-5 animate-pulse bg-white" style={{ borderColor: '#e5e7eb' }}>
                  <div className="h-40 rounded-lg mb-4 bg-gray-100" />
                  <div className="h-4 rounded w-1/3 mb-3 bg-gray-100" />
                  <div className="h-5 rounded w-2/3 mb-2 bg-gray-100" />
                </div>
              ))}
            </div>
          ) : insights.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm" style={{ color: '#6b7280' }}>No insights found matching your criteria.</p>
            </div>
          ) : (
            <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insights.map((item, i) => (
                <FadeInItem key={item.id}>
                  <Link to={`/insights/${item.slug || item.id}`}>
                    <Card
                      className="group cursor-pointer border overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full bg-white"
                      style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}
                      data-testid={`insights-card-${i}`}
                    >
                      {item.image && (
                        <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                        </div>
                      )}
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs" style={{ background: '#f3f4f6', color: '#374151' }}>{item.category}</Badge>
                          <span className="text-xs" style={{ color: '#9ca3af' }}>{item.read_time}</span>
                        </div>
                        <h3 className="font-semibold text-base mb-2 line-clamp-2" style={{ color: '#1f2937' }}>{item.title}</h3>
                        <p className="text-sm line-clamp-2" style={{ color: '#6b7280' }}>{item.excerpt}</p>
                        <span className="mt-3 text-xs font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: '#e67e22' }}>
                          Read more <ArrowRight className="w-3 h-3" />
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
    </div>
  );
}
