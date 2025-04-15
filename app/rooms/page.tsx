"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BedDouble, Eye, FileEdit, Filter, Plus, Search, Settings } from "lucide-react"

// Sample room data
const rooms = [
  {
    id: 101,
    type: "Standard",
    floor: 1,
    capacity: 2,
    rate: 3500,
    status: "Occupied",
    guest: "Rahul Verma",
    checkIn: "Apr 15, 2025",
    checkOut: "Apr 20, 2025",
    amenities: ["Wi-Fi", "TV", "AC", "Breakfast"],
  },
  {
    id: 102,
    type: "Standard",
    floor: 1,
    capacity: 2,
    rate: 3500,
    status: "Available",
    guest: null,
    checkIn: null,
    checkOut: null,
    amenities: ["Wi-Fi", "TV", "AC", "Breakfast"],
  },
  {
    id: 103,
    type: "Standard",
    floor: 1,
    capacity: 2,
    rate: 3500,
    status: "Occupied",
    guest: "Vikram Singh",
    checkIn: "Apr 15, 2025",
    checkOut: "Apr 19, 2025",
    amenities: ["Wi-Fi", "TV", "AC", "Breakfast"],
  },
  {
    id: 104,
    type: "Standard",
    floor: 1,
    capacity: 2,
    rate: 3500,
    status: "Maintenance",
    guest: null,
    checkIn: null,
    checkOut: null,
    amenities: ["Wi-Fi", "TV", "AC", "Breakfast"],
  },
  {
    id: 105,
    type: "Standard",
    floor: 1,
    capacity: 2,
    rate: 3500,
    status: "Occupied",
    guest: "Arjun Mehta",
    checkIn: "Apr 12, 2025",
    checkOut: "Apr 15, 2025",
    amenities: ["Wi-Fi", "TV", "AC", "Breakfast"],
  },
  {
    id: 201,
    type: "Deluxe",
    floor: 2,
    capacity: 2,
    rate: 4500,
    status: "Available",
    guest: null,
    checkIn: null,
    checkOut: null,
    amenities: ["Wi-Fi", "TV", "AC", "Breakfast", "Mini Bar", "Bathtub"],
  },
  {
    id: 202,
    type: "Deluxe",
    floor: 2,
    capacity: 2,
    rate: 4500,
    status: "Available",
    guest: null,
    checkIn: null,
    checkOut: null,
    amenities: ["Wi-Fi", "TV", "AC", "Breakfast", "Mini Bar", "Bathtub"],
  },
  {
    id: 203,
    type: "Deluxe",
    floor: 2,
    capacity: 2,
    rate: 4500,
    status: "Checkout Today",
    guest: "John Smith",
    checkIn: "Apr 10, 2025",
    checkOut: "Apr 15, 2025",
    amenities: ["Wi-Fi", "TV", "AC", "Breakfast", "Mini Bar", "Bathtub"],
  },
  {
    id: 204,
    type: "Deluxe",
    floor: 2,
    capacity: 2,
    rate: 4500,
    status: "Reserved",
    guest: "Neha Gupta",
    checkIn: "Apr 18, 2025",
    checkOut: "Apr 22, 2025",
    amenities: ["Wi-Fi", "TV", "AC", "Breakfast", "Mini Bar", "Bathtub"],
  },
  {
    id: 205,
    type: "Deluxe",
    floor: 2,
    capacity: 2,
    rate: 4500,
    status: "Occupied",
    guest: "Rahul Verma",
    checkIn: "Apr 15, 2025",
    checkOut: "Apr 20, 2025",
    amenities: ["Wi-Fi", "TV", "AC", "Breakfast", "Mini Bar", "Bathtub"],
  },
  {
    id: 301,
    type: "Suite",
    floor: 3,
    capacity: 4,
    rate: 6500,
    status: "Available",
    guest: null,
    checkIn: null,
    checkOut: null,
    amenities: ["Wi-Fi", "TV", "AC", "Breakfast", "Mini Bar", "Bathtub", "Living Room", "Kitchenette"],
  },
  {
    id: 302,
    type: "Suite",
    floor: 3,
    capacity: 4,
    rate: 6500,
    status: "Occupied",
    guest: "Priya Sharma",
    checkIn: "Apr 15, 2025",
    checkOut: "Apr 18, 2025",
    amenities: ["Wi-Fi", "TV", "AC", "Breakfast", "Mini Bar", "Bathtub", "Living Room", "Kitchenette"],
  },
  {
    id: 303,
    type: "Suite",
    floor: 3,
    capacity: 4,
    rate: 6500,
    status: "Available",
    guest: null,
    checkIn: null,
    checkOut: null,
    amenities: ["Wi-Fi", "TV", "AC", "Breakfast", "Mini Bar", "Bathtub", "Living Room", "Kitchenette"],
  },
  {
    id: 304,
    type: "Suite",
    floor: 3,
    capacity: 4,
    rate: 6500,
    status: "Maintenance",
    guest: null,
    checkIn: null,
    checkOut: null,
    amenities: ["Wi-Fi", "TV", "AC", "Breakfast", "Mini Bar", "Bathtub", "Living Room", "Kitchenette"],
  },
  {
    id: 401,
    type: "Executive Suite",
    floor: 4,
    capacity: 4,
    rate: 8500,
    status: "Occupied",
    guest: "Ananya Patel",
    checkIn: "Apr 15, 2025",
    checkOut: "Apr 17, 2025",
    amenities: [
      "Wi-Fi",
      "TV",
      "AC",
      "Breakfast",
      "Mini Bar",
      "Bathtub",
      "Living Room",
      "Kitchenette",
      "Jacuzzi",
      "Private Balcony",
    ],
  },
  {
    id: 402,
    type: "Executive Suite",
    floor: 4,
    capacity: 4,
    rate: 8500,
    status: "Available",
    guest: null,
    checkIn: null,
    checkOut: null,
    amenities: [
      "Wi-Fi",
      "TV",
      "AC",
      "Breakfast",
      "Mini Bar",
      "Bathtub",
      "Living Room",
      "Kitchenette",
      "Jacuzzi",
      "Private Balcony",
    ],
  },
]

