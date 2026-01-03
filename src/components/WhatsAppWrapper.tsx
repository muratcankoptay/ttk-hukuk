'use client';

import dynamic from 'next/dynamic';

// Lazy load WhatsApp button - not critical for initial render
const WhatsAppButton = dynamic(() => import('./WhatsAppButton'), {
  ssr: false,
  loading: () => null,
});

export default function WhatsAppWrapper() {
  return <WhatsAppButton />;
}
