"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, CreditCard, Download, Percent, Plus, Printer, Trash } from "lucide-react"
import Link from "next/link"

export default function BillingDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("bill-details")
  const [discountType, setDiscountType] = useState("percentage")
  const [discountValue, setDiscountValue] = useState("0")

  const handlePayment = () => {
    toast({
      title: "Payment successful",
      description: "Payment has been processed successfully",
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
          <h2 className="text-3xl font-bold tracking-tight">Bill #{params.id}</h2>
          <p className="text-muted-foreground">Manage and process payment for this bill</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bill-details">Bill Details</TabsTrigger>
              <TabsTrigger value="payment-history">Payment History</TabsTrigger>
            </TabsList>
            <TabsContent value="bill-details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Guest Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Guest Name</p>
                      <p>Arjun Mehta</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Room Number</p>
                      <p>105</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Check-in Date</p>
                      <p>Apr 12, 2025</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Check-out Date</p>
                      <p>Apr 15, 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bill Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <div className="grid grid-cols-12 gap-2 p-4 font-medium">
                        <div className="col-span-5">Item</div>
                        <div className="col-span-2 text-right">Quantity</div>
                        <div className="col-span-2 text-right">Rate</div>
                        <div className="col-span-2 text-right">Amount</div>
                        <div className="col-span-1"></div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-12 gap-2 p-4">
                        <div className="col-span-5">Room Charge (Deluxe)</div>
                        <div className="col-span-2 text-right">3 nights</div>
                        <div className="col-span-2 text-right">₹1,500</div>
                        <div className="col-span-2 text-right">₹4,500</div>
                        <div className="col-span-1"></div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-12 gap-2 p-4">
                        <div className="col-span-5">Room Service - Dinner</div>
                        <div className="col-span-2 text-right">1</div>
                        <div className="col-span-2 text-right">₹850</div>
                        <div className="col-span-2 text-right">₹850</div>
                        <div className="col-span-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-12 gap-2 p-4">
                        <div className="col-span-5">Laundry Service</div>
                        <div className="col-span-2 text-right">1</div>
                        <div className="col-span-2 text-right">₹350</div>
                        <div className="col-span-2 text-right">₹350</div>
                        <div className="col-span-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Item
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payment-history">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>Record of all payments made for this bill</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 gap-2 p-4 font-medium">
                      <div>Date</div>
                      <div>Amount</div>
                      <div>Method</div>
                      <div>Reference</div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-4 gap-2 p-4">
                      <div>Apr 12, 2025</div>
                      <div>₹1,500</div>
                      <div>Cash</div>
                      <div>Advance Payment</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹5,700</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (18% GST)</span>
                  <span>₹1,026</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-6 w-6">
                      <Percent className="h-3 w-3" />
                    </Button>
                    <span>₹0</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹6,726</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Amount Paid</span>
                  <span>₹1,500</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Balance Due</span>
                  <span>₹5,226</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Apply Discount</Label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      type="number"
                      min="0"
                      value={discountValue}
                      onChange={(e) => setDiscountValue(e.target.value)}
                      placeholder="Discount value"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setDiscountType(discountType === "percentage" ? "amount" : "percentage")}
                  >
                    {discountType === "percentage" ? "%" : "₹"}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-method">Payment Method</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Card
                  </Button>
                  <Button variant="outline" className="justify-start">
                    Cash
                  </Button>
                  <Button variant="outline" className="justify-start">
                    UPI
                  </Button>
                </div>
              </div>

              <Button className="w-full" onClick={handlePayment}>
                Collect Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
