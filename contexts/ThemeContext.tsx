'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type ThemeId =
  | 'midnight'
  | 'slate'
  | 'nord'
  | 'dracula'
  | 'rose'
  | 'forest'
  | 'amber'
  | 'ocean'
  | 'light'
  | 'system'

export interface ThemeDef {
  id: ThemeId
  name: string
  description: string
  /** bg swatch shown in the picker */
  bg: string
  /** accent swatch */
  accent: string
  /** text swatch */
  text: string
  /** CSS vars to inject on <html> */
  vars: Record<string, string>
}

export const THEMES: ThemeDef[] = [
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Deep dark blue — default',
    bg: '#0a0a0f',
    accent: '#3b82f6',
    text: '#ffffff',
    vars: {
      '--theme-bg': '#0a0a0f',
      '--theme-surface': '#111118',
      '--theme-border': 'rgba(255,255,255,0.07)',
      '--theme-accent': '#3b82f6',
      '--theme-accent-hover': '#60a5fa',
      '--theme-accent-muted': 'rgba(59,130,246,0.15)',
      '--theme-text': 'rgba(255,255,255,0.80)',
      '--theme-text-muted': 'rgba(255,255,255,0.40)',
      '--theme-text-faint': 'rgba(255,255,255,0.20)',
      '--theme-scrollbar': '#3b82f6',
    },
  },
  {
    id: 'slate',
    name: 'Slate',
    description: 'Cool grey with indigo',
    bg: '#0f1117',
    accent: '#6366f1',
    text: '#ffffff',
    vars: {
      '--theme-bg': '#0f1117',
      '--theme-surface': '#161b27',
      '--theme-border': 'rgba(255,255,255,0.07)',
      '--theme-accent': '#6366f1',
      '--theme-accent-hover': '#818cf8',
      '--theme-accent-muted': 'rgba(99,102,241,0.15)',
      '--theme-text': 'rgba(255,255,255,0.80)',
      '--theme-text-muted': 'rgba(255,255,255,0.40)',
      '--theme-text-faint': 'rgba(255,255,255,0.20)',
      '--theme-scrollbar': '#6366f1',
    },
  },
  {
    id: 'nord',
    name: 'Nord',
    description: 'Arctic blue-grey palette',
    bg: '#2e3440',
    accent: '#88c0d0',
    text: '#eceff4',
    vars: {
      '--theme-bg': '#2e3440',
      '--theme-surface': '#3b4252',
      '--theme-border': 'rgba(236,239,244,0.08)',
      '--theme-accent': '#88c0d0',
      '--theme-accent-hover': '#8fbcbb',
      '--theme-accent-muted': 'rgba(136,192,208,0.15)',
      '--theme-text': 'rgba(236,239,244,0.85)',
      '--theme-text-muted': 'rgba(236,239,244,0.45)',
      '--theme-text-faint': 'rgba(236,239,244,0.22)',
      '--theme-scrollbar': '#88c0d0',
    },
  },
  {
    id: 'dracula',
    name: 'Dracula',
    description: 'Purple & pink classic',
    bg: '#282a36',
    accent: '#bd93f9',
    text: '#f8f8f2',
    vars: {
      '--theme-bg': '#282a36',
      '--theme-surface': '#343746',
      '--theme-border': 'rgba(248,248,242,0.08)',
      '--theme-accent': '#bd93f9',
      '--theme-accent-hover': '#ff79c6',
      '--theme-accent-muted': 'rgba(189,147,249,0.15)',
      '--theme-text': 'rgba(248,248,242,0.85)',
      '--theme-text-muted': 'rgba(248,248,242,0.45)',
      '--theme-text-faint': 'rgba(248,248,242,0.22)',
      '--theme-scrollbar': '#bd93f9',
    },
  },
  {
    id: 'rose',
    name: 'Rose',
    description: 'Warm dark with rose accent',
    bg: '#0f0a0a',
    accent: '#f43f5e',
    text: '#ffffff',
    vars: {
      '--theme-bg': '#0f0a0a',
      '--theme-surface': '#1a1010',
      '--theme-border': 'rgba(255,255,255,0.07)',
      '--theme-accent': '#f43f5e',
      '--theme-accent-hover': '#fb7185',
      '--theme-accent-muted': 'rgba(244,63,94,0.15)',
      '--theme-text': 'rgba(255,255,255,0.80)',
      '--theme-text-muted': 'rgba(255,255,255,0.40)',
      '--theme-text-faint': 'rgba(255,255,255,0.20)',
      '--theme-scrollbar': '#f43f5e',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Deep green earthy tones',
    bg: '#0a0f0a',
    accent: '#22c55e',
    text: '#ffffff',
    vars: {
      '--theme-bg': '#0a0f0a',
      '--theme-surface': '#101a10',
      '--theme-border': 'rgba(255,255,255,0.07)',
      '--theme-accent': '#22c55e',
      '--theme-accent-hover': '#4ade80',
      '--theme-accent-muted': 'rgba(34,197,94,0.15)',
      '--theme-text': 'rgba(255,255,255,0.80)',
      '--theme-text-muted': 'rgba(255,255,255,0.40)',
      '--theme-text-faint': 'rgba(255,255,255,0.20)',
      '--theme-scrollbar': '#22c55e',
    },
  },
  {
    id: 'amber',
    name: 'Amber',
    description: 'Warm dark with golden accent',
    bg: '#0f0d08',
    accent: '#f59e0b',
    text: '#ffffff',
    vars: {
      '--theme-bg': '#0f0d08',
      '--theme-surface': '#1a1608',
      '--theme-border': 'rgba(255,255,255,0.07)',
      '--theme-accent': '#f59e0b',
      '--theme-accent-hover': '#fbbf24',
      '--theme-accent-muted': 'rgba(245,158,11,0.15)',
      '--theme-text': 'rgba(255,255,255,0.80)',
      '--theme-text-muted': 'rgba(255,255,255,0.40)',
      '--theme-text-faint': 'rgba(255,255,255,0.20)',
      '--theme-scrollbar': '#f59e0b',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Deep teal and cyan',
    bg: '#050f12',
    accent: '#06b6d4',
    text: '#ffffff',
    vars: {
      '--theme-bg': '#050f12',
      '--theme-surface': '#0a1a1f',
      '--theme-border': 'rgba(255,255,255,0.07)',
      '--theme-accent': '#06b6d4',
      '--theme-accent-hover': '#22d3ee',
      '--theme-accent-muted': 'rgba(6,182,212,0.15)',
      '--theme-text': 'rgba(255,255,255,0.80)',
      '--theme-text-muted': 'rgba(255,255,255,0.40)',
      '--theme-text-faint': 'rgba(255,255,255,0.20)',
      '--theme-scrollbar': '#06b6d4',
    },
  },
  {
    id: 'light',
    name: 'Light',
    description: 'Clean white with blue accent',
    bg: '#f8fafc',
    accent: '#2563eb',
    text: '#0f172a',
    vars: {
      '--theme-bg': '#f8fafc',
      '--theme-surface': '#ffffff',
      '--theme-border': 'rgba(0,0,0,0.08)',
      '--theme-accent': '#2563eb',
      '--theme-accent-hover': '#1d4ed8',
      '--theme-accent-muted': 'rgba(37,99,235,0.10)',
      '--theme-text': 'rgba(15,23,42,0.85)',
      '--theme-text-muted': 'rgba(15,23,42,0.50)',
      '--theme-text-faint': 'rgba(15,23,42,0.30)',
      '--theme-scrollbar': '#2563eb',
    },
  },
]

// ── Context ────────────────────────────────────────────────────────────────
interface ThemeContextType {
  themeId: ThemeId
  theme: ThemeDef
  setTheme: (id: ThemeId) => void
}

const ThemeContext = createContext<ThemeContextType>({
  themeId: 'midnight',
  theme: THEMES[0],
  setTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

function applyTheme(def: ThemeDef) {
  const root = document.documentElement
  Object.entries(def.vars).forEach(([k, v]) => root.style.setProperty(k, v))
  // Light theme removes dark class; all others keep it for Tailwind dark: variants
  if (def.id === 'light') {
    root.classList.remove('dark')
  } else {
    root.classList.add('dark')
  }
}

function resolveSystem(): ThemeDef {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? THEMES[0] : THEMES.find((t) => t.id === 'light')!
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>('midnight')

  // On mount: load saved theme — but apply it synchronously via inline script (see layout.tsx)
  // This useEffect just syncs React state with what the inline script already applied
  useEffect(() => {
    const saved = (localStorage.getItem('ch-theme') as ThemeId) || 'midnight'
    setThemeId(saved)
    // Re-apply in case the inline script missed anything
    const def = saved === 'system' ? resolveSystem() : THEMES.find((t) => t.id === saved) ?? THEMES[0]
    applyTheme(def)
  }, [])

  // System theme: watch media query
  useEffect(() => {
    if (themeId !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme(resolveSystem())
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [themeId])

  const setTheme = (id: ThemeId) => {
    setThemeId(id)
    localStorage.setItem('ch-theme', id)
    const def = id === 'system' ? resolveSystem() : THEMES.find((t) => t.id === id) ?? THEMES[0]
    applyTheme(def)
  }

  const resolvedDef =
    themeId === 'system'
      ? resolveSystem()
      : THEMES.find((t) => t.id === themeId) ?? THEMES[0]

  return (
    <ThemeContext.Provider value={{ themeId, theme: resolvedDef, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
