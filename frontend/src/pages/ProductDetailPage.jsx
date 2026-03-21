import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, MapPin, Users, TrendingUp, FileCheck } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import PageHero from '../components/PageHero';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/FadeIn';

const productData = {
  grains: {
    name: 'Grains',
    tagline: 'Wheat, corn, barley for food and feed applications',
    overview: 'We trade major grains including wheat, corn, and barley, serving millers, feed producers, and traders. Our sourcing network spans key exporting regions, ensuring competitive pricing and reliable supply.',
    origins: ['Black Sea (Ukraine, Russia)', 'European Union', 'Americas (US, Canada, Argentina)', 'Australia'],
    destinations: ['Middle East & North Africa', 'Sub-Saharan Africa', 'Southeast Asia', 'Mediterranean Europe'],
    endUsers: ['Flour millers', 'Feed compounders', 'Food manufacturers', 'Trading houses'],
    specs: ['Milling wheat (various protein levels)', 'Feed wheat', 'Yellow corn / White corn', 'Feed barley / Malting barley'],
    image: 'https://images.pexels.com/photos/6489275/pexels-photo-6489275.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  feedstuff: {
    name: 'Feedstuff',
    tagline: 'Protein-rich feed ingredients for livestock and aquaculture',
    overview: 'We supply protein-rich feed ingredients tailored to the requirements of livestock producers and aquaculture operators. Our feedstuff portfolio includes soybean meal, sunflower meal, DDGS, and other specialty ingredients.',
    origins: ['South America (Brazil, Argentina)', 'Black Sea region', 'European Union', 'United States'],
    destinations: ['Southeast Asia', 'Middle East', 'European Union', 'East Africa'],
    endUsers: ['Feed mills', 'Livestock producers', 'Aquaculture operators', 'Feed traders'],
    specs: ['Soybean meal (Hi-Pro / Lo-Pro)', 'Sunflower meal', 'DDGS (Distillers Dried Grains)', 'Rapeseed meal'],
    image: 'https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  pulses: {
    name: 'Pulses',
    tagline: 'Beans, lentils, chickpeas, and peas from key origins',
    overview: 'We connect pulse-growing regions with global demand centers, offering a range of beans, lentils, chickpeas, and peas for both food and feed applications.',
    origins: ['Canada', 'Australia', 'East Africa (Tanzania, Ethiopia)', 'India', 'Turkey'],
    destinations: ['Indian subcontinent', 'Middle East', 'Mediterranean Europe', 'East Africa'],
    endUsers: ['Food processors', 'Retail wholesalers', 'Canning companies', 'Feed producers'],
    specs: ['Red lentils / Green lentils', 'Kabuli chickpeas / Desi chickpeas', 'Yellow peas / Green peas', 'Kidney beans / Navy beans'],
    image: 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  oilseeds: {
    name: 'Oilseeds',
    tagline: 'Soybeans, sunflower seeds, rapeseed, and related products',
    overview: 'Our oilseed trading covers soybeans, sunflower seeds, rapeseed, and their derivative products. We serve crushers, refiners, and traders with competitive sourcing from major producing regions.',
    origins: ['Brazil', 'Argentina', 'Black Sea (Ukraine)', 'United States', 'Canada'],
    destinations: ['China', 'European Union', 'Middle East', 'Southeast Asia', 'North Africa'],
    endUsers: ['Crushing plants', 'Vegetable oil refiners', 'Biodiesel producers', 'Feed manufacturers'],
    specs: ['Soybeans (GMO / Non-GMO)', 'Sunflower seeds (Oil type / Confectionery)', 'Rapeseed / Canola', 'Soybean oil / Sunflower oil'],
    image: 'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  rice: {
    name: 'Rice',
    tagline: 'Long-grain, medium-grain, and specialty rice varieties',
    overview: 'We trade a diverse range of rice varieties, from commodity-grade long-grain to specialty and aromatic rice, serving importers and distributors across multiple markets.',
    origins: ['Thailand', 'Vietnam', 'India', 'Pakistan', 'Myanmar'],
    destinations: ['West Africa', 'Middle East', 'European Union', 'East Africa'],
    endUsers: ['Rice importers', 'Wholesale distributors', 'Food service companies', 'Retail chains'],
    specs: ['Thai Hom Mali (Jasmine)', 'Vietnamese 5% / 25% broken', 'Indian Basmati', 'Parboiled rice'],
    image: 'https://images.pexels.com/photos/2589454/pexels-photo-2589454.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  sugar: {
    name: 'Sugar',
    tagline: 'Raw and refined sugar for industrial users',
    overview: 'We trade both raw and refined sugar, serving industrial users, food manufacturers, and trading houses. Our supply chain covers major producing and refining regions.',
    origins: ['Brazil', 'Thailand', 'India', 'Central America', 'UAE (refined)'],
    destinations: ['Middle East & North Africa', 'Sub-Saharan Africa', 'Southeast Asia', 'Mediterranean'],
    endUsers: ['Food & beverage manufacturers', 'Confectionery companies', 'Refineries', 'Industrial users'],
    specs: ['Raw sugar (VHP)', 'Refined sugar (ICUMSA 45)', 'Brown sugar', 'Liquid sugar'],
    image: 'https://images.pexels.com/photos/2523650/pexels-photo-2523650.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  coffee: {
    name: 'Coffee',
    tagline: 'Green coffee from major producing regions',
    overview: 'We source green coffee from major producing regions, offering both Arabica and Robusta varieties tailored to roasters, traders, and instant coffee manufacturers.',
    origins: ['Brazil', 'Vietnam', 'Colombia', 'Ethiopia', 'Indonesia'],
    destinations: ['European Union', 'United States', 'Japan', 'Middle East'],
    endUsers: ['Coffee roasters', 'Instant coffee manufacturers', 'Coffee traders', 'Specialty importers'],
    specs: ['Arabica (various grades)', 'Robusta (Grade 1 / Grade 2)', 'Washed / Natural process', 'Specialty single-origin'],
    image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
};

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = productData[slug];

  if (!product) {
    return (
      <div className="ga-section text-center">
        <h2 className="text-xl" style={{ color: 'var(--ga-navy)' }}>Product not found</h2>
        <Link to="/products" className="text-sm mt-4 inline-block" style={{ color: 'var(--ga-gold-2)' }}>Back to products</Link>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title={product.name}
        subtitle={product.tagline}
        breadcrumbs={[
          { label: 'Products', path: '/products' },
          { label: product.name }
        ]}
        image={product.image}
      />

      {/* Overview */}
      <section className="ga-section" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <FadeIn className="lg:col-span-2">
              <h2 className="h-serif text-2xl font-semibold mb-4" style={{ color: 'var(--ga-navy)' }}>Overview</h2>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--ga-muted)' }}>{product.overview}</p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4" style={{ color: 'var(--ga-gold)' }} />
                    <h3 className="font-semibold text-sm" style={{ color: 'var(--ga-navy)' }}>Key Origins</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {product.origins.map(o => (
                      <li key={o} className="text-sm" style={{ color: 'var(--ga-muted)' }}>{o}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4" style={{ color: 'var(--ga-gold)' }} />
                    <h3 className="font-semibold text-sm" style={{ color: 'var(--ga-navy)' }}>Key Destinations</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {product.destinations.map(d => (
                      <li key={d} className="text-sm" style={{ color: 'var(--ga-muted)' }}>{d}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4" style={{ color: 'var(--ga-gold)' }} />
                    <h3 className="font-semibold text-sm" style={{ color: 'var(--ga-navy)' }}>End Users</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {product.endUsers.map(u => (
                      <li key={u} className="text-sm" style={{ color: 'var(--ga-muted)' }}>{u}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FileCheck className="w-4 h-4" style={{ color: 'var(--ga-gold)' }} />
                    <h3 className="font-semibold text-sm" style={{ color: 'var(--ga-navy)' }}>Products & Specs</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {product.specs.map(s => (
                      <li key={s} className="text-sm" style={{ color: 'var(--ga-muted)' }}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* Sidebar */}
            <FadeIn delay={0.15}>
              <Card className="border sticky top-24" style={{ borderColor: 'var(--ga-border)', borderRadius: 'var(--ga-radius-md)' }}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-base mb-3" style={{ color: 'var(--ga-navy)' }}>Interested in {product.name}?</h3>
                  <p className="text-sm mb-5" style={{ color: 'var(--ga-muted)' }}>
                    Tell us about your requirements and our trading desk will respond promptly.
                  </p>
                  <Button asChild className="w-full rounded-full" style={{ background: 'var(--ga-navy)', color: 'white' }}>
                    <Link to={`/contact?product=${slug}`}>Request a Quote <ArrowRight className="w-4 h-4 ml-1" /></Link>
                  </Button>
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--ga-border)' }}>
                    <Link to="/risk-logistics" className="text-xs font-medium inline-flex items-center gap-1" style={{ color: 'var(--ga-gold-2)' }}>
                      Learn about our logistics <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
