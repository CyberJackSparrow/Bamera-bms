"use client"

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Mon",
    rooms: 12000,
    food: 5000,
    services: 2000,
  },
  {
    name: "Tue",
    rooms: 15000,
    food: 6000,
    services: 3000,
  },
  {
    name: "Wed",
    rooms: 18000,
    food: 8000,
    services: 4000,
  },
  {
    name: "Thu",
    rooms: 16000,
    food: 7500,
    services: 3500,
  },
  {
    name: "Fri",
    rooms: 21000,
    food: 9000,
    services: 5000,
  },
  {
    name: "Sat",
    rooms: 25000,
    food: 12000,
    services: 6000,
  },
  {
    name: "Sun",
    rooms: 22000,
    food: 10000,
    services: 5500,
  },
]

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Day</span>
                      <span className="font-bold text-muted-foreground">{payload[0].payload.name}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Rooms</span>
                        <span className="font-bold text-blue-500">₹{payload[0].value}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Food</span>
                        <span className="font-bold text-green-500">₹{payload[1].value}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Services</span>
                        <span className="font-bold text-purple-500">₹{payload[2].value}</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Total</span>
                      <span className="font-bold">₹{payload[0].value + payload[1].value + payload[2].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend />
        <Area type="monotone" dataKey="rooms" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
        <Area type="monotone" dataKey="food" stackId="1" stroke="#22c55e" fill="#22c55e" />
        <Area type="monotone" dataKey="services" stackId="1" stroke="#a855f7" fill="#a855f7" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
