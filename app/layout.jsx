import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import SmoothScroll from "@/components/layout/SmoothScroll";
import PromoModal from "@/components/modal/PromoModal";
import { business } from "@/lib/business";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://sage-and-steel.vercel.app"),
  title: {
    default: `${business.fullName} — Barbershop in Gardens, Cape Town`,
    template: `%s · ${business.fullName}`,
  },
  description: business.shortDescription,
  keywords: [
    "barber Cape Town",
    "barbershop Gardens",
    "Kloof Street barber",
    "fade Cape Town",
    "beard trim Cape Town",
    "hot towel shave",
  ],
  authors: [{ name: business.fullName }],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: business.fullName,
    title: `${business.fullName} — Sharp cuts. Steady hands.`,
    description: business.shortDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.fullName} — Sharp cuts. Steady hands.`,
    description: business.shortDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#32292F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-ZA" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-dvh bg-cream text-ink antialiased">
        <SmoothScroll>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>

          <Header />

          <main id="main-content" className="min-h-[60vh]">
            {children}
          </main>

          <Footer />
          <MobileNav />
          <PromoModal />
        </SmoothScroll>
      </body>
    </html>
  );
}
