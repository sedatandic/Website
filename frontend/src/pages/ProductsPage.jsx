import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wheat, Leaf, Bean, Droplets, Coffee, CandyCane } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import PageHero from '../components/PageHero';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/FadeIn';

const products = [
  {
    name: 'Grains', slug: 'grains', icon: Wheat,
    desc: 'Wheat, corn, barley, and other grains for food and feed applications, sourced from key origins.',
    origins: 'Black Sea, Europe, Americas',
    image: 'https://images.pexels.com/photos/6489275/pexels-photo-6489275.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Feedstuff', slug: 'feedstuff', icon: Leaf,
    desc: 'Protein-rich feed ingredients tailored to livestock and aquaculture requirements worldwide.',
    origins: 'South America, Black Sea, Europe',
    image: 'https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Pulses', slug: 'pulses', icon: Bean,
    desc: 'Beans, lentils, chickpeas, and peas, connecting farmers to global demand centers.',
    origins: 'Canada, Australia, East Africa, India',
    image: 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Oilseeds', slug: 'oilseeds', icon: Droplets,
    desc: 'Soybeans, sunflower seeds, rapeseed, and related products for crushers and traders.',
    origins: 'Brazil, Argentina, Black Sea, US',
    image: 'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Rice', slug: 'rice', icon: Wheat,
    desc: 'Long-grain, medium-grain, and specialty rice varieties for diverse markets.',
    origins: 'Thailand, Vietnam, India, Pakistan',
    image: 'https://images.pexels.com/photos/2589454/pexels-photo-2589454.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Sugar', slug: 'sugar', icon: CandyCane,
    desc: 'Raw and refined sugar for industrial users, sourced from major producing regions.',
    origins: 'Brazil, Thailand, India, Central America',
    image: 'https://images.pexels.com/photos/2523650/pexels-photo-2523650.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Coffee', slug: 'coffee', icon: Coffee,
    desc: 'Green coffee from major producing regions, tailored to roasters and traders.',
    origins: 'Brazil, Vietnam, Colombia, Ethiopia',
    image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
];

export default function ProductsPage() {
  return (
    <div>
      <PageHero
        title="Products & Markets"
        subtitle="We trade seven core commodity categories, connecting reliable origins with industrial buyers, food manufacturers, and traders worldwide."
        breadcrumbs={[{ label: 'Products & Markets' }]}
      />

      <section className="ga-section" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => {
              const Icon = p.icon;
              return (
                <FadeInItem key={p.slug}>
                  <Link to={`/products/${p.slug}`}>
                    <Card
                      className="group cursor-pointer border overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full"
                      style={{ borderColor: 'var(--ga-border)', borderRadius: 'var(--ga-radius-md)' }}
                      data-testid={`product-card-${p.slug}`}
                    >
                      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="text-xs font-medium" style={{ background: 'var(--ga-navy)', color: 'white' }}>
                            <Icon className="w-3 h-3 mr-1" />
                            {p.name}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--ga-navy)' }}>{p.name}</h3>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--ga-muted)' }}>{p.desc}</p>
                        <div className="text-xs font-medium" style={{ color: 'var(--ga-muted)' }}>
                          <span style={{ color: 'var(--ga-navy)' }}>Key origins:</span> {p.origins}
                        </div>
                        <span className="mt-4 text-xs font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: 'var(--ga-gold-2)' }}>
                          Learn more <ArrowRight className="w-3 h-3" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>
    </div>
  );
}
