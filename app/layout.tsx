import type { Metadata } from "next";
import { DM_Serif_Display, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

// Self-hosted, zero-layout-shift fonts. DM Serif Display is NOT a variable
// font, so it needs an explicit weight; Sora and JetBrains Mono are variable.
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = "https://aakashtyagi.in";
const OG_DESC =
  "Distributed systems & AI-powered products. Spring Boot microservices, RAG pipelines, MCP agents.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aakash Tyagi — Backend Engineer",
    template: "%s · Aakash Tyagi",
  },
  description:
    "Backend-heavy full stack engineer. I build distributed systems and AI-powered products — Spring Boot microservices, RAG pipelines, and MCP agents.",
  keywords: [
    "Aakash Tyagi",
    "Backend Engineer",
    "Java",
    "Spring Boot",
    "Microservices",
    "Next.js",
    "RAG",
    "LLM",
    "Distributed Systems",
  ],
  authors: [{ name: "Aakash Tyagi", url: SITE_URL }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Aakash Tyagi",
    title: "Aakash Tyagi — Backend Engineer",
    description: OG_DESC,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Aakash Tyagi — Backend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aakash Tyagi — Backend Engineer",
    description: OG_DESC,
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSerif.variable} ${sora.variable} ${jetbrains.variable} min-h-screen bg-background font-body antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
