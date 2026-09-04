import { Cormorant_Garamond, Plus_Jakarta_Sans, Cinzel } from 'next/font/google';
import './globals.css';
import { SITE_URL, BUSINESS_ADDRESS, THERAPIST_NAME, LICENSE_NUMBER, VAGARO_URL } from '../data/config';

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
  metadataBase: new URL(SITE_URL),
  title: 'LKN Therapeutic Massage | April Ravenwood, LMT (NC #12129) | Cornelius, NC',
  description: 'Experience 16 years of master therapeutic bodywork in Cornelius, NC by April Ravenwood, LMT (NC LMBT #12129). Swedish, Deep Tissue, Prenatal, and Chronic Pain relief with cupping and steamed hot towels always included at no upcharge.',
  keywords: [
    'Massage Cornelius NC',
    'Lake Norman Therapeutic Massage',
    'April Ravenwood LMT',
    'NC LMBT 12129',
    'Swedish Massage Cornelius NC',
    'Deep Tissue Massage Lake Norman',
    'Prenatal Massage Cornelius NC',
    'Cupping Therapy Lake Norman',
    'Hot Towel Massage Cornelius',
    'Therapeutic Massage 28031',
    'Torrence Chapel Road Massage'
  ],
  authors: [{ name: 'April Ravenwood, LMT' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'LKN Therapeutic Massage | April Ravenwood, LMT (NC #12129)',
    description: '16 Years of Master Therapeutic Bodywork in Cornelius, NC. Cupping & Hot Towels Included at $0 Upcharge. Book on Vagaro.',
    url: SITE_URL,
    siteName: 'LKN Therapeutic Massage',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/massage-suite.jpg',
        width: 1200,
        height: 800,
        alt: 'LKN Therapeutic Massage Tranquil Moody Suite in Cornelius, NC',
      },
      {
        url: '/images/april-ravenwood.jpg',
        width: 800,
        height: 1000,
        alt: 'April Ravenwood, LMT - Licensed Massage Therapist (NC LMBT #12129)',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LKN Therapeutic Massage | April Ravenwood, LMT (NC #12129)',
    description: '16 Years of Master Bodywork in Cornelius, NC. Cupping & Steamed Hot Towels Included at No Extra Charge.',
    images: ['/images/massage-suite.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': ['HealthAndBeautyBusiness', 'MassageService'],
  name: 'LKN Therapeutic Massage',
  image: `${SITE_URL}/images/massage-suite.jpg`,
  '@id': SITE_URL,
  url: SITE_URL,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '20905 Torrence Chapel Road, Suite 204',
    addressLocality: 'Cornelius',
    addressRegion: 'NC',
    postalCode: '28031',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 35.4868,
    longitude: -80.8601,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '17:00',
    },
  ],
  founder: {
    '@type': 'Person',
    name: 'April Ravenwood',
    jobTitle: 'Licensed Massage & Bodywork Therapist',
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Professional License',
      recognizedBy: {
        '@type': 'AdministrativeArea',
        name: 'North Carolina Board of Massage & Bodywork Therapy',
      },
      identifier: 'NC LMBT #12129',
    },
  },
  areaServed: [
    'Cornelius, NC',
    'Davidson, NC',
    'Huntersville, NC',
    'Mooresville, NC',
    'Lake Norman, NC',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Massage & Bodywork Modalities',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Swedish Massage',
          description: 'Classic restorative full-body relaxation massage with complimentary steamed herbal hot towels and soothing aromatherapy.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Deep Tissue Massage',
          description: 'Personalized deep anatomical bodywork for stubborn knots and tension with cupping and hot towels included.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Master Prenatal Massage',
          description: 'Certified 16-year specialized maternal care with ergonomic bolster cushioning for all trimesters.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Targeted Chronic Pain & Neck Restoration',
          description: 'Clinical kinetic chain relief for sciatica, tech-neck, and deep fascial decompression.',
        },
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} ${cinzel.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="bg-moody-950 text-moody-100 antialiased selection:bg-gold-500 selection:text-moody-950">
        {children}
      </body>
    </html>
  );
}
