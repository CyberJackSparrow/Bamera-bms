"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Download, FileText, Printer } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const revenueData = [
  { month: "Jan", rooms: 120000, food: 45000, services: 25000 },
  { month: "Feb", rooms: 135000, food: 48000, services: 28000 },
  { month: "Mar", rooms: 150000, food: 52000, services: 30000 },
  { month: "Apr", rooms: 165000, food: 58000, services: 32000 },
  { month: "May", rooms: 180000, food: 62000, services: 35000 },
  { month: "Jun", rooms: 210000, food: 68000, services: 38000 },
  { month: "Jul", rooms: 230000, food: 72000, services: 42000 },
  { month: "Aug", rooms: 250000, food: 78000, services: 45000 },
  { month: "Sep", rooms: 220000, food: 70000, services: 40000 },
  { month: "Oct", rooms: 200000, food: 65000, services: 38000 },
  { month: "Nov", rooms: 180000, food: 60000, services: 35000 },
  { month: "Dec", rooms: 240000, food: 80000, services: 48000 },
]

const occupancyData = [
  { month: "Jan", occupancy: 65 },
  { month: "Feb", occupancy: 68 },
  { month: "Mar", occupancy: 72 },
  { month: "Apr", occupancy: 75 },
  { month: "May", occupancy: 80 },
  { month: "Jun", occupancy: 85 },
  { month: "Jul", occupancy: 90 },
  { month: "Aug", occupancy: 95 },
  { month: "Sep", occupancy: 88 },
  { month: "Oct", occupancy: 82 },
  { month: "Nov", occupancy: 78 },
  { month: "Dec", occupancy: 88 },
]

const foodItemsData = [
  { name: "Butter Chicken", value: 25 },
  { name: "Biryani", value: 20 },
  { name: "Masala Dosa", value: 15 },
  { name: "Continental Breakfast", value: 12 },
  { name: "Paneer Tikka", value: 10 },
  { name: "Others", value: 18 },
]

const taxSummaryData = [
  { month: "Jan", sgst: 12000, cgst: 12000, total: 24000 },
  { month: "Feb", sgst: 13500, cgst: 13500, total: 27000 },
  { month: "Mar", sgst: 15000, cgst: 15000, total: 30000 },
  { month: "Apr", sgst: 16500, cgst: 16500, total: 33000 },
  { month: "May", sgst: 18000, cgst: 18000, total: 36000 },
  { month: "Jun", sgst: 21000, cgst: 21000, total: 42000 },
  { month: "Jul", sgst: 23000, cgst: 23000, total: 46000 },
  { month: "Aug", sgst: 25000, cgst: 25000, total: 50000 },
  { month: "Sep", sgst: 22000, cgst: 22000, total: 44000 },
  { month: "Oct", sgst: 20000, cgst: 20000, total: 40000 },
  { month: "Nov", sgst: 18000, cgst: 18000, total: 36000 },
  { month: "Dec", sgst: 24000, cgst: 24000, total: 48000 },
]

