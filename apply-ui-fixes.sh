#!/usr/bin/env bash
#
# apply-ui-fixes.sh
# One-shot UI cleanup for the portfolio. Run from the PROJECT ROOT
# (the folder that contains package.json + app/ + components/).
#
# What it does:
#   1. Backs up every file it will touch into .ui-backup-<timestamp>/
#   2. Fixes the invalid `/08` Tailwind opacity classes (they render nothing)
#   3. Replaces ~123 hardcoded brand hexes with design tokens
#      (brand / brand-dark / brand-mid)
#   4. Bumps the faintest muted text one step for contrast
#   5. Rewrites app/globals.css  -> next/font vars + reduced-motion, no @import
#   6. Rewrites app/layout.tsx    -> next/font + OpenGraph/Twitter metadata
#   7. Patches tailwind.config.ts -> new brand tokens + font vars
#
# It does NOT commit. Review `git diff`, then commit yourself.

set -euo pipefail

# ── 0. Guards ────────────────────────────────────────────────────────────────
command -v perl >/dev/null 2>&1 || { echo "❌ perl is required but not found."; exit 1; }

if [[ ! -f package.json || ! -f app/layout.tsx || ! -d components ]]; then
  echo "❌ Run this from your project root (need package.json, app/layout.tsx, components/)."
  exit 1
fi

TS="$(date +%Y%m%d-%H%M%S)"
BK=".ui-backup-${TS}"
echo "→ Backing up touched files into ${BK}/"
mkdir -p "$BK"
cp -R app components tailwind.config.ts "$BK"/ 2>/dev/null || true

# The .tsx files that carry className strings (NOT config/css).
# Uses `find -exec` below instead of a bash-4-only array (`mapfile`), so this
# runs on macOS's system bash 3.2.
TSX_COUNT="$(find app components -type f -name '*.tsx' | wc -l | tr -d ' ')"
echo "→ ${TSX_COUNT} .tsx files in scope for class replacements"

