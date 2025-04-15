"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Check, CreditCard, FileEdit, Mail, Phone, Printer, UserMinus, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

// Sample booking data - in a real app, you would fetch this based on the ID
const bookingsData = {
  "BK-1001": {
    id: "BK-1001",
    guest: "Rahul Verma",
    guestId: "G-1001",
    email: "rahul.verma@example.com",
    phone: "+91 98765 43210",
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
    bookingDate: "Apr 1, 2025",
    specialRequests: "High floor, away from elevator",
    paymentHistory: [
      {
        id: "PAY-1001",
        date: "Apr 1, 2025",
        amount: 11250,
        method: "Credit Card",
        reference: "Auth #XYZ123",
      },
      {
        id: "PAY-1002",
        date: "Apr 15, 2025",
        amount: 11250,
        method: "Cash",
        reference: "Receipt #1001",
      },
    ],
    notes: "Repeat guest. Prefers quiet rooms away from elevator.",
  },
  "BK-1006": {
    id: "BK-1006",
    guest: "Neha Gupta",
    guestId: "G-1006",
    email: "neha.gupta@example.com",
    phone: "+91 87654 32109",
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
    bookingDate: "Apr 5, 2025",
    specialRequests: "Baby cot, extra pillows",
    paymentHistory: [
      {
        id: "PAY-1003",
        date: "Apr 5, 2025",
        amount: 9000,
        method: "Credit Card",
        reference: "Auth #ABC456",
      },
    ],
    notes: "First time guest. Traveling with infant.",
  },
}

export default function BookingDetailsPage() {
  const params = useParams()
  const bookingId = params.id as string

  // In a real app, you would fetch the booking data based on the ID
  // For this example, we'll use the sample data
  const booking = bookingsData[bookingId as keyof typeof bookingsData] || bookingsData["BK-1001"]

  const [activeTab, setActiveTab] = useState("details")
  const { toast } = useToast()

  const handleCancelBooking = () => {
    toast({
      title: "Booking cancelled",
      description: `Booking ${booking.id} has been cancelled.`,
    })
  }

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
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/bookings">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Booking {booking.id}</h2>
          <p className="text-muted-foreground">Manage booking details and status</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/bookings/${booking.id}/edit`}>
              <FileEdit className="mr-2 h-4 w-4" />
              Edit Booking
            </Link>
          </Button>
          {booking.status === "Confirmed" && (
            <Button variant="destructive" onClick={handleCancelBooking}>
              <X className="mr-2 h-4 w-4" />
              Cancel Booking
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Booking Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Status</h3>
              <Badge variant="outline" className={getStatusColor(booking.status)}>
                {booking.status}
              </Badge>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Stay Duration</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.checkIn} to {booking.checkOut} ({booking.nights} nights)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CreditCard className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Payment</p>
                  <p className="text-sm text-muted-foreground">
                    Total: ₹{booking.amount} | Paid: ₹{booking.paid} | Balance: ₹{booking.balance}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium">Guest Information</h4>
              <div className="mt-2 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium">Name:</span>
                  <span className="text-sm">{booking.guest}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{booking.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{booking.email}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium">Room Details</h4>
              <div className="mt-2 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium">Room:</span>
                  <span className="text-sm">{booking.room}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium">Type:</span>
                  <span className="text-sm">{booking.roomType}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium">Guests:</span>
                  <span className="text-sm">
                    {booking.adults} Adults, {booking.children} Children
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium">Booking Details</h4>
              <div className="mt-2 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium">Booking Date:</span>
                  <span className="text-sm">{booking.bookingDate}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium">Source:</span>
                  <span className="text-sm">{booking.source}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium">Special Requests:</span>
                  <span className="text-sm">{booking.specialRequests}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {booking.status === "Confirmed" ? (
              <Button className="w-full" asChild>
                <Link href={`/guests/check-in?booking=${booking.id}`}>
                  <Check className="mr-2 h-4 w-4" />
                  Check-in Guest
                </Link>
              </Button>
            ) : booking.status === "Checked In" ? (
              <Button className="w-full" asChild>
                <Link href={`/guests/${booking.guestId}/checkout`}>
                  <UserMinus className="mr-2 h-4 w-4" />
                  Check-out Guest
                </Link>
              </Button>
            ) : null}
          </CardFooter>
        </Card>

        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Booking Details</TabsTrigger>
              <TabsTrigger value="payments">Payment History</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Stay Details</CardTitle>
                  <CardDescription>Detailed information about the booking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <h4 className="font-medium">Check-in Information</h4>
                        <div className="rounded-md border p-3">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-muted-foreground">Date:</div>
                            <div>{booking.checkIn}</div>
                            <div className="text-muted-foreground">Time:</div>
                            <div>12:00 PM</div>
                            <div className="text-muted-foreground">Status:</div>
                            <div>{booking.status === "Checked In" ? "Completed" : "Pending"}</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Check-out Information</h4>
                        <div className="rounded-md border p-3">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-muted-foreground">Date:</div>
                            <div>{booking.checkOut}</div>
                            <div className="text-muted-foreground">Time:</div>
                            <div>10:00 AM</div>
                            <div className="text-muted-foreground">Status:</div>
                            <div>{booking.status === "Completed" ? "Completed" : "Pending"}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Rate Information</h4>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Description</TableHead>
                              <TableHead>Rate</TableHead>
                              <TableHead>Nights</TableHead>
                              <TableHead>Amount</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>{booking.roomType} Room</TableCell>
                              <TableCell>₹{booking.amount / booking.nights}/night</TableCell>
                              <TableCell>{booking.nights}</TableCell>
                              <TableCell>₹{booking.amount}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell colSpan={3} className="text-right font-medium">
                                Subtotal:
                              </TableCell>
                              <TableCell>₹{booking.amount}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell colSpan={3} className="text-right font-medium">
                                Tax (18%):
                              </TableCell>
                              <TableCell>₹{booking.amount * 0.18}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell colSpan={3} className="text-right font-medium">
                                Total:
                              </TableCell>
                              <TableCell className="font-bold">₹{booking.amount * 1.18}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>Record of all payments for this booking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Payment ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Reference</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {booking.paymentHistory.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell>₹{payment.amount}</TableCell>
                            <TableCell>{payment.method}</TableCell>
                            <TableCell>{payment.reference}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-4 rounded-md border p-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Payment Summary</p>
                        <p className="text-sm text-muted-foreground">Current payment status</p>
                      </div>
                      <div className="text-right">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-right text-muted-foreground">Total Amount:</div>
                          <div className="text-right">₹{booking.amount}</div>
                          <div className="text-right text-muted-foreground">Amount Paid:</div>
                          <div className="text-right">₹{booking.paid}</div>
                          <div className="text-right font-medium">Balance Due:</div>
                          <div className="text-right font-medium">₹{booking.balance}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  {booking.balance > 0 && (
                    <Button className="w-full" asChild>
                      <Link href={`/billing/new?booking=${booking.id}`}>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Collect Payment
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Notes</CardTitle>
                  <CardDescription>Notes and special instructions for this booking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <h4 className="font-medium">Special Requests</h4>
                      <p className="mt-2 text-sm">{booking.specialRequests}</p>
                    </div>

                    <div className="rounded-md border p-4">
                      <h4 className="font-medium">Staff Notes</h4>
                      <p className="mt-2 text-sm">{booking.notes}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <FileEdit className="mr-2 h-4 w-4" />
                    Add Note
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
