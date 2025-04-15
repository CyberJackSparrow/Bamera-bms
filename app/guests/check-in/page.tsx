"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, UserPlus } from "lucide-react"
import Link from "next/link"

export default function CheckInPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("guest-info")
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date())
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 1)),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Check-in successful",
      description: "Guest has been checked in to Room 302",
    })
    router.push("/dashboard")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Guest Check-in</h2>
          <p className="text-muted-foreground">Register a new guest and assign a room</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="guest-info">Guest Information</TabsTrigger>
          <TabsTrigger value="room-selection">Room Selection</TabsTrigger>
          <TabsTrigger value="payment">Initial Payment</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="guest-info">
            <Card>
              <CardHeader>
                <CardTitle>Guest Information</CardTitle>
                <CardDescription>Enter the guest's personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="Enter first name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Enter last name" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+91 98765 43210" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="id-type">ID Type</Label>
                    <Select defaultValue="aadhar">
                      <SelectTrigger id="id-type">
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aadhar">Aadhar Card</SelectItem>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="driving">Driving License</SelectItem>
                        <SelectItem value="voter">Voter ID</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="id-number">ID Number</Label>
                    <Input id="id-number" placeholder="Enter ID number" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" min="1" placeholder="Enter age" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Input id="guests" type="number" min="1" max="10" defaultValue="1" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Enter full address" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="special-requests">Special Requests</Label>
                  <Textarea id="special-requests" placeholder="Any special requests or preferences" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/dashboard">Cancel</Link>
                </Button>
                <Button type="button" onClick={() => setActiveTab("room-selection")}>
                  Next: Room Selection
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="room-selection">
            <Card>
              <CardHeader>
                <CardTitle>Room Selection</CardTitle>
                <CardDescription>Select a room and specify the stay duration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Check-in Date</Label>
                    <DatePicker date={checkInDate} setDate={setCheckInDate} />
                  </div>
                  <div className="space-y-2">
                    <Label>Check-out Date</Label>
                    <DatePicker date={checkOutDate} setDate={setCheckOutDate} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="room-type">Room Type</Label>
                    <Select defaultValue="deluxe">
                      <SelectTrigger id="room-type">
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Room</SelectItem>
                        <SelectItem value="deluxe">Deluxe Room</SelectItem>
                        <SelectItem value="suite">Suite</SelectItem>
                        <SelectItem value="executive">Executive Suite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="room-preference">Room Preference</Label>
                    <Select defaultValue="any">
                      <SelectTrigger id="room-preference">
                        <SelectValue placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="smoking">Smoking</SelectItem>
                        <SelectItem value="non-smoking">Non-Smoking</SelectItem>
                        <SelectItem value="high-floor">High Floor</SelectItem>
                        <SelectItem value="low-floor">Low Floor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Available Rooms</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex h-12 items-center justify-center rounded-md border border-green-200 bg-green-50 text-sm font-medium text-green-700 hover:bg-green-100 dark:border-green-900 dark:bg-green-950 dark:text-green-400"
                      >
                        {i + 301}
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Selected Room: 302 (Deluxe Room)</p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Room Details</h3>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>Room Type:</div>
                    <div>Deluxe Room</div>
                    <div>Rate per Night:</div>
                    <div>₹4,500</div>
                    <div>Number of Nights:</div>
                    <div>1</div>
                    <div className="font-medium">Total Room Charge:</div>
                    <div className="font-medium">₹4,500</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => setActiveTab("guest-info")}>
                  Back
                </Button>
                <Button type="button" onClick={() => setActiveTab("payment")}>
                  Next: Payment
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Initial Payment</CardTitle>
                <CardDescription>Collect initial payment or deposit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Booking Summary</h3>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>Guest Name:</div>
                    <div>John Doe</div>
                    <div>Room Number:</div>
                    <div>302 (Deluxe Room)</div>
                    <div>Check-in:</div>
                    <div>Apr 15, 2025</div>
                    <div>Check-out:</div>
                    <div>Apr 16, 2025</div>
                    <div>Number of Nights:</div>
                    <div>1</div>
                    <div>Number of Guests:</div>
                    <div>1</div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Payment Details</h3>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>Room Charge:</div>
                    <div>₹4,500</div>
                    <div>Taxes (18% GST):</div>
                    <div>₹810</div>
                    <div className="font-medium">Total Amount:</div>
                    <div className="font-medium">₹5,310</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select defaultValue="cash">
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="advance-amount">Advance Amount</Label>
                    <Input id="advance-amount" type="number" min="0" defaultValue="5310" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-reference">Payment Reference</Label>
                    <Input id="payment-reference" placeholder="Receipt/Transaction ID" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => setActiveTab("room-selection")}>
                  Back
                </Button>
                <Button type="submit">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Complete Check-in
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  )
}