# ── 1 + 2. Fix /08, then swap brand hexes to tokens ──────────────────────────
# Order matters: the /08 rule runs first so `[#78355b]/08` becomes
# `[#78355b]/[0.08]` BEFORE the hex is renamed to `brand`, giving `brand/[0.08]`.
# `\Q...\E` keeps the [ # ] characters literal; `|` is the s/// delimiter.
echo "→ Fixing /08, swapping brand hexes to tokens, bumping faint text"
# `-exec ... {} +` batches all matched files into one perl call and, unlike a
# piped xargs, simply doesn't run if there are no matches — no empty-input hang.
find app components -type f -name '*.tsx' -exec perl -pi -e '
  s|\Q[#78355b]\E/08|[#78355b]/[0.08]|g;
  s|\Q[#78355b]\E|brand|g;
  s|\Q[#5e2947]\E|brand-dark|g;
  s|\Q[#c4869f]\E|brand-mid|g;
  s|text-muted-foreground/50|text-muted-foreground/70|g;
' {} +

# ── 4. Rewrite app/globals.css ───────────────────────────────────────────────
# Quoted heredoc: nothing inside is interpolated by the shell.
echo "→ Rewriting app/globals.css"
cat > app/globals.css <<'CSS'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Light mode */
    --background: 0 0% 97%;
    --foreground: 220 20% 10%;
    --card: 0 0% 100%;
    --card-foreground: 220 20% 10%;
    --popover: 0 0% 100%;
    --popover-foreground: 220 20% 10%;
    --primary: 220 20% 10%;
    --primary-foreground: 0 0% 97%;
    --secondary: 220 14% 94%;
    --secondary-foreground: 220 20% 10%;
    --muted: 220 14% 94%;
    --muted-foreground: 220 10% 50%;
    --accent: 220 14% 94%;
    --accent-foreground: 220 20% 10%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 97%;
    --border: 220 13% 88%;
    --input: 220 13% 88%;
    --ring: 220 20% 10%;
    --radius: 0.5rem;

    /* Brand */
    --brand: #78355b;
    --brand-light: #f5e8f0;
    --brand-mid: #c4869f;
    --brand-dark: #5e2947;
  }

  .dark {
    --background: 224 20% 7%;
    --foreground: 210 20% 90%;
    --card: 224 20% 9%;
    --card-foreground: 210 20% 90%;
    --popover: 224 20% 9%;
    --popover-foreground: 210 20% 90%;
    --primary: 210 20% 90%;
    --primary-foreground: 224 20% 7%;
    --secondary: 224 18% 13%;
    --secondary-foreground: 210 20% 90%;
    --muted: 224 18% 13%;
    --muted-foreground: 215 16% 55%;
    --accent: 224 18% 13%;
    --accent-foreground: 210 20% 90%;
    --destructive: 0 62% 30%;
    --destructive-foreground: 210 20% 90%;
    --border: 224 18% 15%;
    --input: 224 18% 15%;
    --ring: 215 20% 65%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-sora), sans-serif;
  }
}

/* ── Dot grid background ── */
.dot-grid {
  background-image: radial-gradient(circle, rgba(120, 53, 91, 0.12) 1px, transparent 1px);
  background-size: 28px 28px;
}
.dark .dot-grid {
  background-image: radial-gradient(circle, rgba(120, 53, 91, 0.2) 1px, transparent 1px);
}

/* ── Fonts (wired to next/font CSS variables) ── */
.font-display {
  font-family: var(--font-dm-serif), serif;
}
.font-mono-custom {
  font-family: var(--font-jetbrains), monospace;
}
.font-body {
  font-family: var(--font-sora), sans-serif;
}

/* ── Gradient text ── */
.gradient-text {
  background: linear-gradient(135deg, var(--brand) 0%, var(--brand-mid) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Glow on hover ── */
.card-hover {
  transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
}
.card-hover:hover {
  box-shadow: 0 0 0 1px rgba(120, 53, 91, 0.3), 0 8px 32px rgba(120, 53, 91, 0.08);
  transform: translateY(-2px);
  border-color: rgba(120, 53, 91, 0.3);
}

/* ── Skill pill hover ── */
.skill-pill {
  transition: all 0.2s ease;
  cursor: default;
}
.skill-pill:hover {
  background: rgba(120, 53, 91, 0.08);
  border-color: rgba(120, 53, 91, 0.4);
  color: var(--brand);
}
.dark .skill-pill:hover {
  background: rgba(120, 53, 91, 0.15);
  color: var(--brand-mid);
}

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(120, 53, 91, 0.3); border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: rgba(120, 53, 91, 0.5); }

/* ── Line decoration ── */
.section-line::before {
  content: '';
  display: inline-block;
  width: 24px;
  height: 2px;
  background: var(--brand);
  margin-right: 10px;
  vertical-align: middle;
}

/* ── Respect the OS "reduce motion" setting ── */
/* Neutralizes the marquee + all CSS transitions/hovers. Framer's JS-driven
   scroll reveals are separate — see the note at the end of the script. */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
CSS

# ── 5. Rewrite app/layout.tsx ────────────────────────────────────────────────
echo "→ Rewriting app/layout.tsx"
cat > app/layout.tsx <<'TSX'
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
TSX

# ── 6. Patch tailwind.config.ts ──────────────────────────────────────────────
echo "→ Patching tailwind.config.ts (tokens + font vars)"
# Add brand-dark / brand-mid right after the existing brand token.
perl -0pi -e 's/(brand:\s*"#78355b",)/$1\n        "brand-dark": "#5e2947",\n        "brand-mid":  "#c4869f",/' tailwind.config.ts
# Point the font families at the next/font CSS variables.
perl -pi -e '
  s/\["DM Serif Display", "serif"\]/["var(--font-dm-serif)", "serif"]/;
  s/\["JetBrains Mono", "monospace"\]/["var(--font-jetbrains)", "monospace"]/;
  s/\["Sora", "sans-serif"\]/["var(--font-sora)", "sans-serif"]/;
' tailwind.config.ts

# ── Done ─────────────────────────────────────────────────────────────────────
echo
echo "✅ Done. Backup: ${BK}/"
echo
echo "Next:"
echo "  1. Add a 1200x630 image at public/og.png  (the script can't create it)."
echo "  2. Sanity-check:   npm run build"
echo "  3. Review:         git diff"
echo "  4. Revert if bad:  cp -R ${BK}/* . && rm -rf ${BK}"
echo
echo "Not automated (deliberate — see chat): Framer reduced-motion (needs a"
echo "MotionConfig client boundary), mobile stat cards, MindCraftAI framing,"
echo "the contact-form setTimeout, and your Infosys tenure line."
