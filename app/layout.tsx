import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Campus Hub - Professional Campus Platform',
  description: 'A comprehensive campus management platform combining academics, networking, collaboration, and placement tracking.',
  keywords: ['campus', 'university', 'academics', 'placement', 'networking'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://campushub.example.com',
    title: 'Campus Hub',
    description: 'Professional Campus Management Platform',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0a0a0f',
}

// Inline script: applies saved theme before first paint — eliminates flash
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('ch-theme') || 'midnight';
    var themes = {
      midnight: { bg:'#0a0a0f', surface:'#111118', accent:'#3b82f6', accentHover:'#60a5fa', accentMuted:'rgba(59,130,246,0.15)', text:'rgba(255,255,255,0.80)', textMuted:'rgba(255,255,255,0.40)', textFaint:'rgba(255,255,255,0.20)', scrollbar:'#3b82f6' },
      slate:    { bg:'#0f1117', surface:'#161b27', accent:'#6366f1', accentHover:'#818cf8', accentMuted:'rgba(99,102,241,0.15)', text:'rgba(255,255,255,0.80)', textMuted:'rgba(255,255,255,0.40)', textFaint:'rgba(255,255,255,0.20)', scrollbar:'#6366f1' },
      nord:     { bg:'#2e3440', surface:'#3b4252', accent:'#88c0d0', accentHover:'#8fbcbb', accentMuted:'rgba(136,192,208,0.15)', text:'rgba(236,239,244,0.85)', textMuted:'rgba(236,239,244,0.45)', textFaint:'rgba(236,239,244,0.22)', scrollbar:'#88c0d0' },
      dracula:  { bg:'#282a36', surface:'#343746', accent:'#bd93f9', accentHover:'#ff79c6', accentMuted:'rgba(189,147,249,0.15)', text:'rgba(248,248,242,0.85)', textMuted:'rgba(248,248,242,0.45)', textFaint:'rgba(248,248,242,0.22)', scrollbar:'#bd93f9' },
      rose:     { bg:'#0f0a0a', surface:'#1a1010', accent:'#f43f5e', accentHover:'#fb7185', accentMuted:'rgba(244,63,94,0.15)', text:'rgba(255,255,255,0.80)', textMuted:'rgba(255,255,255,0.40)', textFaint:'rgba(255,255,255,0.20)', scrollbar:'#f43f5e' },
      forest:   { bg:'#0a0f0a', surface:'#101a10', accent:'#22c55e', accentHover:'#4ade80', accentMuted:'rgba(34,197,94,0.15)', text:'rgba(255,255,255,0.80)', textMuted:'rgba(255,255,255,0.40)', textFaint:'rgba(255,255,255,0.20)', scrollbar:'#22c55e' },
      amber:    { bg:'#0f0d08', surface:'#1a1608', accent:'#f59e0b', accentHover:'#fbbf24', accentMuted:'rgba(245,158,11,0.15)', text:'rgba(255,255,255,0.80)', textMuted:'rgba(255,255,255,0.40)', textFaint:'rgba(255,255,255,0.20)', scrollbar:'#f59e0b' },
      ocean:    { bg:'#050f12', surface:'#0a1a1f', accent:'#06b6d4', accentHover:'#22d3ee', accentMuted:'rgba(6,182,212,0.15)', text:'rgba(255,255,255,0.80)', textMuted:'rgba(255,255,255,0.40)', textFaint:'rgba(255,255,255,0.20)', scrollbar:'#06b6d4' },
      light:    { bg:'#f8fafc', surface:'#ffffff', accent:'#2563eb', accentHover:'#1d4ed8', accentMuted:'rgba(37,99,235,0.10)', text:'rgba(15,23,42,0.85)', textMuted:'rgba(15,23,42,0.50)', textFaint:'rgba(15,23,42,0.30)', scrollbar:'#2563eb' },
    };
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var def = t === 'system' ? (prefersDark ? themes.midnight : themes.light) : (themes[t] || themes.midnight);
    var r = document.documentElement;
    r.style.setProperty('--theme-bg', def.bg);
    r.style.setProperty('--theme-surface', def.surface);
    r.style.setProperty('--theme-accent', def.accent);
    r.style.setProperty('--theme-accent-hover', def.accentHover);
    r.style.setProperty('--theme-accent-muted', def.accentMuted);
    r.style.setProperty('--theme-text', def.text);
    r.style.setProperty('--theme-text-muted', def.textMuted);
    r.style.setProperty('--theme-text-faint', def.textFaint);
    r.style.setProperty('--theme-scrollbar', def.scrollbar);
    r.style.backgroundColor = def.bg;
    if (t === 'light') { r.classList.remove('dark'); } else { r.classList.add('dark'); }
  } catch(e) {}
})();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Apply theme before first paint — prevents flash */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <ThemeProvider>
            <div className="min-h-screen">
              {children}
            </div>
          </ThemeProvider>
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
