import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/FadeIn';

const tabs = [
  { id: 'at-a-glance', label: 'At A Glance' },
  { id: 'grains-feeds', label: 'Grains & Feeds' },
  { id: 'oilseeds', label: 'Oilseeds' },
  { id: 'pulses-beans', label: 'Pulses & Beans' },
  { id: 'sugar-rice', label: 'Sugar & Rice' },
  { id: 'coffee', label: 'Coffee Beans' },
];

const heroImages = {
  'at-a-glance': 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=1260',
  'grains-feeds': 'https://images.pexels.com/photos/6489275/pexels-photo-6489275.jpeg?auto=compress&cs=tinysrgb&w=1260',
  'oilseeds': 'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=1260',
  'pulses-beans': 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=1260',
  'sugar-rice': 'https://images.pexels.com/photos/2523650/pexels-photo-2523650.jpeg?auto=compress&cs=tinysrgb&w=1260',
  'coffee': 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260',
};

const commodityData = {
  'grains-feeds': [
    { name: 'Milling Wheat / Feed Wheat', image: 'https://images.pexels.com/photos/41959/food-grains-bread-wheat-cereals-41959.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Yellow Corn', image: 'https://images.unsplash.com/photo-1613728913293-c99bb00ef39c?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
    { name: 'Feed Barley / Feed Oats', image: 'https://images.unsplash.com/photo-1633101143189-d28a58810351?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
    { name: 'Sorghum', image: 'https://images.unsplash.com/photo-1634666328718-ad6af3112aff?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
    { name: 'Soybean Meal / Sunflower Meal', image: 'https://images.unsplash.com/photo-1549800191-5602c93c0151?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
    { name: 'DDGS & Sugar Beet Pulp Pellets', image: 'https://images.unsplash.com/photo-1549800191-5602c93c0151?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
    { name: 'Yellow Millet', image: 'https://images.unsplash.com/photo-1628317321557-68729bee6644?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
    { name: 'Wheat Bran Pellets (WBP)', image: 'https://images.unsplash.com/photo-1549800191-5602c93c0151?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
  ],
  'oilseeds': [
    { name: 'Soybeans', image: 'https://images.unsplash.com/photo-1639843606783-b2f9c50a7468?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
    { name: 'Rapeseeds', image: 'https://images.unsplash.com/photo-1780223263804-2bc8fc3f7f0f?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
    { name: 'Mustard Seeds', image: 'https://images.pexels.com/photos/18346906/pexels-photo-18346906.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Flaxseeds', image: 'https://images.unsplash.com/photo-1642497393790-c5751b818e1b?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
    { name: 'Sunflower Seeds', image: 'https://images.pexels.com/photos/10111742/pexels-photo-10111742.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Sesame Seeds', image: 'https://images.pexels.com/photos/7420888/pexels-photo-7420888.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Niger Seeds', image: 'https://images.unsplash.com/photo-1642497393790-c5751b818e1b?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
    { name: 'Peanuts', image: 'https://images.pexels.com/photos/33501329/pexels-photo-33501329.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ],
  'pulses-beans': [
    { name: 'Chickpeas (Kabuli / Desi)', image: 'https://images.unsplash.com/photo-1644432757699-bb5a01e8fb0e?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
    { name: 'Red Lentils', image: 'https://images.unsplash.com/photo-1614373532201-c40b993f0013?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
    { name: 'Green Lentils', image: 'https://images.unsplash.com/photo-1770617475579-db217d1c6059?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
    { name: 'Yellow Peas / Green Peas', image: 'https://images.unsplash.com/photo-1780478238047-13e4e6c07cba?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
    { name: 'Kidney Beans', image: 'https://images.unsplash.com/photo-1763368397625-32c8f75fed44?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
    { name: 'Navy Beans', image: 'https://images.unsplash.com/photo-1599249478506-ae175f801b1e?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
    { name: 'Mung Beans', image: 'https://images.unsplash.com/photo-1758701925687-1449ab265c2e?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
    { name: 'Black Eyed Peas', image: 'https://images.unsplash.com/photo-1515347272087-685ce5a1fc8b?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
  ],
  'sugar-rice': [
    { name: 'Raw Sugar (VHP)', image: 'https://images.pexels.com/photos/19123122/pexels-photo-19123122.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Refined Sugar (ICUMSA 45)', image: 'https://images.unsplash.com/photo-1709651808265-977ed7ef78c6?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
    { name: 'Thai Hom Mali Rice', image: 'https://images.pexels.com/photos/36346840/pexels-photo-36346840.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Vietnamese 5% Broken', image: 'https://images.pexels.com/photos/36346840/pexels-photo-36346840.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Indian Basmati', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
    { name: 'Parboiled Rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
  ],
  'coffee': [
    { name: 'Arabica (Various Grades)', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?crop=entropy&cs=srgb&fm=jpg&q=85&w=400' },
    { name: 'Robusta (Grade 1 / Grade 2)', image: 'https://images.pexels.com/photos/30444143/pexels-photo-30444143.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Washed / Natural Process', image: 'https://images.pexels.com/photos/7125599/pexels-photo-7125599.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Specialty Single-Origin', image: 'https://images.pexels.com/photos/16682442/pexels-photo-16682442.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ],
};

export default function CommoditiesPage() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const activeTab = tab || 'at-a-glance';
  const currentTitle = tabs.find(t => t.id === activeTab)?.label || 'Commodities';
  const products = commodityData[activeTab] || [];

  return (
    <div>

      {/* Breadcrumb */}
      <div className="bg-white border-b" style={{ borderColor: '#e5e7eb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs" style={{ color: '#6b7280' }}>
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span>Commodities</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">{currentTitle}</span>
          </nav>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b" style={{ borderColor: '#e5e7eb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => navigate(`/commodities/${t.id}`)}
                className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === t.id
                    ? 'border-[#8A1538] text-[#8A1538]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
                data-testid={`commodity-tab-${t.id}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 lg:py-16" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {activeTab === 'at-a-glance' && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-stretch">
              {/* Left - text */}
              <FadeIn className="lg:col-span-3">
                <h2 className="text-2xl font-semibold mb-6" style={{ color: '#1f2937' }}>At A Glance</h2>
                <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: '#4b5563' }}>
                  <p>Peninsula Agritrade LLC maintains strong global connectivity with suppliers and buyers, enabling us to source and originate commodities that meet each buyer's exact specifications. Our extensive market experience and long-standing commercial relationships — built on trust and proven performance — allow us to deliver quality goods reliably and on time.</p>
                  <p>Our niche expertise in serving buyers across the Middle East, South Asia, and Southeast Asia has created a strong and enduring market presence. These regions represent our core demand centers, where we have developed deep rapport and consistent commercial alignment over the years.</p>
                  <p>We complement this demand-side strength with robust origination capabilities across the Black Sea region, East and West Africa, and South America. This diversified sourcing footprint ensures reliable supply and enhances our ability to serve multiple markets under varying conditions.</p>
                  <p>Our experience in global agri-trading — combined with strong logistics execution and soft-commodity trade-finance capabilities — enables Peninsula Agritrade LLC to perform with discipline and consistency, even in volatile market environments. We operate with a firm commitment to fair trade and uphold our contractual obligations with steadfast reliability.</p>
                </div>
              </FadeIn>

              {/* Right - related imagery */}
              <FadeIn delay={0.15} className="lg:col-span-2">
                <div className="rounded-xl overflow-hidden shadow-sm border w-full relative" style={{ borderColor: '#e5e7eb', height: 'calc(100% - 3.5rem)', marginTop: '3.5rem', minHeight: '260px' }}>
                  <img src="https://images.unsplash.com/photo-1613690399151-65ea69478674?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000" alt="Global agri-commodity trade" className="absolute inset-0 w-full h-full object-cover" data-testid="glance-hero-image" />
                </div>
              </FadeIn>
            </div>
          )}

          {products.length > 0 && (
            <FadeIn>
              <h2 className="text-2xl font-semibold mb-8" style={{ color: '#1f2937' }}>{currentTitle}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.map((p, i) => (
                  <div
                    key={p.id || p.name || i}
                    className="group bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow duration-200"
                    style={{ borderColor: '#e5e7eb' }}
                    data-testid={`commodity-item-${i}`}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3 text-center">
                      <span className="text-sm font-medium" style={{ color: '#374151' }}>{p.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}

        </div>
      </section>
    </div>
  );
}
