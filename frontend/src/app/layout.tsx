import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SERA — Video Editor & Visual Storyteller',
  description: 'Portfolio of Sectio Kautsar Ramadhani. A video editor with a designer\'s eye.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#1B1024]">{children}</body>
    </html>
  );
}
