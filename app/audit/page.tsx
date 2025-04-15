"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Search } from "lucide-react"

const auditLogs = [
  {
    id: "LOG-1001",
    action: "Bill Modification",
    description: "Discount of 10% applied to bill #BILL-1002",
    user: "John Doe (Admin)",
    timestamp: "Apr 15, 2025, 10:30 AM",
    category: "billing",
  },
  {
    id: "LOG-1002",
    action: "Check-in",
    description: "Guest Priya Sharma checked in to Room 302",
    user: "Jane Smith (Receptionist)",
    timestamp: "Apr 15, 2025, 11:45 AM",
    category: "guest",
  },
  {
    id: "LOG-1003",
    action: "Menu Update",
    description: "Added new item 'Paneer Butter Masala' to the menu",
    user: "Raj Kumar (Restaurant Manager)",
    timestamp: "Apr 15, 2025, 12:15 PM",
    category: "menu",
  },
  {
    id: "LOG-1004",
    action: "Payment",
    description: "Payment of ₹5,310 received for bill #BILL-1003",
    user: "Jane Smith (Receptionist)",
    timestamp: "Apr 15, 2025, 2:30 PM",
    category: "billing",
  },
  {
    id: "LOG-1005",
    action: "Room Service",
    description: "Room service order placed for Room 105",
    user: "Raj Kumar (Restaurant Manager)",
    timestamp: "Apr 15, 2025, 3:45 PM",
    category: "service",
  },
  {
    id: "LOG-1006",
    action: "Check-out",
    description: "Guest Vikram Singh checked out from Room 203",
    user: "Jane Smith (Receptionist)",
    timestamp: "Apr 15, 2025, 4:30 PM",
    category: "guest",
  },
  {
    id: "LOG-1007",
    action: "User Login",
    description: "User John Doe logged in to the system",
    user: "System",
    timestamp: "Apr 15, 2025, 9:00 AM",
    category: "system",
  },
  {
    id: "LOG-1008",
    action: "Bill Void",
    description: "Bill #BILL-1005 voided due to system error",
    user: "John Doe (Admin)",
    timestamp: "Apr 15, 2025, 5:15 PM",
    category: "billing",
  },
  {
    id: "LOG-1009",
    action: "Rate Change",
    description: "Room rate for Deluxe Rooms updated from ₹4,500 to ₹4,800",
    user: "John Doe (Admin)",
    timestamp: "Apr 15, 2025, 6:00 PM",
    category: "system",
  },
  {
    id: "LOG-1010",
    action: "Backup",
    description: "System backup completed successfully",
    user: "System",
    timestamp: "Apr 15, 2025, 11:00 PM",
    category: "system",
  },
]

export default function AuditPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())

  const filteredLogs = auditLogs.filter(
    (log) =>
      (categoryFilter === "all" || log.category === categoryFilter) &&
      (searchQuery === "" ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.user.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Audit Logs</h2>
          <p className="text-muted-foreground">Track and monitor all system activities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Logs</CardTitle>
          <CardDescription>Search and filter audit logs by various criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by action, description, or user..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="guest">Guest Management</SelectItem>
                  <SelectItem value="menu">Menu Management</SelectItem>
                  <SelectItem value="service">Services</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date Range</Label>
              <div className="flex gap-2">
                <DatePicker date={startDate} setDate={setStartDate} />
                <DatePicker date={endDate} setDate={setEndDate} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audit Log Entries</CardTitle>
          <CardDescription>
            Showing {filteredLogs.length} of {auditLogs.length} log entries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.id} className="rounded-lg border p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{log.action}</h3>
                      <Badge
                        variant="outline"
                        className={
                          log.category === "billing"
                            ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900"
                            : log.category === "guest"
                              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900"
                              : log.category === "menu"
                                ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-900"
                                : log.category === "service"
                                  ? "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-900"
                                  : "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-400 dark:border-gray-900"
                        }
                      >
                        {log.category}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{log.description}</p>
                  </div>
                  <div className="text-sm text-right">
                    <div className="font-medium">{log.user}</div>
                    <div className="text-muted-foreground">{log.timestamp}</div>
                    <div className="text-xs text-muted-foreground">ID: {log.id}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
