import React from 'react';
import { Wheat } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#0b1220' }} data-testid="site-footer">
      <div className="h-px" style={{ background: 'rgba(217, 164, 65, 0.2)' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Copyrights &copy;{new Date().getFullYear()} All Rights Reserved - GlobalAgri Commodities
        </p>
      </div>
    </footer>
  );
}
