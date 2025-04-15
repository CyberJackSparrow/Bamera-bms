"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Mon", occupancy: 65 },
  { name: "Tue", occupancy: 72 },
  { name: "Wed", occupancy: 78 },
  { name: "Thu", occupancy: 82 },
  { name: "Fri", occupancy: 90 },
  { name: "Sat", occupancy: 95 },
  { name: "Sun", occupancy: 88 },
]

export function RoomOccupancyChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis unit="%" />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Day</span>
                      <span className="font-bold text-muted-foreground">{payload[0].payload.name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Occupancy</span>
                      <span className="font-bold">{payload[0].value}%</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Bar dataKey="occupancy" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
