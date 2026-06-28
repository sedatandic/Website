import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SUFFIX = 'Peninsula Agritrade LLC';

const titleMap = {
  '/': 'Global Agri-Commodity Trading',
  '/about': 'About Us',
  '/commodities': 'Our Commodities',
  '/partners': 'Our Partners',
  '/contact': 'Contact Us',
  '/careers': 'Careers',
  '/insights': 'Market Insights',
};

const toTitle = (segment) =>
  segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export default function PageTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    let label = titleMap[pathname];
    if (!label) {
      const base = '/' + pathname.split('/').filter(Boolean)[0];
      const last = pathname.split('/').filter(Boolean).pop() || '';
      label = titleMap[base] ? `${toTitle(last)} — ${titleMap[base]}` : toTitle(last);
    }
    document.title = label ? `${label} | ${SUFFIX}` : SUFFIX;
  }, [pathname]);

  return null;
}
