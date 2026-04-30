'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Briefcase, Users, TrendingUp, FileText } from 'lucide-react'

export default function EmployeeDashboard() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Employee Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage job postings and recruitment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Jobs</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <Briefcase className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Applications</p>
              <p className="text-2xl font-bold">156</p>
            </div>
            <FileText className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Interviews</p>
              <p className="text-2xl font-bold">23</p>
            </div>
            <Users className="h-8 w-8 text-purple-500" />
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Hired</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-500" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Active Job Postings</h2>
          <div className="space-y-3">
            {['Software Engineer', 'Data Analyst', 'Product Manager'].map((job, idx) => (
              <div key={idx} className="p-3 border rounded-lg hover:bg-muted/50">
                <p className="font-medium">{job}</p>
                <p className="text-sm text-muted-foreground">{20 + idx * 5} applications</p>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4">Post New Job</Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Applications</h2>
          <div className="space-y-3">
            {['John Doe', 'Jane Smith', 'Bob Johnson'].map((name, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-muted-foreground">Applied 2 hours ago</p>
                </div>
                <Button size="sm" variant="outline">Review</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
