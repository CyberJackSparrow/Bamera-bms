"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, Download, FileText, Plus, Printer, Search } from "lucide-react"

// Sample billing data
const bills = [
  {
    id: "BILL-1001",
    guest: "Arjun Mehta",
    room: "105",
    amount: 4500,
    tax: 810,
    total: 5310,
    dueDate: "Today",
    status: "Overdue",
    date: "Apr 15, 2025",
    type: "Room Charge",
  },
  {
    id: "BILL-1002",
    guest: "Neha Gupta",
    room: "210",
    amount: 1950,
    tax: 351,
    total: 2301,
    dueDate: "Tomorrow",
    status: "Pending",
    date: "Apr 15, 2025",
    type: "Food & Beverage",
  },
  {
    id: "BILL-1003",
    guest: "Sanjay Kumar",
    room: "304",
    amount: 1020,
    tax: 183.6,
    total: 1203.6,
    dueDate: "Apr 17, 2025",
    status: "Pending",
    date: "Apr 15, 2025",
    type: "Room Service",
  },
  {
    id: "BILL-1004",
    guest: "Meera Reddy",
    room: "118",
    amount: 3060,
    tax: 550.8,
    total: 3610.8,
    dueDate: "Apr 16, 2025",
    status: "Pending",
    date: "Apr 15, 2025",
    type: "Room Charge",
  },
  {
    id: "BILL-1005",
    guest: "Rahul Verma",
    room: "205",
    amount: 4500,
    tax: 810,
    total: 5310,
    dueDate: "Apr 16, 2025",
    status: "Pending",
    date: "Apr 15, 2025",
    type: "Room Charge",
  },
  {
    id: "BILL-1006",
    guest: "Priya Sharma",
    room: "302",
    amount: 6500,
    tax: 1170,
    total: 7670,
    dueDate: "Apr 16, 2025",
    status: "Pending",
    date: "Apr 15, 2025",
    type: "Room Charge",
  },
  {
    id: "BILL-1007",
    guest: "Vikram Singh",
    room: "103",
    amount: 3500,
    tax: 630,
    total: 4130,
    dueDate: "Apr 16, 2025",
    status: "Pending",
    date: "Apr 15, 2025",
    type: "Room Charge",
  },
  {
    id: "BILL-1008",
    guest: "Ananya Patel",
    room: "401",
    amount: 8500,
    tax: 1530,
    total: 10030,
    dueDate: "Apr 16, 2025",
    status: "Pending",
    date: "Apr 15, 2025",
    type: "Room Charge",
  },
  {
    id: "BILL-1009",
    guest: "Rahul Verma",
    room: "205",
    amount: 850,
    tax: 153,
    total: 1003,
    dueDate: "Apr 15, 2025",
    status: "Paid",
    date: "Apr 15, 2025",
    type: "Food & Beverage",
  },
  {
    id: "BILL-1010",
    guest: "Priya Sharma",
    room: "302",
    amount: 2500,
    tax: 450,
    total: 2950,
    dueDate: "Apr 15, 2025",
    status: "Paid",
    date: "Apr 15, 2025",
    type: "Spa Services",
  },
]

// Sample payment data
const payments = [
  {
    id: "PAY-1001",
    billId: "BILL-1009",
    guest: "Rahul Verma",
    room: "205",
    amount: 1003,
    date: "Apr 15, 2025",
    method: "Cash",
    reference: "Receipt #1001",
  },
  {
    id: "PAY-1002",
    billId: "BILL-1010",
    guest: "Priya Sharma",
    room: "302",
    amount: 2950,
    date: "Apr 15, 2025",
    method: "Credit Card",
    reference: "Auth #XYZ123",
  },
  {
    id: "PAY-1003",
    billId: "BILL-845",
    guest: "Sanjay Kumar",
    room: "304",
    amount: 4130,
    date: "Apr 10, 2025",
    method: "UPI",
    reference: "UPI Ref #UPI123456",
  },
  {
    id: "PAY-1004",
    billId: "BILL-846",
    guest: "Meera Reddy",
    room: "118",
    amount: 5310,
    date: "Apr 8, 2025",
    method: "Bank Transfer",
    reference: "NEFT Ref #BT789012",
  },
]

export default function BillingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredBills = bills.filter(
    (bill) =>
      (statusFilter === "all" || bill.status === statusFilter) &&
      (typeFilter === "all" || bill.type === typeFilter) &&
      (searchQuery === "" ||
        bill.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.room.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const pendingAmount = filteredBills
    .filter((bill) => bill.status !== "Paid")
    .reduce((total, bill) => total + bill.total, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900"
      case "Overdue":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900"
      case "Pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-900"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Billing</h2>
          <p className="text-muted-foreground">Manage bills and payments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button asChild>
            <Link href="/billing/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Bill
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{pendingAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {filteredBills.filter((bill) => bill.status !== "Paid").length} bills pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹
              {filteredBills
                .filter((bill) => bill.status === "Overdue")
                .reduce((total, bill) => total + bill.total, 0)
                .toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {filteredBills.filter((bill) => bill.status === "Overdue").length} bills overdue
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Today</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹
              {filteredBills
                .filter((bill) => bill.dueDate === "Today")
                .reduce((total, bill) => total + bill.total, 0)
                .toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {filteredBills.filter((bill) => bill.dueDate === "Today").length} bills due today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collected Today</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹
              {payments
                .filter((payment) => payment.date === "Apr 15, 2025")
                .reduce((total, payment) => total + payment.amount, 0)
                .toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {payments.filter((payment) => payment.date === "Apr 15, 2025").length} payments today
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bills</CardTitle>
          <CardDescription>Manage and process bills</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by bill ID, guest, or room..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Bill Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Room Charge">Room Charge</SelectItem>
                  <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                  <SelectItem value="Room Service">Room Service</SelectItem>
                  <SelectItem value="Spa Services">Spa Services</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bill ID</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-medium">{bill.id}</TableCell>
                    <TableCell>{bill.guest}</TableCell>
                    <TableCell>{bill.room}</TableCell>
                    <TableCell>{bill.type}</TableCell>
                    <TableCell>₹{bill.total.toFixed(2)}</TableCell>
                    <TableCell>{bill.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(bill.status)}>
                        {bill.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/billing/${bill.id}`}>{bill.status !== "Paid" ? "Collect" : "View"}</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="payments">
        <TabsList>
          <TabsTrigger value="payments">Recent Payments</TabsTrigger>
          <TabsTrigger value="invoices">Generated Invoices</TabsTrigger>
        </TabsList>
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>Recent payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Bill ID</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Reference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.billId}</TableCell>
                      <TableCell>{payment.guest}</TableCell>
                      <TableCell>{payment.room}</TableCell>
                      <TableCell>₹{payment.amount.toFixed(2)}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>{payment.reference}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generated Invoices</CardTitle>
              <CardDescription>Recently generated invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bills
                    .filter((bill) => bill.status === "Paid")
                    .map((bill) => (
                      <TableRow key={`INV-${bill.id.split("-")[1]}`}>
                        <TableCell className="font-medium">{`INV-${bill.id.split("-")[1]}`}</TableCell>
                        <TableCell>{bill.guest}</TableCell>
                        <TableCell>{bill.room}</TableCell>
                        <TableCell>₹{bill.total.toFixed(2)}</TableCell>
                        <TableCell>{bill.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900"
                          >
                            Paid
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            <Printer className="mr-2 h-4 w-4" />
                            Print
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
