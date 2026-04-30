'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Users, FileText, BarChart3 } from 'lucide-react'

export default function FacultyDashboard() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your courses and students</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Courses</p>
              <p className="text-2xl font-bold">4</p>
            </div>
            <BookOpen className="h-8 w-8 text-purple-500" />
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Students</p>
              <p className="text-2xl font-bold">156</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Materials</p>
              <p className="text-2xl font-bold">28</p>
            </div>
            <FileText className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Grade</p>
              <p className="text-2xl font-bold">B+</p>
            </div>
            <BarChart3 className="h-8 w-8 text-orange-500" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">My Courses</h2>
          <div className="space-y-3">
            {['Data Structures', 'Algorithms', 'Database Systems', 'Web Development'].map((course, idx) => (
              <div key={idx} className="p-3 border rounded-lg hover:bg-muted/50">
                <p className="font-medium">{course}</p>
                <p className="text-sm text-muted-foreground">CS{201 + idx} • 45 students</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Submissions</h2>
          <div className="space-y-3">
            {['Assignment 3', 'Project Proposal', 'Lab Report 5'].map((item, idx) => (
              <div key={idx} className="p-3 border rounded-lg">
                <p className="font-medium">{item}</p>
                <p className="text-sm text-muted-foreground">{12 + idx} submissions pending</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
