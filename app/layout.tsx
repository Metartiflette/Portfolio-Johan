// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Johan Vuillerme - Portfolio",
  description: "A personal portfolio site built with Sanity and Next.js",
  metadataBase: new URL("https://johanvuillerme.fr/"),
  // openGraph: {
  //   images: "add-your-open-graph-image-url-here",
  // },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} text-white bg-black`}>
          <Navbar />
          {children}
          <Footer />
      </body>
    </html>
  );
}