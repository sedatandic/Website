import React from 'react';

export default function Footer() {
  return (
    <footer style={{ background: '#f5f5f7' }} data-testid="site-footer">
      <div className="h-px" style={{ background: 'rgba(138,21,56,0.25)' }} />
      <div className="border-t" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs" style={{ color: '#9ca3af' }}>&copy; {new Date().getFullYear()} Peninsula Agritrade LLC. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="text-xs" style={{ color: '#9ca3af' }}>Privacy Policy</span>
              <span className="text-xs" style={{ color: '#9ca3af' }}>Terms of Use</span>
              <span className="text-xs" style={{ color: '#9ca3af' }}>Cookie Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
