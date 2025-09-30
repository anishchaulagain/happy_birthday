import './globals.css';
import type { Metadata } from 'next';
import { Inter, Dancing_Script } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const dancing = Dancing_Script({ subsets: ['latin'], variable: '--font-dancing' });

export const metadata: Metadata = {
  title: 'Happy Birthday, My Love 💕',
  description: 'A special birthday website made with love, just for you',
  openGraph: {
    title: 'Happy Birthday, My Love 💕',
    description: 'A special birthday website made with love, just for you',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Happy Birthday, My Love 💕',
    description: 'A special birthday website made with love, just for you',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(
        inter.variable,
        dancing.variable,
        "font-sans antialiased bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 min-h-screen"
      )}>
        {children}
      </body>
    </html>
  );
}