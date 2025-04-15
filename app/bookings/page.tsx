"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, Check, ChevronsUpDown, Plus, Search } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"

// Sample booking data
const bookings = [
  {
    id: "BK-1001",
    guest: "Rahul Verma",
    guestId: "G-1001",
    room: "205",
    roomType: "Deluxe",
    checkIn: "Apr 15, 2025",
    checkOut: "Apr 20, 2025",
    nights: 5,
    adults: 2,
    children: 0,
    status: "Checked In",
    source: "Direct",
    amount: 22500,
    paid: 22500,
    balance: 0,
  },
  {
    id: "BK-1002",
    guest: "Priya Sharma",
    guestId: "G-1002",
    room: "302",
    roomType: "Suite",
    checkIn: "Apr 15, 2025",
    checkOut: "Apr 18, 2025",
    nights: 3,
    adults: 2,
    children: 1,
    status: "Checked In",
    source: "Website",
    amount: 19500,
    paid: 19500,
    balance: 0,
  },
  {
    id: "BK-1003",
    guest: "Vikram Singh",
    guestId: "G-1003",
    room: "103",
    roomType: "Standard",
    checkIn: "Apr 15, 2025",
    checkOut: "Apr 19, 2025",
    nights: 4,
    adults: 1,
    children: 0,
    status: "Checked In",
    source: "Direct",
    amount: 14000,
    paid: 14000,
    balance: 0,
  },
  {
    id: "BK-1004",
    guest: "Ananya Patel",
    guestId: "G-1004",
    room: "401",
    roomType: "Executive Suite",
    checkIn: "Apr 15, 2025",
    checkOut: "Apr 17, 2025",
    nights: 2,
    adults: 2,
    children: 2,
    status: "Checked In",
    source: "OTA",
    amount: 17000,
    paid: 17000,
    balance: 0,
  },
  {
    id: "BK-1005",
    guest: "Arjun Mehta",
    guestId: "G-1005",
    room: "105",
    roomType: "Standard",
    checkIn: "Apr 12, 2025",
    checkOut: "Apr 15, 2025",
    nights: 3,
    adults: 2,
    children: 0,
    status: "Checked In",
    source: "Direct",
    amount: 10500,
    paid: 10500,
    balance: 0,
  },
  {
    id: "BK-1006",
    guest: "Neha Gupta",
    guestId: "G-1006",
    room: "210",
    roomType: "Deluxe",
    checkIn: "Apr 18, 2025",
    checkOut: "Apr 22, 2025",
    nights: 4,
    adults: 2,
    children: 1,
    status: "Confirmed",
    source: "Website",
    amount: 18000,
    paid: 9000,
    balance: 9000,
  },
  {
    id: "BK-1007",
    guest: "Sanjay Kumar",
    guestId: "G-1007",
    room: "304",
    roomType: "Suite",
    checkIn: "Apr 5, 2025",
    checkOut: "Apr 10, 2025",
    nights: 5,
    adults: 2,
    children: 0,
    status: "Completed",
    source: "OTA",
    amount: 32500,
    paid: 32500,
    balance: 0,
  },
  {
    id: "BK-1008",
    guest: "Meera Reddy",
    guestId: "G-1008",
    room: "118",
    roomType: "Standard",
    checkIn: "Apr 8, 2025",
    checkOut: "Apr 12, 2025",
    nights: 4,
    adults: 1,
    children: 0,
    status: "Completed",
    source: "Direct",
    amount: 14000,
    paid: 14000,
    balance: 0,
  },
  {
    id: "BK-1009",
    guest: "Rajesh Khanna",
    guestId: null,
    room: "206",
    roomType: "Deluxe",
    checkIn: "Apr 25, 2025",
    checkOut: "Apr 30, 2025",
    nights: 5,
    adults: 2,
    children: 1,
    status: "Confirmed",
    source: "Website",
    amount: 22500,
    paid: 11250,
    balance: 11250,
  },
  {
    id: "BK-1010",
    guest: "Sunita Patel",
    guestId: null,
    room: "305",
    roomType: "Suite",
    checkIn: "May 1, 2025",
    checkOut: "May 5, 2025",
    nights: 4,
    adults: 2,
    children: 2,
    status: "Confirmed",
    source: "OTA",
    amount: 26000,
    paid: 26000,
    balance: 0,
  },
]

