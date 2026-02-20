import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SITCO — High-Performance Transformer Radiators",
  description:
    "State-of-the-art manufacturing of transformer radiators and allied components. Built in Vadodara, Gujarat. Precision engineering, custom designs, and OEM-focused solutions.",
  keywords: [
    "transformer radiators",
    "SITCO",
    "industrial manufacturing",
    "Vadodara",
    "Gujarat",
    "OEM radiators",
    "finned radiators",
    "custom radiators",
  ],
  openGraph: {
    title: "SITCO — High-Performance Transformer Radiators",
    description:
      "State-of-the-art manufacturing of transformer radiators and allied components from Vadodara, Gujarat.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
