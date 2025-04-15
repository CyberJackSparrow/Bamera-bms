"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  Bell,
  Database,
  Download,
  Key,
  Lock,
  Mail,
  Plus,
  Save,
  Trash,
  Upload,
  UserPlus,
} from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your hotel settings and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hotel Information</CardTitle>
              <CardDescription>Basic information about your hotel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hotel-name">Hotel Name</Label>
                <Input id="hotel-name" defaultValue="Bamera Grand Hotel" />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" defaultValue="123 Main Street, Bangalore, Karnataka, India" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Information</Label>
                  <Textarea
                    id="contact"
                    defaultValue="Phone: +91 98765 43210&#10;Email: info@bamerahotel.com&#10;Website: www.bamerahotel.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="gst">GST Number</Label>
                  <Input id="gst" defaultValue="29ABCDE1234F1Z5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pan">PAN Number</Label>
                  <Input id="pan" defaultValue="ABCDE1234F" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">Hotel License Number</Label>
                  <Input id="license" defaultValue="HOTEL-KA-12345" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Hotel Logo</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=100&width=100" alt="Hotel Logo" />
                    <AvatarFallback>BH</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Logo
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
              <CardDescription>Configure system-wide preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="inr">
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inr">Indian Rupee (₹)</SelectItem>
                      <SelectItem value="usd">US Dollar ($)</SelectItem>
                      <SelectItem value="eur">Euro (€)</SelectItem>
                      <SelectItem value="gbp">British Pound (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="kn">Kannada</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="check-in-time">Default Check-in Time</Label>
                  <Select defaultValue="12:00">
                    <SelectTrigger id="check-in-time">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="12:00">12:00 PM</SelectItem>
                      <SelectItem value="13:00">1:00 PM</SelectItem>
                      <SelectItem value="14:00">2:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="check-out-time">Default Check-out Time</Label>
                  <Select defaultValue="10:00">
                    <SelectTrigger id="check-out-time">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="12:00">12:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                  <Input id="tax-rate" type="number" defaultValue="18" min="0" max="100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="dd-mm-yyyy">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage staff accounts and permissions</CardDescription>
                </div>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 p-4 font-medium">
                  <div className="col-span-3">Name</div>
                  <div className="col-span-3">Email</div>
                  <div className="col-span-2">Role</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>
                <Separator />
                {[
                  { id: 1, name: "John Doe", email: "john@bamerahotel.com", role: "Administrator", status: "Active" },
                  { id: 2, name: "Jane Smith", email: "jane@bamerahotel.com", role: "Receptionist", status: "Active" },
                  {
                    id: 3,
                    name: "Raj Kumar",
                    email: "raj@bamerahotel.com",
                    role: "Restaurant Manager",
                    status: "Active",
                  },
                  {
                    id: 4,
                    name: "Priya Sharma",
                    email: "priya@bamerahotel.com",
                    role: "Accountant",
                    status: "Inactive",
                  },
                ].map((user) => (
                  <div key={user.id}>
                    <div className="grid grid-cols-12 gap-2 p-4">
                      <div className="col-span-3 flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                      <div className="col-span-3 flex items-center">{user.email}</div>
                      <div className="col-span-2 flex items-center">
                        <Badge variant="outline">{user.role}</Badge>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <Badge
                          variant="outline"
                          className={
                            user.status === "Active"
                              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900"
                              : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900"
                          }
                        >
                          {user.status}
                        </Badge>
                      </div>
                      <div className="col-span-2 flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Key className="h-4 w-4" />
                          <span className="sr-only">Reset Password</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>Configure access levels for different user roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, name: "Administrator", description: "Full access to all features" },
                  { id: 2, name: "Manager", description: "Access to most features except system settings" },
                  { id: 3, name: "Receptionist", description: "Access to guest management and billing" },
                  { id: 4, name: "Restaurant Staff", description: "Access to food service and menu management" },
                ].map((role) => (
                  <div key={role.id} className="rounded-md border p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-semibold">{role.name}</h3>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit Permissions
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Settings</CardTitle>
              <CardDescription>Configure invoice and receipt templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invoice-prefix">Invoice Number Prefix</Label>
                <Input id="invoice-prefix" defaultValue="INV-" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="receipt-prefix">Receipt Number Prefix</Label>
                <Input id="receipt-prefix" defaultValue="RCPT-" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice-footer">Invoice Footer Text</Label>
                <Textarea
                  id="invoice-footer"
                  defaultValue="Thank you for choosing Bamera Grand Hotel. We look forward to serving you again."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="terms">Terms and Conditions</Label>
                <Textarea
                  id="terms"
                  defaultValue="1. All rates are inclusive of applicable taxes.&#10;2. Check-out time is 10:00 AM.&#10;3. Late check-out will incur additional charges."
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="show-logo" defaultChecked />
                <Label htmlFor="show-logo">Show hotel logo on invoices</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Configure accepted payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {[
                  { id: "cash", label: "Cash" },
                  { id: "card", label: "Credit/Debit Card" },
                  { id: "upi", label: "UPI" },
                  { id: "bank", label: "Bank Transfer" },
                  { id: "wallet", label: "Digital Wallets" },
                ].map((method) => (
                  <div key={method.id} className="flex items-center space-x-2">
                    <Switch id={method.id} defaultChecked />
                    <Label htmlFor={method.id}>{method.label}</Label>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="default-payment">Default Payment Method</Label>
                <Select defaultValue="cash">
                  <SelectTrigger id="default-payment">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="wallet">Digital Wallets</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Discount Configuration</CardTitle>
              <CardDescription>Configure discount types and approval workflows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 p-4 font-medium">
                  <div className="col-span-4">Discount Type</div>
                  <div className="col-span-2">Value</div>
                  <div className="col-span-3">Approval Required</div>
                  <div className="col-span-3 text-right">Actions</div>
                </div>
                <Separator />
                {[
                  { id: 1, type: "Loyalty Discount", value: "10%", approval: "No" },
                  { id: 2, type: "Corporate Rate", value: "15%", approval: "No" },
                  { id: 3, type: "Special Promotion", value: "20%", approval: "Yes (Manager)" },
                  { id: 4, type: "VIP Guest", value: "25%", approval: "Yes (Admin)" },
                ].map((discount) => (
                  <div key={discount.id}>
                    <div className="grid grid-cols-12 gap-2 p-4">
                      <div className="col-span-4">{discount.type}</div>
                      <div className="col-span-2">{discount.value}</div>
                      <div className="col-span-3">{discount.approval}</div>
                      <div className="col-span-3 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Discount Type
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure email notifications for various events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-from">From Email Address</Label>
                <Input id="email-from" defaultValue="notifications@bamerahotel.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-name">From Name</Label>
                <Input id="email-name" defaultValue="Bamera Grand Hotel" />
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-medium">Email Notification Types</h3>
                <div className="space-y-2">
                  {[
                    { id: "booking", label: "New Booking Confirmation" },
                    { id: "checkin", label: "Check-in Confirmation" },
                    { id: "checkout", label: "Check-out Reminder" },
                    { id: "payment", label: "Payment Receipt" },
                    { id: "feedback", label: "Guest Feedback Request" },
                  ].map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{notification.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id={notification.id} defaultChecked />
                        <Button variant="outline" size="sm">
                          Edit Template
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Configure internal system notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {[
                  {
                    id: "low-inventory",
                    label: "Low Inventory Alert",
                    description: "Notify when inventory items are running low",
                  },
                  {
                    id: "payment-overdue",
                    label: "Payment Overdue",
                    description: "Notify when guest payments are overdue",
                  },
                  {
                    id: "checkout-reminder",
                    label: "Checkout Reminder",
                    description: "Remind staff about upcoming checkouts",
                  },
                  {
                    id: "system-backup",
                    label: "System Backup Status",
                    description: "Notify about backup success or failure",
                  },
                  {
                    id: "security-alert",
                    label: "Security Alerts",
                    description: "Notify about suspicious login attempts",
                  },
                ].map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{alert.label}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                    </div>
                    <Switch id={alert.id} defaultChecked />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Backup</CardTitle>
              <CardDescription>Configure automatic database backups</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border bg-muted/50 p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <p className="text-sm font-medium">Regular backups are essential to prevent data loss.</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup-frequency">Backup Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="backup-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup-time">Backup Time</Label>
                <Select defaultValue="00:00">
                  <SelectTrigger id="backup-time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="00:00">12:00 AM</SelectItem>
                    <SelectItem value="03:00">3:00 AM</SelectItem>
                    <SelectItem value="06:00">6:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="18:00">6:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="retention">Backup Retention Period</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="retention">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="email-backup" defaultChecked />
                <Label htmlFor="email-backup">Email backup reports to administrators</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Latest Backup
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manual Backup</CardTitle>
              <CardDescription>Create and manage manual backups</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">
                <Database className="mr-2 h-4 w-4" />
                Create Manual Backup Now
              </Button>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 p-4 font-medium">
                  <div className="col-span-4">Backup Name</div>
                  <div className="col-span-3">Date</div>
                  <div className="col-span-2">Size</div>
                  <div className="col-span-3 text-right">Actions</div>
                </div>
                <Separator />
                {[
                  { id: 1, name: "Manual Backup", date: "Apr 15, 2025, 9:30 AM", size: "42.5 MB" },
                  { id: 2, name: "Pre-Update Backup", date: "Apr 10, 2025, 6:15 PM", size: "41.8 MB" },
                  { id: 3, name: "Monthly Backup", date: "Apr 1, 2025, 12:00 AM", size: "40.2 MB" },
                ].map((backup) => (
                  <div key={backup.id}>
                    <div className="grid grid-cols-12 gap-2 p-4">
                      <div className="col-span-4">{backup.name}</div>
                      <div className="col-span-3">{backup.date}</div>
                      <div className="col-span-2">{backup.size}</div>
                      <div className="col-span-3 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-3 w-3" />
                          Download
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Export</CardTitle>
              <CardDescription>Export system data for external use</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-medium">Guest Data</h3>
                  <p className="text-sm text-muted-foreground">Export guest information and stay history</p>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export Guest Data
                  </Button>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Financial Data</h3>
                  <p className="text-sm text-muted-foreground">Export billing and payment records</p>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export Financial Data
                  </Button>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Inventory Data</h3>
                  <p className="text-sm text-muted-foreground">Export inventory and stock information</p>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export Inventory Data
                  </Button>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Audit Logs</h3>
                  <p className="text-sm text-muted-foreground">Export system audit logs</p>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export Audit Logs
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="export-format">Export Format</Label>
                <Select defaultValue="csv">
                  <SelectTrigger id="export-format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="include-sensitive" />
                <Label htmlFor="include-sensitive">Include sensitive data in exports</Label>
              </div>
              <div className="rounded-md border bg-muted/50 p-4">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-amber-500" />
                  <p className="text-sm">
                    Sensitive data exports require administrator approval and are logged for security purposes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