// Room types data
const roomTypes = [
  { value: "standard", label: "Standard Room" },
  { value: "deluxe", label: "Deluxe Room" },
  { value: "suite", label: "Suite" },
  { value: "executive", label: "Executive Suite" },
]

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(new Date().setDate(new Date().getDate() + 7)))
  const [roomTypeFilter, setRoomTypeFilter] = useState("")

  const filteredBookings = bookings.filter(
    (booking) =>
      (statusFilter === "all" || booking.status === statusFilter) &&
      (roomTypeFilter === "" || booking.roomType.toLowerCase() === roomTypeFilter.toLowerCase()) &&
      (searchQuery === "" ||
        booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.room.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Checked In":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900"
      case "Confirmed":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900"
      case "Completed":
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-400 dark:border-gray-900"
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
          <p className="text-muted-foreground">Manage hotel bookings and reservations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/bookings/new">
              <Plus className="mr-2 h-4 w-4" />
              New Booking
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking Calendar</CardTitle>
          <CardDescription>View and manage bookings by date</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="grid gap-2">
              <Label>Check-in Date Range</Label>
              <div className="flex items-center gap-2">
                <DatePicker date={startDate} setDate={setStartDate} />
                <span>to</span>
                <DatePicker date={endDate} setDate={setEndDate} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Room Type</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" className="w-[200px] justify-between">
                    {roomTypeFilter
                      ? roomTypes.find((type) => type.value === roomTypeFilter)?.label
                      : "Select room type"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search room type..." />
                    <CommandList>
                      <CommandEmpty>No room type found.</CommandEmpty>
                      <CommandGroup>
                        {roomTypes.map((type) => (
                          <CommandItem
                            key={type.value}
                            value={type.value}
                            onSelect={(currentValue) => {
                              setRoomTypeFilter(currentValue === roomTypeFilter ? "" : currentValue)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                roomTypeFilter === type.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {type.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Checked In">Checked In</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by booking ID, guest, or room..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5 text-muted-foreground" />
              <h3 className="font-medium">Bookings Calendar</h3>
            </div>
            <div className="mt-4 overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-8 gap-2 rounded-t-md bg-muted p-2 text-center text-sm font-medium">
                  <div>Room</div>
                  <div>Apr 15</div>
                  <div>Apr 16</div>
                  <div>Apr 17</div>
                  <div>Apr 18</div>
                  <div>Apr 19</div>
                  <div>Apr 20</div>
                  <div>Apr 21</div>
                </div>
                {[
                  { room: "101", type: "Standard" },
                  { room: "102", type: "Standard" },
                  { room: "103", type: "Standard" },
                  { room: "104", type: "Standard" },
                  { room: "105", type: "Standard" },
                  { room: "201", type: "Deluxe" },
                  { room: "202", type: "Deluxe" },
                  { room: "203", type: "Deluxe" },
                  { room: "204", type: "Deluxe" },
                  { room: "205", type: "Deluxe" },
                  { room: "301", type: "Suite" },
                  { room: "302", type: "Suite" },
                  { room: "303", type: "Suite" },
                  { room: "304", type: "Suite" },
                  { room: "401", type: "Executive Suite" },
                  { room: "402", type: "Executive Suite" },
                ]
                  .filter((room) => roomTypeFilter === "" || room.type.toLowerCase() === roomTypeFilter.toLowerCase())
                  .map((room) => {
                    const roomBookings = bookings.filter((booking) => booking.room === room.room)
                    return (
                      <div key={room.room} className="grid grid-cols-8 gap-2 border-b p-2">
                        <div className="flex items-center">
                          <span className="font-medium">{room.room}</span>
                          <span className="ml-2 text-xs text-muted-foreground">{room.type}</span>
                        </div>
                        {Array.from({ length: 7 }).map((_, index) => {
                          const date = new Date(2025, 3, 15 + index) // April 15, 2025 + index days
                          const dateStr = `Apr ${15 + index}, 2025`
                          const booking = roomBookings.find(
                            (b) => new Date(b.checkIn) <= date && new Date(b.checkOut) > date,
                          )
                          return (
                            <div key={index} className="h-10">
                              {booking ? (
                                <div
                                  className={`flex h-full items-center justify-center rounded-md text-xs font-medium ${
                                    booking.status === "Checked In"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                      : booking.status === "Confirmed"
                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                        : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                                  }`}
                                  title={`${booking.guest} (${booking.checkIn} - ${booking.checkOut})`}
                                >
                                  {booking.guest.split(" ")[0]}
                                </div>
                              ) : (
                                <div className="flex h-full items-center justify-center rounded-md border border-dashed border-muted-foreground/20 text-xs text-muted-foreground">
                                  Available
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-xs">Checked In</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-xs">Confirmed</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                <span className="text-xs">Completed</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <span className="text-xs">Cancelled</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
          <TabsTrigger value="current">Current Guests</TabsTrigger>
          <TabsTrigger value="past">Past Bookings</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>Future reservations and bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings
                    .filter((booking) => booking.status === "Confirmed")
                    .map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>{booking.guest}</TableCell>
                        <TableCell>
                          {booking.room} ({booking.roomType})
                        </TableCell>
                        <TableCell>{booking.checkIn}</TableCell>
                        <TableCell>{booking.checkOut}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>₹{booking.amount}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/bookings/${booking.id}`}>View</Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/guests/check-in?booking=${booking.id}`}>
                                <Check className="mr-2 h-4 w-4" />
                                Check-in
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Guests</CardTitle>
              <CardDescription>Guests currently checked in</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Nights</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings
                    .filter((booking) => booking.status === "Checked In")
                    .map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>{booking.guest}</TableCell>
                        <TableCell>
                          {booking.room} ({booking.roomType})
                        </TableCell>
                        <TableCell>{booking.checkIn}</TableCell>
                        <TableCell>{booking.checkOut}</TableCell>
                        <TableCell>{booking.nights}</TableCell>
                        <TableCell>₹{booking.amount}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/bookings/${booking.id}`}>View</Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/guests/${booking.guestId}/checkout`}>
                                <Check className="mr-2 h-4 w-4" />
                                Check-out
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Past Bookings</CardTitle>
              <CardDescription>Completed and cancelled bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings
                    .filter((booking) => booking.status === "Completed" || booking.status === "Cancelled")
                    .map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>{booking.guest}</TableCell>
                        <TableCell>
                          {booking.room} ({booking.roomType})
                        </TableCell>
                        <TableCell>{booking.checkIn}</TableCell>
                        <TableCell>{booking.checkOut}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>₹{booking.amount}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/bookings/${booking.id}`}>View</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
