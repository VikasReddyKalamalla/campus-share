'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Briefcase, TrendingUp, Calendar, Award, Target } from 'lucide-react'

export default function StudentDashboard() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your academic overview</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">CGPA</p>
              <p className="text-2xl font-bold">3.85</p>
              <p className="text-xs text-green-600 mt-1">↑ 0.15 from last sem</p>
            </div>
            <Award className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Applications</p>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-blue-600 mt-1">3 pending review</p>
            </div>
            <Briefcase className="h-8 w-8 text-purple-500" />
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Courses</p>
              <p className="text-2xl font-bold">6</p>
              <p className="text-xs text-muted-foreground mt-1">This semester</p>
            </div>
            <BookOpen className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Attendance</p>
              <p className="text-2xl font-bold">92%</p>
              <p className="text-xs text-green-600 mt-1">Above requirement</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Classes */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Today's Schedule
            </h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {[
              { time: '09:00 AM', subject: 'Data Structures', room: 'Room 301', type: 'Lecture' },
              { time: '11:00 AM', subject: 'Algorithms', room: 'Lab 2', type: 'Lab' },
              { time: '02:00 PM', subject: 'Database Systems', room: 'Room 205', type: 'Lecture' },
            ].map((class_, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="text-center min-w-[80px]">
                  <p className="text-sm font-semibold text-primary">{class_.time}</p>
                  <p className="text-xs text-muted-foreground">{class_.type}</p>
                </div>
                <div className="h-12 w-px bg-border"></div>
                <div className="flex-1">
                  <p className="font-medium">{class_.subject}</p>
                  <p className="text-sm text-muted-foreground">{class_.room}</p>
                </div>
                <Button size="sm" variant="outline">Join</Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <Target className="h-4 w-4 mr-2" />
              Apply for Jobs
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              View Assignments
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Award className="h-4 w-4 mr-2" />
              Check Grades
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Exam Schedule
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Upcoming Exam</p>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Data Structures - May 15, 2026</p>
            <Button size="sm" className="w-full mt-3" variant="default">
              Prepare Now
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { action: 'Applied to Software Engineer position at Google', time: '2 hours ago', type: 'application' },
            { action: 'Submitted Assignment: Database Design', time: '5 hours ago', type: 'assignment' },
            { action: 'New grade posted for Algorithms midterm', time: '1 day ago', type: 'grade' },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-border">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity.type === 'application' ? 'bg-blue-500' :
                activity.type === 'assignment' ? 'bg-green-500' : 'bg-purple-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm">{activity.action}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
