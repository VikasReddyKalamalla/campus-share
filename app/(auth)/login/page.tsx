'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { GraduationCap, Mail, Lock, Chrome, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signIn, signInWithGoogle } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setLoading(true)

    try {
      await signInWithGoogle()
      router.push('/dashboard')
    } catch (err: any) {
      if (err.message.includes('Account not found')) {
        setError('No account found. Please register first before using Google Sign-In.')
      } else {
        setError(err.message || 'Failed to sign in with Google')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <span className="text-white/60 text-sm font-medium group-hover:text-white/90 transition-colors">
            Campus Hub
          </span>
        </Link>

        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
          Welcome back
        </h1>
        <p className="text-white/40 text-sm">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
            Sign up for free
          </Link>
        </p>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-8 space-y-5">
        {error && (
          <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-medium text-white/50 uppercase tracking-wide">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-10 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-lg focus:border-blue-500/50 focus:ring-0 focus:bg-white/[0.06] transition-colors text-sm"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-medium text-white/50 uppercase tracking-wide">
                Password
              </Label>
              <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-10 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-lg focus:border-blue-500/50 focus:ring-0 focus:bg-white/[0.06] transition-colors text-sm"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-10 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg text-sm transition-colors flex items-center justify-center gap-2 mt-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                Sign in
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/[0.06]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#0a0a0f] px-3 text-xs text-white/25 uppercase tracking-widest">
              or
            </span>
          </div>
        </div>

        {/* Google */}
        <Button
          type="button"
          variant="outline"
          className="w-full h-10 border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] text-white/60 hover:text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <Chrome className="h-4 w-4" />
          Continue with Google
        </Button>

        <p className="text-center text-xs text-white/20">
          Google Sign-In only works if you registered with it linked.
        </p>
      </div>
    </div>
  )
}
