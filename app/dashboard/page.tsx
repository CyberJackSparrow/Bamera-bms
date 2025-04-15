import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { BedDouble, CreditCard, DollarSign, Search, UserPlus, Users } from "lucide-react"
import Link from "next/link"
import { RecentCheckinsTable } from "@/components/dashboard/recent-checkins-table"
import { PendingPaymentsTable } from "@/components/dashboard/pending-payments-table"
import { RoomOccupancyChart } from "@/components/dashboard/room-occupancy-chart"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { NotificationsList } from "@/components/dashboard/notifications-list"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, John. Here's an overview of your hotel.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search guests or rooms..." className="w-full pl-8" />
          </div>
          <Button asChild>
            <Link href="/guests/check-in">
              <UserPlus className="mr-2 h-4 w-4" />
              Check-in
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+5 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <BedDouble className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹24,565</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹8,464</div>
            <p className="text-xs text-muted-foreground">4 bills pending</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Room Status</CardTitle>
            <CardDescription>Current room occupancy and availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 20 }).map((_, i) => (
                <Link
                  key={i}
                  href={`/rooms/${i + 101}`}
                  className={`flex h-12 items-center justify-center rounded-md border text-sm font-medium ${
                    i % 3 === 0
                      ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100 dark:border-green-900 dark:bg-green-950 dark:text-green-400"
                      : i % 5 === 0
                        ? "border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-400"
                        : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-900 dark:bg-red-950 dark:text-red-400"
                  }`}
                >
                  {i + 101}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-xs">Available</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs">Checkout Today</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <span className="text-xs">Occupied</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Recent alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <NotificationsList />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent-checkins">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="recent-checkins">Recent Check-ins</TabsTrigger>
          <TabsTrigger value="pending-payments">Pending Payments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="recent-checkins" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Check-ins</CardTitle>
              <CardDescription>Guests who checked in within the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentCheckinsTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending-payments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Payments</CardTitle>
              <CardDescription>Bills that need to be settled</CardDescription>
            </CardHeader>
            <CardContent>
              <PendingPaymentsTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Room Occupancy</CardTitle>
                <CardDescription>Last 7 days occupancy rate</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <RoomOccupancyChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Last 7 days revenue breakdown</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <RevenueChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
