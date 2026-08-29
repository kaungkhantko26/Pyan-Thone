import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ServiceWorker } from "@/components/ServiceWorker";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Pyan Thone — Trusted second-hand marketplace",
  description:
    "Give things a second life. Buy and sell trusted second-hand products with condition transparency and seller trust scores.",
  manifest: `${BP}/manifest.webmanifest`,
  applicationName: "Pyan Thone",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Pyan Thone" },
  icons: {
    icon: [
      { url: `${BP}/favicon-32.png`, sizes: "32x32", type: "image/png" },
      { url: `${BP}/icons/icon-192.png`, sizes: "192x192", type: "image/png" },
    ],
    apple: `${BP}/apple-touch-icon.png`,
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-dvh antialiased">
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
