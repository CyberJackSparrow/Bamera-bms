"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  BedDouble,
  Calendar,
  Check,
  FileEdit,
  History,
  Loader2,
  Settings,
  UserPlus,
  Wrench,
} from "lucide-react"

// Sample room data - in a real app, you would fetch this based on the ID
const roomsData = {
  "101": {
    id: 101,
    type: "Standard",
    floor: 1,
    capacity: 2,
    rate: 3500,
    status: "Occupied",
    guest: "Rahul Verma",
    guestId: "G-1001",
    checkIn: "Apr 15, 2025",
    checkOut: "Apr 20, 2025",
    amenities: ["Wi-Fi", "TV", "AC", "Breakfast"],
    description: "Comfortable standard room with a queen-sized bed and essential amenities.",
    size: "25 sq.m",
    bedType: "Queen",
    view: "City",
    smoking: false,
    maintenanceHistory: [
      {
        id: "M-1001",
        date: "Mar 10, 2025",
        issue: "AC Repair",
        description: "Fixed AC cooling issue",
        status: "Completed",
        technician: "Raj Kumar",
      },
      {
        id: "M-845",
        date: "Jan 05, 2025",
        issue: "Plumbing",
        description: "Fixed bathroom sink leak",
        status: "Completed",
        technician: "Suresh Patel",
      },
    ],
    bookingHistory: [
      {
        id: "B-1001",
        guest: "Rahul Verma",
        checkIn: "Apr 15, 2025",
        checkOut: "Apr 20, 2025",
        nights: 5,
        amount: "₹17,500",
        status: "Current",
      },
      {
        id: "B-845",
        guest: "Meera Reddy",
        checkIn: "Apr 1, 2025",
        checkOut: "Apr 5, 2025",
        nights: 4,
        amount: "₹14,000",
        status: "Completed",
      },
      {
        id: "B-789",
        guest: "Vikram Singh",
        checkIn: "Mar 20, 2025",
        checkOut: "Mar 25, 2025",
        nights: 5,
        amount: "₹17,500",
        status: "Completed",
      },
    ],
  },
  "205": {
    id: 205,
    type: "Deluxe",
    floor: 2,
    capacity: 2,
    rate: 4500,
    status: "Occupied",
    guest: "Rahul Verma",
    guestId: "G-1001",
    checkIn: "Apr 15, 2025",
    checkOut: "Apr 20, 2025",
    amenities: ["Wi-Fi", "TV", "AC", "Breakfast", "Mini Bar", "Bathtub"],
    description: "Spacious deluxe room with a king-sized bed and premium amenities.",
    size: "35 sq.m",
    bedType: "King",
    view: "Pool",
    smoking: false,
    maintenanceHistory: [
      {
        id: "M-1002",
        date: "Feb 15, 2025",
        issue: "TV Replacement",
        description: "Replaced TV with new model",
        status: "Completed",
        technician: "Raj Kumar",
      },
    ],
    bookingHistory: [
      {
        id: "B-1002",
        guest: "Rahul Verma",
        checkIn: "Apr 15, 2025",
        checkOut: "Apr 20, 2025",
        nights: 5,
        amount: "₹22,500",
        status: "Current",
      },
      {
        id: "B-846",
        guest: "Ananya Patel",
        checkIn: "Mar 25, 2025",
        checkOut: "Mar 30, 2025",
        nights: 5,
        amount: "₹22,500",
        status: "Completed",
      },
    ],
  },
  "302": {
    id: 302,
    type: "Suite",
    floor: 3,
    capacity: 4,
    rate: 6500,
    status: "Occupied",
    guest: "Priya Sharma",
    guestId: "G-1002",
    checkIn: "Apr 15, 2025",
    checkOut: "Apr 18, 2025",
    amenities: ["Wi-Fi", "TV", "AC", "Breakfast", "Mini Bar", "Bathtub", "Living Room", "Kitchenette"],
    description: "Luxury suite with separate living area and premium amenities.",
    size: "50 sq.m",
    bedType: "King + Sofa Bed",
    view: "City",
    smoking: false,
    maintenanceHistory: [],
    bookingHistory: [
      {
        id: "B-1003",
        guest: "Priya Sharma",
        checkIn: "Apr 15, 2025",
        checkOut: "Apr 18, 2025",
        nights: 3,
        amount: "₹19,500",
        status: "Current",
      },
    ],
  },
}