// Room types data
const roomTypes = [
  {
    id: "standard",
    name: "Standard Room",
    baseRate: 3500,
    capacity: 2,
    description: "Comfortable room with essential amenities",
    amenities: ["Wi-Fi", "TV", "AC", "Breakfast"],
  },
  {
    id: "deluxe",
    name: "Deluxe Room",
    baseRate: 4500,
    capacity: 2,
    description: "Spacious room with premium amenities",
    amenities: ["Wi-Fi", "TV", "AC", "Breakfast", "Mini Bar", "Bathtub"],
  },
  {
    id: "suite",
    name: "Suite",
    baseRate: 6500,
    capacity: 4,
    description: "Luxury suite with separate living area",
    amenities: ["Wi-Fi", "TV", "AC", "Breakfast", "Mini Bar", "Bathtub", "Living Room", "Kitchenette"],
  },
  {
    id: "executive",
    name: "Executive Suite",
    baseRate: 8500,
    capacity: 4,
    description: "Premium suite with exclusive amenities",
    amenities: [
      "Wi-Fi",
      "TV",
      "AC",
      "Breakfast",
      "Mini Bar",
      "Bathtub",
      "Living Room",
      "Kitchenette",
      "Jacuzzi",
      "Private Balcony",
    ],
  },
]

