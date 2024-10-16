import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

import { ClientOnly } from "@/components/client-only";
import { getBaseURL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "ACHUBERGUIS",
  description: "Gere sua carteirinha do ACHUBERGUIS agora mesmo!",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    siteName: "ACHUBERGUIS",
    title: "ACHUBERGUIS",
    description: "Gere sua carteirinha do ACHUBERGUIS agora mesmo!",
    url: "https://achuberguis.vercel.app/",
    images: [
      {
        url: `${getBaseURL()}/api/og`,
        width: 512,
        height: 512,
        alt: "og image",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased">
        <ClientOnly>{children}</ClientOnly>
      </body>
    </html>
  );
}
