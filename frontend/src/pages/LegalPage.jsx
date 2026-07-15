import React from 'react';
import { useLocation } from 'react-router-dom';

const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    intro: 'Peninsula Agritrade LLC respects your privacy and is committed to protecting the personal information you share with us.',
    sections: [
      { h: 'Information We Collect', p: 'We collect information you provide directly — such as your name, email, company and message — when you contact us or apply for a role. We may also collect limited technical data (such as browser type and pages visited) to improve our website.' },
      { h: 'How We Use Information', p: 'We use your information to respond to enquiries, process job applications, provide our trading services, and improve our communications. We do not sell your personal data to third parties.' },
      { h: 'Data Retention', p: 'We retain personal information only for as long as necessary to fulfil the purposes described in this policy or as required by applicable law.' },
      { h: 'Contact', p: 'For any privacy-related questions, please contact us at info@peninsula.com.qa.' },
    ],
  },
  terms: {
    title: 'Terms of Use',
    intro: 'By accessing and using this website, you agree to the following terms and conditions.',
    sections: [
      { h: 'Use of the Website', p: 'This website is provided for general information about Peninsula Agritrade LLC and its services. Content may be updated or changed at any time without notice.' },
      { h: 'Intellectual Property', p: 'All content, logos, and materials on this website are the property of Peninsula Agritrade LLC and may not be reproduced without prior written consent.' },
      { h: 'No Warranty', p: 'While we strive for accuracy, information on this website is provided "as is" without warranties of any kind. Nothing here constitutes a binding offer or trading commitment.' },
      { h: 'Governing Law', p: 'These terms are governed by the laws of the State of Qatar.' },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    intro: 'This website uses minimal cookies and similar technologies to ensure the site functions correctly and to understand how it is used.',
    sections: [
      { h: 'What Are Cookies', p: 'Cookies are small text files stored on your device that help websites work and provide usage information.' },
      { h: 'How We Use Cookies', p: 'We use essential cookies for core site functionality and, where applicable, analytics cookies to improve the user experience. We do not use cookies for advertising.' },
      { h: 'Managing Cookies', p: 'You can control or delete cookies through your browser settings. Disabling cookies may affect some website features.' },
    ],
  },
};

export default function LegalPage() {
  const { pathname } = useLocation();
  const doc = pathname.replace('/', '');
  const data = CONTENT[doc] || CONTENT.privacy;

  return (
    <div data-testid="legal-page">
      <section className="py-16 lg:py-20" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: '#0b1220' }}>{data.title}</h1>
          <div className="mt-4 w-12 h-[3px] rounded-full" style={{ background: '#8A1538' }} />
          <p className="mt-6 text-base leading-relaxed" style={{ color: '#4b5563' }}>{data.intro}</p>
          <div className="mt-8 space-y-8">
            {data.sections.map((s) => (
              <div key={s.h}>
                <h2 className="text-lg font-semibold mb-2" style={{ color: '#1f2937' }}>{s.h}</h2>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#4b5563' }}>{s.p}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-xs" style={{ color: '#9ca3af' }}>Last updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>
        </div>
      </section>
    </div>
  );
}
