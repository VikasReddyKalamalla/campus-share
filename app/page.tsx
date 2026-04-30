'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, GraduationCap, Briefcase, Users, BookOpen } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950"></div>
      <div className="absolute inset-0 leaf-pattern opacity-30"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-emerald-500/50 transform hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl blur opacity-30"></div>
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Campus Hub
              </h1>
              <p className="text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto">
                Your all-in-one platform for academics, placements, and campus life
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link href="/register">
                <Button 
                  size="lg"
                  className="h-14 px-8 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white font-semibold shadow-lg shadow-emerald-500/50 transform hover:scale-105 transition-all duration-200 text-lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button 
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 rounded-xl border-2 border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-lg font-semibold transform hover:scale-105 transition-all duration-200"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            <div className="glass backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 p-8 rounded-2xl border border-white/20 shadow-xl hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 shadow-lg">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Academics</h3>
              <p className="text-muted-foreground">Track your courses, grades, and academic progress</p>
            </div>

            <div className="glass backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 p-8 rounded-2xl border border-white/20 shadow-xl hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mb-4 shadow-lg">
                <Briefcase className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Placements</h3>
              <p className="text-muted-foreground">Find jobs, apply, and track your applications</p>
            </div>

            <div className="glass backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 p-8 rounded-2xl border border-white/20 shadow-xl hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4 shadow-lg">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Collaborate</h3>
              <p className="text-muted-foreground">Connect with students and faculty</p>
            </div>

            <div className="glass backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 p-8 rounded-2xl border border-white/20 shadow-xl hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-4 shadow-lg">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Resources</h3>
              <p className="text-muted-foreground">Access course materials and study resources</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">10K+</div>
              <div className="text-muted-foreground mt-2">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">500+</div>
              <div className="text-muted-foreground mt-2">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">95%</div>
              <div className="text-muted-foreground mt-2">Placement Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">1000+</div>
              <div className="text-muted-foreground mt-2">Resources</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
