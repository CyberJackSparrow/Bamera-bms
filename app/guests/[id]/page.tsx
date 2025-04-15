"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Calendar, CreditCard, FileEdit, Mail, Phone, UserCheck, UserMinus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample guest data - in a real app, you would fetch this based on the ID
const guestData = {
  "G-1001": {
    id: "G-1001",
    name: "Rahul Verma",
    phone: "+91 98765 43210",
    email: "rahul.verma@example.com",
    address: "42 Park Avenue, Bangalore, Karnataka, 560001",
    idType: "Aadhar",
    idNumber: "XXXX-XXXX-1234",
    status: "Checked In",
    room: "205",
    checkIn: "Apr 15, 2025",
    checkOut: "Apr 20, 2025",
    visits: 2,
    stayHistory: [
      {
        id: "STAY-1001",
        room: "205",
        checkIn: "Apr 15, 2025",
        checkOut: "Apr 20, 2025",
        nights: 5,
        amount: "₹22,500",
        status: "Current Stay",
      },
      {
        id: "STAY-845",
        room: "302",
        checkIn: "Jan 10, 2025",
        checkOut: "Jan 12, 2025",
        nights: 2,
        amount: "₹9,000",
        status: "Completed",
      },
    ],
    billingHistory: [
      {
        id: "BILL-1001",
        date: "Apr 15, 2025",
        description: "Room Charge - Deluxe Room",
        amount: "₹4,500",
        status: "Paid",
      },
      {
        id: "BILL-1002",
        date: "Apr 15, 2025",
        description: "Food & Beverage - Room Service",
        amount: "₹850",
        status: "Paid",
      },
      {
        id: "BILL-1003",
        date: "Apr 16, 2025",
        description: "Room Charge - Deluxe Room",
        amount: "₹4,500",
        status: "Pending",
      },
    ],
    preferences: ["Non-smoking room", "High floor", "Extra pillows", "Early check-in when available"],
    notes: "Repeat guest. Prefers quiet rooms away from elevator. Allergic to nuts.",
  },
  "G-1002": {
    id: "G-1002",
    name: "Priya Sharma",
    phone: "+91 87654 32109",
    email: "priya.sharma@example.com",
    address: "78 Lake View, Mumbai, Maharashtra, 400001",
    idType: "Passport",
    idNumber: "A1234567",
    status: "Checked In",
    room: "302",
    checkIn: "Apr 15, 2025",
    checkOut: "Apr 18, 2025",
    visits: 1,
    stayHistory: [
      {
        id: "STAY-1002",
        room: "302",
        checkIn: "Apr 15, 2025",
        checkOut: "Apr 18, 2025",
        nights: 3,
        amount: "₹13,500",
        status: "Current Stay",
      },
    ],
    billingHistory: [
      {
        id: "BILL-1004",
        date: "Apr 15, 2025",
        description: "Room Charge - Suite",
        amount: "₹4,500",
        status: "Paid",
      },
      {
        id: "BILL-1005",
        date: "Apr 15, 2025",
        description: "Spa Services",
        amount: "₹2,500",
        status: "Paid",
      },
    ],
    preferences: ["King bed", "City view", "Late check-out when available"],
    notes: "First-time guest. Business traveler. Requested wake-up call service.",
  },
}

