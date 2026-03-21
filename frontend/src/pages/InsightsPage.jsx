import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import PageHero from '../components/PageHero';
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
      <PageHero
        title="Market Insights"
        subtitle="Market intelligence that informs every trade. We monitor global fundamentals, freight, and policy developments to support informed decisions."
        breadcrumbs={[{ label: 'Market Insights' }]}
      />

      <section className="ga-section" style={{ background: 'var(--ga-surface)' }}>
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
                        ? { background: 'var(--ga-navy)', color: 'white' }
                        : { borderColor: 'var(--ga-border)', color: 'var(--ga-navy)' }
                    }
                    onClick={() => setActiveCategory(cat)}
                    data-testid={`insights-filter-${cat.toLowerCase()}`}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--ga-muted)' }} />
                <Input
                  placeholder="Search insights..."
                  className="pl-9 rounded-full"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  data-testid="insights-search-input"
                />
              </div>
            </div>
          </FadeIn>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-xl border p-5 animate-pulse" style={{ borderColor: 'var(--ga-border)', background: 'var(--ga-surface-2)' }}>
                  <div className="h-40 rounded-lg mb-4" style={{ background: 'var(--ga-border)' }} />
                  <div className="h-4 rounded w-1/3 mb-3" style={{ background: 'var(--ga-border)' }} />
                  <div className="h-5 rounded w-2/3 mb-2" style={{ background: 'var(--ga-border)' }} />
                  <div className="h-4 rounded w-full" style={{ background: 'var(--ga-border)' }} />
                </div>
              ))}
            </div>
          ) : insights.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm" style={{ color: 'var(--ga-muted)' }}>No insights found matching your criteria.</p>
            </div>
          ) : (
            <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insights.map((item, i) => (
                <FadeInItem key={item.id}>
                  <Link to={`/insights/${item.slug || item.id}`}>
                    <Card
                      className="group cursor-pointer border overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full"
                      style={{ borderColor: 'var(--ga-border)', borderRadius: 'var(--ga-radius-md)' }}
                      data-testid={`insights-card-${i}`}
                    >
                      {item.image && (
                        <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs" style={{ background: 'var(--ga-surface-2)', color: 'var(--ga-navy)' }}>
                            {item.category}
                          </Badge>
                          <span className="text-xs" style={{ color: 'var(--ga-muted)' }}>{item.read_time}</span>
                        </div>
                        <h3 className="font-semibold text-base mb-2 line-clamp-2" style={{ color: 'var(--ga-navy)' }}>{item.title}</h3>
                        <p className="text-sm line-clamp-2" style={{ color: 'var(--ga-muted)' }}>{item.excerpt}</p>
                        <span className="mt-3 text-xs font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: 'var(--ga-gold-2)' }}>
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
