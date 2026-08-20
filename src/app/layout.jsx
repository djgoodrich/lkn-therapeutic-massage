import { Cormorant_Garamond, Plus_Jakarta_Sans, Cinzel } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata = {
  title: 'LKN Therapeutic Massage | April Ravenwood, LMT | Cornelius, NC',
  description: 'Experience 16 years of master therapeutic bodywork in Cornelius, NC. Specializing in customized therapeutic massage, prenatal care, and restorative sessions with cupping and steamed hot towels always included at no upcharge.',
  keywords: [
    'Massage Cornelius NC',
    'Lake Norman Therapeutic Massage',
    'April Ravenwood LMT',
    'Prenatal Massage Cornelius NC',
    'Cupping Therapy Lake Norman',
    'Hot Towel Massage Cornelius',
    'Therapeutic Massage 28031',
    'Torrence Chapel Road Massage'
  ],
  authors: [{ name: 'April Ravenwood, LMT' }],
  openGraph: {
    title: 'LKN Therapeutic Massage | April Ravenwood, LMT',
    description: '16 Years of Master Therapeutic Touch. Cupping & Hot Towels Included at No Extra Charge. Cornelius, NC.',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} ${cinzel.variable} scroll-smooth`}>
      <body className="bg-moody-950 text-moody-100 antialiased selection:bg-gold-500 selection:text-moody-950">
        {children}
      </body>
    </html>
  );
}
