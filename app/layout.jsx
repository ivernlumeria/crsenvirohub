import './globals.css';

export const metadata = {
  title: 'CRS Environmental Hub',
  description: 'Environmental Compliance Management Dashboard for Classic Real Stones S.A.R.L.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}