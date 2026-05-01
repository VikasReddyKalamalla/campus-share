'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { GraduationCap, User, Mail, Lock, Phone, Chrome, ArrowRight } from 'lucide-react'
import { GoogleAuthProvider, linkWithPopup } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [linkGoogle, setLinkGoogle] = useState(false)
  const router = useRouter()
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      await signUp(email, password, name, 'student')

      if (linkGoogle && auth.currentUser) {
        try {
          const provider = new GoogleAuthProvider()
          await linkWithPopup(auth.currentUser, provider)
        } catch (linkError: any) {
          console.error('Error linking Google account:', linkError)
        }
      }

      router.push('/role-select')
    } catch (err: any) {
      setError(err.message || 'Failed to create account')
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
          Create your account
        </h1>
        <p className="text-white/40 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
            Sign in
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
          {/* Full Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-medium text-white/50 uppercase tracking-wide">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 h-10 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-lg focus:border-blue-500/50 focus:ring-0 focus:bg-white/[0.06] transition-colors text-sm"
                required
              />
            </div>
          </div>

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

          {/* Phone */}
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs font-medium text-white/50 uppercase tracking-wide">
              Phone Number
              <span className="ml-1.5 text-white/25 normal-case tracking-normal font-normal">(optional)</span>
            </Label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" />
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10 h-10 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-lg focus:border-blue-500/50 focus:ring-0 focus:bg-white/[0.06] transition-colors text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs font-medium text-white/50 uppercase tracking-wide">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" />
              <Input
                id="password"
                type="password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-10 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-lg focus:border-blue-500/50 focus:ring-0 focus:bg-white/[0.06] transition-colors text-sm"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword" className="text-xs font-medium text-white/50 uppercase tracking-wide">
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 h-10 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-lg focus:border-blue-500/50 focus:ring-0 focus:bg-white/[0.06] transition-colors text-sm"
                required
              />
            </div>
          </div>

          {/* Link Google */}
          <label
            htmlFor="linkGoogle"
            className="flex items-center gap-3 p-3.5 rounded-lg border border-white/[0.06] bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] transition-colors"
          >
            <input
              type="checkbox"
              id="linkGoogle"
              checked={linkGoogle}
              onChange={(e) => setLinkGoogle(e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-white/5 accent-blue-500"
            />
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Chrome className="h-4 w-4 text-white/30" />
              Link Google account for easy sign-in
            </div>
          </label>

          <Button
            type="submit"
            className="w-full h-10 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg text-sm transition-colors flex items-center justify-center gap-2 mt-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating account…
              </>
            ) : (
              <>
                Create account
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <p className="text-center text-xs text-white/20 pt-1">
          By creating an account you agree to our{' '}
          <a href="#" className="text-white/35 hover:text-white/60 transition-colors underline underline-offset-2">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-white/35 hover:text-white/60 transition-colors underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}