export default function RoomsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredRooms = rooms.filter(
    (room) =>
      (statusFilter === "all" || room.status === statusFilter) &&
      (typeFilter === "all" || room.type === typeFilter) &&
      (searchQuery === "" ||
        room.id.toString().includes(searchQuery) ||
        (room.guest && room.guest.toLowerCase().includes(searchQuery.toLowerCase()))),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900"
      case "Occupied":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900"
      case "Checkout Today":
        return "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-900"
      case "Reserved":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900"
      case "Maintenance":
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-400 dark:border-gray-900"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Room Management</h2>
          <p className="text-muted-foreground">Manage hotel rooms and their status</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/rooms/types">
              <Settings className="mr-2 h-4 w-4" />
              Room Types
            </Link>
          </Button>
          <Button asChild>
            <Link href="/rooms/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Room Status Overview</CardTitle>
          <CardDescription>Current status of all rooms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Rooms</p>
                    <p className="text-2xl font-bold">{rooms.length}</p>
                  </div>
                  <BedDouble className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Available</p>
                    <p className="text-2xl font-bold">{rooms.filter((r) => r.status === "Available").length}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-green-500"></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Occupied</p>
                    <p className="text-2xl font-bold">{rooms.filter((r) => r.status === "Occupied").length}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-red-500"></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Maintenance</p>
                    <p className="text-2xl font-bold">{rooms.filter((r) => r.status === "Maintenance").length}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gray-500"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by room number or guest name..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Room Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Deluxe">Deluxe</SelectItem>
                  <SelectItem value="Suite">Suite</SelectItem>
                  <SelectItem value="Executive Suite">Executive Suite</SelectItem>
                </SelectContent>
              </Select>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    Status
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Statuses</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Available")}>Available</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Occupied")}>Occupied</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Checkout Today")}>Checkout Today</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Reserved")}>Reserved</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Maintenance")}>Maintenance</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredRooms.map((room) => (
              <Card key={room.id} className="overflow-hidden">
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Room {room.id}</CardTitle>
                    <Badge variant="outline" className={getStatusColor(room.status)}>
                      {room.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    {room.type} - Floor {room.floor}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Rate:</span>
                      <span className="font-medium">₹{room.rate}/night</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Capacity:</span>
                      <span>{room.capacity} Persons</span>
                    </div>
                    {room.guest && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Guest:</span>
                          <span>{room.guest}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Check-in:</span>
                          <span>{room.checkIn}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Check-out:</span>
                          <span>{room.checkOut}</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
                <div className="flex border-t p-4">
                  <Button variant="outline" size="sm" className="ml-auto mr-2" asChild>
                    <Link href={`/rooms/${room.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/rooms/${room.id}/edit`}>
                      <FileEdit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="floor-view">
        <TabsList>
          <TabsTrigger value="floor-view">Floor View</TabsTrigger>
          <TabsTrigger value="room-types">Room Types</TabsTrigger>
        </TabsList>
        <TabsContent value="floor-view" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Floor View</CardTitle>
              <CardDescription>View rooms organized by floor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[1, 2, 3, 4].map((floor) => (
                <div key={floor} className="space-y-2">
                  <h3 className="font-medium">Floor {floor}</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {rooms
                      .filter((room) => room.floor === floor)
                      .map((room) => (
                        <Link
                          key={room.id}
                          href={`/rooms/${room.id}`}
                          className={`flex h-12 items-center justify-center rounded-md border text-sm font-medium ${
                            room.status === "Available"
                              ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100 dark:border-green-900 dark:bg-green-950 dark:text-green-400"
                              : room.status === "Checkout Today"
                                ? "border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-400"
                                : room.status === "Reserved"
                                  ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400"
                                  : room.status === "Maintenance"
                                    ? "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-gray-900 dark:bg-gray-950 dark:text-gray-400"
                                    : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-900 dark:bg-red-950 dark:text-red-400"
                          }`}
                        >
                          {room.id}
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
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
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs">Reserved</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-xs">Occupied</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                  <span className="text-xs">Maintenance</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="room-types" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Room Types</CardTitle>
              <CardDescription>View and manage room types and rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roomTypes.map((type) => (
                  <Card key={type.id}>
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <CardTitle>{type.name}</CardTitle>
                        <Badge variant="outline">₹{type.baseRate}/night</Badge>
                      </div>
                      <CardDescription>{type.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Capacity:</span>
                          <span>{type.capacity} Persons</span>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Amenities:</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {type.amenities.map((amenity, index) => (
                              <Badge key={index} variant="secondary" className="mr-1">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Available Rooms:</span>
                          <span>
                            {rooms.filter((r) => r.type === type.name && r.status === "Available").length} /
                            {rooms.filter((r) => r.type === type.name).length}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <div className="flex border-t p-4">
                      <Button variant="outline" size="sm" className="ml-auto" asChild>
                        <Link href={`/rooms/types/${type.id}`}>
                          <FileEdit className="mr-2 h-4 w-4" />
                          Edit Type
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
