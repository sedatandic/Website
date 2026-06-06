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
  { id: 'coffee', label: 'Coffee' },
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
    { name: 'Milling Wheat / Feed Wheat', image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Yellow Corn', image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Feed Barley / Feed Oats', image: 'https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Sorghum', image: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Soybean Meal / Sunflower Meal', image: 'https://images.pexels.com/photos/6489275/pexels-photo-6489275.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'DDGS & Sugar Beet Pulp Pellets', image: 'https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Yellow Millet', image: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Wheat Bran Pellets (WBP)', image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ],
  'oilseeds': [
    { name: 'Soybeans', image: 'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Rapeseeds', image: 'https://images.pexels.com/photos/2589454/pexels-photo-2589454.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Mustard Seeds', image: 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Flaxseeds', image: 'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Sunflower Seeds', image: 'https://images.pexels.com/photos/2589454/pexels-photo-2589454.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Sesame Seeds', image: 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Niger Seeds', image: 'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Peanuts', image: 'https://images.pexels.com/photos/2589454/pexels-photo-2589454.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ],
  'pulses-beans': [
    { name: 'Chickpeas (Kabuli / Desi)', image: 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Red Lentils', image: 'https://images.pexels.com/photos/2589454/pexels-photo-2589454.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Green Lentils', image: 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Yellow Peas / Green Peas', image: 'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Kidney Beans', image: 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Navy Beans', image: 'https://images.pexels.com/photos/2589454/pexels-photo-2589454.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Mung Beans', image: 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Black Eyed Peas', image: 'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ],
  'sugar-rice': [
    { name: 'Raw Sugar (VHP)', image: 'https://images.pexels.com/photos/2523650/pexels-photo-2523650.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Refined Sugar (ICUMSA 45)', image: 'https://images.pexels.com/photos/2523650/pexels-photo-2523650.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Thai Hom Mali Rice', image: 'https://images.pexels.com/photos/2589454/pexels-photo-2589454.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Vietnamese 5% Broken', image: 'https://images.pexels.com/photos/2589454/pexels-photo-2589454.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Indian Basmati', image: 'https://images.pexels.com/photos/2589454/pexels-photo-2589454.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Parboiled Rice', image: 'https://images.pexels.com/photos/2589454/pexels-photo-2589454.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ],
  'coffee': [
    { name: 'Arabica (Various Grades)', image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Robusta (Grade 1 / Grade 2)', image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Washed / Natural Process', image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Specialty Single-Origin', image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400' },
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
      {/* Hero */}
      <section className="relative" style={{ height: '280px' }}>
        <img src={heroImages[activeTab] || heroImages['at-a-glance']} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.55))' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">{currentTitle}</h1>
        </div>
      </section>

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
                    ? 'border-[#8B5CF6] text-[#8B5CF6]'
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {activeTab === 'at-a-glance' && (
            <FadeIn>
              <h2 className="text-2xl font-semibold mb-6" style={{ color: '#1f2937' }}>At A Glance</h2>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: '#4b5563' }}>
                <p>Peninsula Agritrade LLC is well-connected with suppliers & buyers globally therefore able to source and originate commodities that meet each buyers' specifications.</p>
                <p>Our vast experience in these markets and excellent commercial relationships with our counterparties and their proven track record enables us to deliver quality goods in a timely manner.</p>
                <p>On the other hand, our niche focus and expertise in dealing with buyers in Middle East, South Asia and Southeast-Asian regions enabled us to find greater market where we have great rapport built over the years.</p>
                <p>In view of our wealth of experience in agri-trading, the experience gained enable us to perform in a steadfast manner regardless of the challenges in market conditions. We believe strongly in fair trade and always endeavor to deliver on our contractual promises.</p>
              </div>
            </FadeIn>
          )}

          {products.length > 0 && (
            <FadeIn>
              <h2 className="text-2xl font-semibold mb-8" style={{ color: '#1f2937' }}>{currentTitle}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.map((p, i) => (
                  <div
                    key={i}
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
