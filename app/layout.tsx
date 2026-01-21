import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Script from "next/script";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const ksaArabic = localFont({
  src: "../public/fonts/ksa-heading-regular.ttf",
  variable: "--font-ksa",
  display: "swap",
});

const liftaArabic = localFont({
  src: "../public/fonts/lifta-swash.otf",
  variable: "--font-lifta",
  display: "swap",
});

const lyonArabic = localFont({
  src: "../public/fonts/lyon-arabic-display-black.otf",
  variable: "--font-lyon",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "عمـار ياسـر - نظارات فاخرة بأسعار استثنائية",
  description:
    "متجر المها للبصريات - نظارات طبية وشمسية فاخرة، تصاميم عالمية، وأسعار تناسب الجميع. ضمان شامل وخدمة عملاء مميزة.",
  keywords: [
    "نظارات",
    "نظارات طبية",
    "نظارات شمسية",
    "المها",
    "بصريات",
    "عدسات",
    "نظارات فاخرة",
    "نظارات عصرية",
    "نظارات رياضية",
  ],
  authors: [{ name: "Ayoun Al Maha Store" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "المها - نظارات فاخرة بأسعار استثنائية",
    description: "متجر المها للبصريات - جودة عالمية وأسعار مناسبة",
    type: "website",
    locale: "ar_EG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${ksaArabic.variable} ${liftaArabic.variable} ${lyonArabic.variable}`}
    >
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
      />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag("js", new Date());
                    gtag("config", "${process.env.GOOGLE_ANALYTICS_ID}");`,
        }}
      />
      <body
        className={`antialiased overflow-x-hidden bg-mainColor text-darkness`}
      >
        {children}
      </body>
    </html>
  );
}
