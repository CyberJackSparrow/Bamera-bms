"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, FileEdit, Filter, MoreHorizontal, Search, UserPlus } from "lucide-react"

// Sample guest data
const guests = [
  {
    id: "G-1001",
    name: "Rahul Verma",
    phone: "+91 98765 43210",
    email: "rahul.verma@example.com",
    idType: "Aadhar",
    idNumber: "XXXX-XXXX-1234",
    status: "Checked In",
    room: "205",
    checkIn: "Apr 15, 2025",
    checkOut: "Apr 20, 2025",
    visits: 2,
  },
  {
    id: "G-1002",
    name: "Priya Sharma",
    phone: "+91 87654 32109",
    email: "priya.sharma@example.com",
    idType: "Passport",
    idNumber: "A1234567",
    status: "Checked In",
    room: "302",
    checkIn: "Apr 15, 2025",
    checkOut: "Apr 18, 2025",
    visits: 1,
  },
  {
    id: "G-1003",
    name: "Vikram Singh",
    phone: "+91 76543 21098",
    email: "vikram.singh@example.com",
    idType: "Driving License",
    idNumber: "DL-123456789",
    status: "Checked In",
    room: "103",
    checkIn: "Apr 15, 2025",
    checkOut: "Apr 19, 2025",
    visits: 3,
  },
  {
    id: "G-1004",
    name: "Ananya Patel",
    phone: "+91 65432 10987",
    email: "ananya.patel@example.com",
    idType: "Aadhar",
    idNumber: "XXXX-XXXX-5678",
    status: "Checked In",
    room: "401",
    checkIn: "Apr 15, 2025",
    checkOut: "Apr 17, 2025",
    visits: 1,
  },
  {
    id: "G-1005",
    name: "Arjun Mehta",
    phone: "+91 54321 09876",
    email: "arjun.mehta@example.com",
    idType: "Voter ID",
    idNumber: "VOTER-123456",
    status: "Checked In",
    room: "105",
    checkIn: "Apr 12, 2025",
    checkOut: "Apr 15, 2025",
    visits: 2,
  },
  {
    id: "G-1006",
    name: "Neha Gupta",
    phone: "+91 43210 98765",
    email: "neha.gupta@example.com",
    idType: "Aadhar",
    idNumber: "XXXX-XXXX-9012",
    status: "Reserved",
    room: "210",
    checkIn: "Apr 18, 2025",
    checkOut: "Apr 22, 2025",
    visits: 0,
  },
  {
    id: "G-1007",
    name: "Sanjay Kumar",
    phone: "+91 32109 87654",
    email: "sanjay.kumar@example.com",
    idType: "Passport",
    idNumber: "B9876543",
    status: "Checked Out",
    room: "304",
    checkIn: "Apr 5, 2025",
    checkOut: "Apr 10, 2025",
    visits: 1,
  },
  {
    id: "G-1008",
    name: "Meera Reddy",
    phone: "+91 21098 76543",
    email: "meera.reddy@example.com",
    idType: "Aadhar",
    idNumber: "XXXX-XXXX-3456",
    status: "Checked Out",
    room: "118",
    checkIn: "Apr 8, 2025",
    checkOut: "Apr 12, 2025",
    visits: 4,
  },
]

export default function GuestsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredGuests = guests.filter(
    (guest) =>
      (statusFilter === "all" || guest.status === statusFilter) &&
      (searchQuery === "" ||
        guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guest.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guest.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guest.email.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Guest Management</h2>
          <p className="text-muted-foreground">Manage hotel guests and their information</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/guests/check-in">
              <UserPlus className="mr-2 h-4 w-4" />
              New Check-in
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Guest Directory</CardTitle>
          <CardDescription>View and manage all guest records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name, ID, phone or email..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Guests</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Checked In")}>Checked In</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Checked Out")}>Checked Out</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Reserved")}>Reserved</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="mt-6 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGuests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell className="font-medium">{guest.id}</TableCell>
                    <TableCell>
                      <div>
                        <div>{guest.name}</div>
                        <div className="text-sm text-muted-foreground">{guest.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>{guest.room}</TableCell>
                    <TableCell>{guest.checkIn}</TableCell>
                    <TableCell>{guest.checkOut}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          guest.status === "Checked In"
                            ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900"
                            : guest.status === "Checked Out"
                              ? "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-400 dark:border-gray-900"
                              : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900"
                        }
                      >
                        {guest.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/guests/${guest.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/guests/${guest.id}/edit`}>
                              <FileEdit className="mr-2 h-4 w-4" />
                              Edit Guest
                            </Link>
                          </DropdownMenuItem>
                          {guest.status === "Checked In" && (
                            <DropdownMenuItem asChild>
                              <Link href={`/billing/new?guest=${guest.id}`}>
                                <FileEdit className="mr-2 h-4 w-4" />
                                Create Bill
                              </Link>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="current">
        <TabsList>
          <TabsTrigger value="current">Current Guests</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Reservations</TabsTrigger>
          <TabsTrigger value="history">Guest History</TabsTrigger>
        </TabsList>
        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Currently Checked-in Guests</CardTitle>
              <CardDescription>Guests currently staying at the hotel</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest Name</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Outstanding Balance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guests
                    .filter((guest) => guest.status === "Checked In")
                    .map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{guest.name}</div>
                            <div className="text-sm text-muted-foreground">{guest.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>{guest.room}</TableCell>
                        <TableCell>{guest.checkIn}</TableCell>
                        <TableCell>{guest.checkOut}</TableCell>
                        <TableCell>₹{Math.floor(Math.random() * 5000)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/guests/${guest.id}`}>View Details</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Reservations</CardTitle>
              <CardDescription>Guests with future bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest Name</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Booking Source</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guests
                    .filter((guest) => guest.status === "Reserved")
                    .map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{guest.name}</div>
                            <div className="text-sm text-muted-foreground">{guest.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>{guest.room}</TableCell>
                        <TableCell>{guest.checkIn}</TableCell>
                        <TableCell>{guest.checkOut}</TableCell>
                        <TableCell>Direct Booking</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/guests/${guest.id}`}>View Details</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Guest History</CardTitle>
              <CardDescription>Past stays and guest records</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest Name</TableHead>
                    <TableHead>Last Stay</TableHead>
                    <TableHead>Total Visits</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Last Room</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guests
                    .filter((guest) => guest.status === "Checked Out")
                    .map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{guest.name}</div>
                            <div className="text-sm text-muted-foreground">{guest.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>{guest.checkOut}</TableCell>
                        <TableCell>{guest.visits}</TableCell>
                        <TableCell>₹{Math.floor(Math.random() * 50000) + 10000}</TableCell>
                        <TableCell>{guest.room}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/guests/${guest.id}`}>View History</Link>
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
