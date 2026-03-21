import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function PageHero({ title, subtitle, breadcrumbs = [], image }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: image
          ? undefined
          : 'linear-gradient(180deg, rgba(11,60,93,0.95) 0%, rgba(11,60,93,0.85) 100%)',
      }}
    >
      {image && (
        <>
          <div className="absolute inset-0">
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(11,60,93,0.78) 0%, rgba(11,60,93,0.62) 45%, rgba(11,60,93,0.82) 100%)' }}
          />
        </>
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-sm mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                <ChevronRight className="w-3.5 h-3.5" />
                {crumb.path ? (
                  <Link to={crumb.path} className="hover:text-white transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="h-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-base sm:text-lg max-w-2xl" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
