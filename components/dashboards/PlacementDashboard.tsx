'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Briefcase, Building, Users, TrendingUp } from 'lucide-react'

export default function PlacementDashboard() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Placement Cell Dashboard</h1>
        <p className="text-muted-foreground mt-1">Coordinate campus placements and recruitment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Companies</p>
              <p className="text-2xl font-bold">45</p>
            </div>
            <Building className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Opportunities</p>
              <p className="text-2xl font-bold">89</p>
            </div>
            <Briefcase className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Placed</p>
              <p className="text-2xl font-bold">234</p>
            </div>
            <Users className="h-8 w-8 text-purple-500" />
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Placement %</p>
              <p className="text-2xl font-bold">87%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-500" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Top Recruiters</h2>
          <div className="space-y-3">
            {['Google', 'Microsoft', 'Amazon', 'Meta'].map((company, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{company}</p>
                  <p className="text-sm text-muted-foreground">{15 - idx * 2} positions</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Drives</h2>
          <div className="space-y-3">
            {[
              { company: 'Google', date: 'May 15, 2026' },
              { company: 'Microsoft', date: 'May 20, 2026' },
              { company: 'Amazon', date: 'May 25, 2026' },
            ].map((drive, idx) => (
              <div key={idx} className="p-3 border rounded-lg">
                <p className="font-medium">{drive.company}</p>
                <p className="text-sm text-muted-foreground">{drive.date}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
