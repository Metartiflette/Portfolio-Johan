// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Johan Vuillerme - Portfolio",
  description:
    "Portfolio of Johan Vuillerme, freelance video director and editor. Short films, client projects, collaborations, drone footage, etc. Based in Chambéry (France), available anytime!",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://johanvuillerme.fr/"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} text-white bg-black`}>
        <Navbar />
        {children}
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}