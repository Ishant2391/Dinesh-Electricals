import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Dinesh Electrical - Best Electrical Products Online',
  description: 'Shop the best electrical products at Dinesh Electrical. Wires, switches, lights, fans, and more at competitive prices with fast delivery.',
  keywords: 'electrical products, wires, switches, lights, fans, cables, Dinesh Electrical',
  authors: [{ name: 'Dinesh Electrical' }],
  openGraph: {
    title: 'Dinesh Electrical - Best Electrical Products Online',
    description: 'Shop the best electrical products at Dinesh Electrical.',
    type: 'website',
    locale: 'en_IN',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#ed7609',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}