export default function RoomDetailsPage() {
  const params = useParams()
  const roomId = params.id as string

  // In a real app, you would fetch the room data based on the ID
  // For this example, we'll use the sample data
  const room = roomsData[roomId as keyof typeof roomsData] || roomsData["101"]

  const [activeTab, setActiveTab] = useState("overview")
  const [isChangingStatus, setIsChangingStatus] = useState(false)

  const handleStatusChange = (newStatus: string) => {
    setIsChangingStatus(true)
    // Simulate API call
    setTimeout(() => {
      setIsChangingStatus(false)
      // In a real app, you would update the room status via API
      // and then refresh the data
    }, 1000)
  }

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
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/rooms">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Room {room.id}</h2>
          <p className="text-muted-foreground">
            {room.type} - Floor {room.floor}
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/rooms/${room.id}/edit`}>
              <FileEdit className="mr-2 h-4 w-4" />
              Edit Room
            </Link>
          </Button>
          {room.status === "Available" ? (
            <Button variant="default" asChild>
              <Link href={`/guests/check-in?room=${room.id}`}>
                <UserPlus className="mr-2 h-4 w-4" />
                Check-in Guest
              </Link>
            </Button>
          ) : room.status === "Occupied" ? (
            <Button variant="default" asChild>
              <Link href={`/guests/${room.guestId}/checkout`}>
                <Check className="mr-2 h-4 w-4" />
                Check-out Guest
              </Link>
            </Button>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Room Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <BedDouble className="h-8 w-8 text-primary" />
              </div>
              <div>
                <Badge variant="outline" className={getStatusColor(room.status)}>
                  {room.status}
                </Badge>
                <p className="mt-1 text-sm text-muted-foreground">
                  {room.status === "Occupied"
                    ? `Occupied until ${room.checkOut}`
                    : room.status === "Available"
                      ? "Ready for check-in"
                      : room.status === "Maintenance"
                        ? "Under maintenance"
                        : room.status === "Reserved"
                          ? `Reserved for ${room.checkIn}`
                          : `Checkout scheduled for today`}
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium">Change Status</h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange("Available")}
                  disabled={room.status === "Available" || isChangingStatus}
                >
                  {isChangingStatus ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Available
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange("Maintenance")}
                  disabled={room.status === "Maintenance" || isChangingStatus}
                >
                  <Wrench className="mr-2 h-4 w-4" />
                  Maintenance
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange("Reserved")}
                  disabled={room.status === "Reserved" || isChangingStatus}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Reserved
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium">Room Details</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Room Type:</div>
                <div>{room.type}</div>
                <div className="text-muted-foreground">Floor:</div>
                <div>{room.floor}</div>
                <div className="text-muted-foreground">Capacity:</div>
                <div>{room.capacity} Persons</div>
                <div className="text-muted-foreground">Rate:</div>
                <div>₹{room.rate}/night</div>
                <div className="text-muted-foreground">Size:</div>
                <div>{room.size}</div>
                <div className="text-muted-foreground">Bed Type:</div>
                <div>{room.bedType}</div>
                <div className="text-muted-foreground">View:</div>
                <div>{room.view}</div>
                <div className="text-muted-foreground">Smoking:</div>
                <div>{room.smoking ? "Yes" : "No"}</div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium">Amenities</h4>
              <div className="flex flex-wrap gap-1">
                {room.amenities.map((amenity, index) => (
                  <Badge key={index} variant="secondary" className="mr-1">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">Booking History</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Occupancy</CardTitle>
                  {room.status === "Occupied" ? (
                    <CardDescription>Currently occupied by {room.guest}</CardDescription>
                  ) : (
                    <CardDescription>Room is not currently occupied</CardDescription>
                  )}
                </CardHeader>
                {room.status === "Occupied" && (
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <h4 className="font-medium">Guest Information</h4>
                          <div className="rounded-md border p-3">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="text-muted-foreground">Guest Name:</div>
                              <div>{room.guest}</div>
                              <div className="text-muted-foreground">Guest ID:</div>
                              <div>{room.guestId}</div>
                              <div className="text-muted-foreground">Check-in:</div>
                              <div>{room.checkIn}</div>
                              <div className="text-muted-foreground">Check-out:</div>
                              <div>{room.checkOut}</div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Stay Details</h4>
                          <div className="rounded-md border p-3">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="text-muted-foreground">Room Type:</div>
                              <div>{room.type}</div>
                              <div className="text-muted-foreground">Rate:</div>
                              <div>₹{room.rate}/night</div>
                              <div className="text-muted-foreground">Total Nights:</div>
                              <div>5</div>
                              <div className="text-muted-foreground">Total Amount:</div>
                              <div>₹{room.rate * 5}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
                <CardFooter>
                  {room.status === "Occupied" ? (
                    <div className="flex w-full justify-between">
                      <Button variant="outline" asChild>
                        <Link href={`/guests/${room.guestId}`}>View Guest Details</Link>
                      </Button>
                      <Button asChild>
                        <Link href={`/guests/${room.guestId}/checkout`}>
                          <Check className="mr-2 h-4 w-4" />
                          Process Check-out
                        </Link>
                      </Button>
                    </div>
                  ) : room.status === "Available" ? (
                    <Button className="w-full" asChild>
                      <Link href={`/guests/check-in?room=${room.id}`}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Check-in Guest
                      </Link>
                    </Button>
                  ) : null}
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Room Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{room.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="bookings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Booking History</CardTitle>
                  <CardDescription>Previous and current bookings for this room</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {room.bookingHistory.map((booking) => (
                      <div key={booking.id} className="rounded-md border p-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{booking.guest}</h3>
                              <Badge
                                variant="outline"
                                className={
                                  booking.status === "Current"
                                    ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900"
                                    : "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900"
                                }
                              >
                                {booking.status}
                              </Badge>
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {booking.checkIn} to {booking.checkOut} ({booking.nights} nights)
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{booking.amount}</div>
                            <div className="text-sm text-muted-foreground">Booking ID: {booking.id}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="maintenance" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Maintenance History</CardTitle>
                      <CardDescription>Record of maintenance activities</CardDescription>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href={`/rooms/${room.id}/maintenance/new`}>
                        <Wrench className="mr-2 h-4 w-4" />
                        Log Maintenance
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {room.maintenanceHistory.length === 0 ? (
                    <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                      <div className="text-center">
                        <History className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">No maintenance history found</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {room.maintenanceHistory.map((maintenance) => (
                        <div key={maintenance.id} className="rounded-md border p-4">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{maintenance.issue}</h3>
                                <Badge
                                  variant="outline"
                                  className={
                                    maintenance.status === "Completed"
                                      ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900"
                                      : "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-900"
                                  }
                                >
                                  {maintenance.status}
                                </Badge>
                              </div>
                              <p className="mt-1 text-sm text-muted-foreground">{maintenance.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{maintenance.date}</div>
                              <div className="text-sm text-muted-foreground">Technician: {maintenance.technician}</div>
                              <div className="text-xs text-muted-foreground">ID: {maintenance.id}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Schedule</CardTitle>
                  <CardDescription>Upcoming maintenance tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                    <div className="text-center">
                      <Settings className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">No scheduled maintenance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
