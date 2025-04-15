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
import { Save, Upload } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your hotel settings and preferences
        </p>
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
              <CardDescription>
                Basic information about your hotel
              </CardDescription>
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
                  <Textarea id="contact" defaultValue="Phone: +91 98765 43210&#10;Email: info@bamerahotel.com&#10;Website: www.bamerahotel.com" />
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
              <CardDescription>
                Configure system-wide preferences
              </CardDescription>
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
                    <SelectContent\