export default function ReportsPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(new Date().getFullYear(), 0, 1))
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [reportPeriod, setReportPeriod] = useState("yearly")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">View and analyze hotel performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Parameters</CardTitle>
          <CardDescription>Select the time period and type of report</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Report Period</Label>
              <Select value={reportPeriod} onValueChange={setReportPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <DatePicker date={startDate} setDate={setStartDate} />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <DatePicker date={endDate} setDate={setEndDate} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="revenue">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          <TabsTrigger value="food">Food & Services</TabsTrigger>
          <TabsTrigger value="tax">Tax Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>Breakdown of revenue by category over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
                                  <span className="font-bold text-muted-foreground">{payload[0].payload.month}</span>
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
                                  <span className="font-bold">
                                    ₹{payload[0].value + payload[1].value + payload[2].value}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Legend />
                    <Bar dataKey="rooms" name="Room Revenue" fill="#3b82f6" />
                    <Bar dataKey="food" name="Food Revenue" fill="#22c55e" />
                    <Bar dataKey="services" name="Services Revenue" fill="#a855f7" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <Separator className="my-8" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Revenue Summary</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹4,456,000</div>
                      <p className="text-xs text-muted-foreground">For the selected period</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Average Monthly Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹371,333</div>
                      <p className="text-xs text-muted-foreground">Per month average</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Revenue Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-500">+12.5%</div>
                      <p className="text-xs text-muted-foreground">Compared to previous period</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="occupancy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Rate Analysis</CardTitle>
              <CardDescription>Room occupancy percentage over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={occupancyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis unit="%" />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
                                  <span className="font-bold text-muted-foreground">{payload[0].payload.month}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">Occupancy Rate</span>
                                  <span className="font-bold">{payload[0].value}%</span>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="occupancy"
                      name="Occupancy Rate"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <Separator className="my-8" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Occupancy Summary</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Average Occupancy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">81.5%</div>
                      <p className="text-xs text-muted-foreground">For the selected period</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Peak Occupancy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">95%</div>
                      <p className="text-xs text-muted-foreground">Highest recorded in August</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Average Stay Duration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2.8 days</div>
                      <p className="text-xs text-muted-foreground">Average guest stay length</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="food" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Food & Services Analysis</CardTitle>
              <CardDescription>Popular menu items and service utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Popular Food Items</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={foodItemsData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {foodItemsData.map((entry, index) => (
                            <Sector
                              key={`cell-${index}`}
                              fill={["#3b82f6", "#22c55e", "#a855f7", "#f59e0b", "#ef4444", "#64748b"][index % 6]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="grid gap-2">
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">Item</span>
                                      <span className="font-bold text-muted-foreground">{payload[0].name}</span>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">Orders</span>
                                      <span className="font-bold">{payload[0].value}%</span>
                                    </div>
                                  </div>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-medium">Service Utilization</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={[
                          { name: "Laundry Service", value: 320 },
                          { name: "Spa Treatment", value: 180 },
                          { name: "Airport Transfer", value: 150 },
                          { name: "Room Service", value: 450 },
                          { name: "Gym Access", value: 210 },
                        ]}
                        margin={{ top: 20, right: 20, bottom: 20, left: 100 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="grid gap-2">
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">Service</span>
                                      <span className="font-bold text-muted-foreground">{payload[0].payload.name}</span>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                                        Usage Count
                                      </span>
                                      <span className="font-bold">{payload[0].value}</span>
                                    </div>
                                  </div>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Bar dataKey="value" fill="#a855f7" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Food & Services Summary</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Food Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹758,000</div>
                      <p className="text-xs text-muted-foreground">17% of total revenue</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Services Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹436,000</div>
                      <p className="text-xs text-muted-foreground">10% of total revenue</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹850</div>
                      <p className="text-xs text-muted-foreground">Per food order</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tax" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Summary</CardTitle>
              <CardDescription>Breakdown of taxes collected and paid</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={taxSummaryData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
                                  <span className="font-bold text-muted-foreground">{payload[0].payload.month}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">SGST</span>
                                    <span className="font-bold text-blue-500">₹{payload[0].value}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">CGST</span>
                                    <span className="font-bold text-green-500">₹{payload[1].value}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">Total</span>
                                    <span className="font-bold">₹{payload[2].value}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Legend />
                    <Bar dataKey="sgst" name="SGST" fill="#3b82f6" />
                    <Bar dataKey="cgst" name="CGST" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <Separator className="my-8" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tax Summary</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Tax Collected</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹456,000</div>
                      <p className="text-xs text-muted-foreground">For the selected period</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">SGST Collected</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹228,000</div>
                      <p className="text-xs text-muted-foreground">9% of taxable revenue</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">CGST Collected</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹228,000</div>
                      <p className="text-xs text-muted-foreground">9% of taxable revenue</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