export default function GuestDetailsPage() {
  const params = useParams()
  const guestId = params.id as string

  // In a real app, you would fetch the guest data based on the ID
  // For this example, we'll use the sample data
  const guest = guestData[guestId as keyof typeof guestData] || guestData["G-1001"]

  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/guests">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{guest.name}</h2>
          <p className="text-muted-foreground">Guest ID: {guest.id}</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/guests/${guest.id}/edit`}>
              <FileEdit className="mr-2 h-4 w-4" />
              Edit Guest
            </Link>
          </Button>
          {guest.status === "Checked In" ? (
            <Button variant="default" asChild>
              <Link href={`/guests/${guest.id}/checkout`}>
                <UserMinus className="mr-2 h-4 w-4" />
                Check-out
              </Link>
            </Button>
          ) : (
            <Button variant="default" asChild>
              <Link href={`/guests/check-in?guest=${guest.id}`}>
                <UserCheck className="mr-2 h-4 w-4" />
                Check-in
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Guest Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">
                  {guest.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{guest.name}</h3>
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
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{guest.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{guest.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Current Stay</p>
                  <p className="text-sm text-muted-foreground">
                    {guest.status === "Checked In"
                      ? `${guest.checkIn} to ${guest.checkOut}`
                      : "Not currently checked in"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CreditCard className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">ID Information</p>
                  <p className="text-sm text-muted-foreground">
                    {guest.idType}: {guest.idNumber}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium">Address</h4>
              <p className="mt-1 text-sm text-muted-foreground">{guest.address}</p>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium">Guest Notes</h4>
              <p className="mt-1 text-sm text-muted-foreground">{guest.notes}</p>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium">Preferences</h4>
              <ul className="mt-1 space-y-1">
                {guest.preferences.map((pref, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    • {pref}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="stays">Stay History</TabsTrigger>
              <TabsTrigger value="billing">Billing History</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Stay Details</CardTitle>
                  {guest.status === "Checked In" ? (
                    <CardDescription>Currently staying in Room {guest.room}</CardDescription>
                  ) : (
                    <CardDescription>Not currently checked in</CardDescription>
                  )}
                </CardHeader>
                {guest.status === "Checked In" && (
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <h4 className="font-medium">Room Information</h4>
                        <div className="rounded-md border p-3">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-muted-foreground">Room Number:</div>
                            <div>{guest.room}</div>
                            <div className="text-muted-foreground">Room Type:</div>
                            <div>Deluxe Room</div>
                            <div className="text-muted-foreground">Floor:</div>
                            <div>2nd Floor</div>
                            <div className="text-muted-foreground">Rate:</div>
                            <div>₹4,500 per night</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Stay Duration</h4>
                        <div className="rounded-md border p-3">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-muted-foreground">Check-in:</div>
                            <div>{guest.checkIn}</div>
                            <div className="text-muted-foreground">Check-out:</div>
                            <div>{guest.checkOut}</div>
                            <div className="text-muted-foreground">Total Nights:</div>
                            <div>5</div>
                            <div className="text-muted-foreground">Days Remaining:</div>
                            <div>3</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <h4 className="font-medium">Current Charges</h4>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {guest.billingHistory.map((bill) => (
                              <TableRow key={bill.id}>
                                <TableCell>{bill.date}</TableCell>
                                <TableCell>{bill.description}</TableCell>
                                <TableCell>{bill.amount}</TableCell>
                                <TableCell>
                                  <Badge
                                    variant="outline"
                                    className={
                                      bill.status === "Paid"
                                        ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900"
                                        : "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-900"
                                    }
                                  >
                                    {bill.status}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                )}
                <CardFooter>
                  {guest.status === "Checked In" && (
                    <div className="flex w-full justify-between">
                      <Button variant="outline" asChild>
                        <Link href={`/billing/new?guest=${guest.id}`}>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Add Charge
                        </Link>
                      </Button>
                      <Button asChild>
                        <Link href={`/guests/${guest.id}/checkout`}>
                          <UserMinus className="mr-2 h-4 w-4" />
                          Process Check-out
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="stays" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Stay History</CardTitle>
                  <CardDescription>Record of all previous stays</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Stay ID</TableHead>
                          <TableHead>Room</TableHead>
                          <TableHead>Check-in</TableHead>
                          <TableHead>Check-out</TableHead>
                          <TableHead>Nights</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {guest.stayHistory.map((stay) => (
                          <TableRow key={stay.id}>
                            <TableCell className="font-medium">{stay.id}</TableCell>
                            <TableCell>{stay.room}</TableCell>
                            <TableCell>{stay.checkIn}</TableCell>
                            <TableCell>{stay.checkOut}</TableCell>
                            <TableCell>{stay.nights}</TableCell>
                            <TableCell>{stay.amount}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  stay.status === "Current Stay"
                                    ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900"
                                    : "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900"
                                }
                              >
                                {stay.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="billing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>Record of all charges and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Bill ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {guest.billingHistory.map((bill) => (
                          <TableRow key={bill.id}>
                            <TableCell className="font-medium">{bill.id}</TableCell>
                            <TableCell>{bill.date}</TableCell>
                            <TableCell>{bill.description}</TableCell>
                            <TableCell>{bill.amount}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  bill.status === "Paid"
                                    ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900"
                                    : "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-900"
                                }
                              >
                                {bill.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/billing/${bill.id}`}>View</Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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
