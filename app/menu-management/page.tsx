"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit, Plus, Save, Trash, Upload } from "lucide-react"
import Image from "next/image"

// Sample food menu data
const foodCategories = [
  { id: "breakfast", name: "Breakfast" },
  { id: "lunch", name: "Lunch" },
  { id: "dinner", name: "Dinner" },
  { id: "snacks", name: "Snacks & Appetizers" },
  { id: "beverages", name: "Beverages" },
  { id: "desserts", name: "Desserts" },
]

const foodItems = [
  {
    id: 1,
    name: "Continental Breakfast",
    description: "Toast, eggs, bacon, beans, and grilled tomatoes",
    price: 450,
    category: "breakfast",
    available: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Masala Dosa",
    description: "South Indian crepe with potato filling and chutneys",
    price: 250,
    category: "breakfast",
    available: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Butter Chicken",
    description: "Creamy tomato curry with tender chicken pieces",
    price: 550,
    category: "lunch",
    available: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Paneer Tikka",
    description: "Grilled cottage cheese with spices and vegetables",
    price: 450,
    category: "lunch",
    available: false,
    image: "/placeholder.svg?height=100&width=100",
  },
]

// Sample services data
const services = [
  {
    id: 1,
    name: "Laundry Service",
    description: "Wash and iron clothes",
    price: 500,
    available: true,
  },
  {
    id: 2,
    name: "Spa Treatment",
    description: "Relaxing massage and therapy",
    price: 2500,
    available: true,
  },
  {
    id: 3,
    name: "Airport Transfer",
    description: "Private car to/from airport",
    price: 1200,
    available: true,
  },
]

export default function MenuManagementPage() {
  const { toast } = useToast()
  const [items, setItems] = useState(foodItems)
  const [serviceItems, setServiceItems] = useState(services)
  const [editItem, setEditItem] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false)
  const [editService, setEditService] = useState<any>(null)

  const handleSaveItem = (item: any) => {
    if (editItem) {
      setItems(items.map((i) => (i.id === editItem.id ? item : i)))
      toast({
        title: "Item updated",
        description: `${item.name} has been updated successfully`,
      })
    } else {
      setItems([...items, { ...item, id: items.length + 1 }])
      toast({
        title: "Item added",
        description: `${item.name} has been added to the menu`,
      })
    }
    setIsAddDialogOpen(false)
    setIsEditDialogOpen(false)
    setEditItem(null)
  }

  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
    toast({
      title: "Item deleted",
      description: "The menu item has been deleted",
    })
  }

  const handleToggleAvailability = (id: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, available: !item.available } : item)))
  }

  const handleSaveService = (service: any) => {
    if (editService) {
      setServiceItems(serviceItems.map((s) => (s.id === editService.id ? service : s)))
      toast({
        title: "Service updated",
        description: `${service.name} has been updated successfully`,
      })
    } else {
      setServiceItems([...serviceItems, { ...service, id: serviceItems.length + 1 }])
      toast({
        title: "Service added",
        description: `${service.name} has been added to the services`,
      })
    }
    setIsServiceDialogOpen(false)
    setEditService(null)
  }

  const handleDeleteService = (id: number) => {
    setServiceItems(serviceItems.filter((service) => service.id !== id))
    toast({
      title: "Service deleted",
      description: "The service has been deleted",
    })
  }

  const handleToggleServiceAvailability = (id: number) => {
    setServiceItems(
      serviceItems.map((service) => (service.id === id ? { ...service, available: !service.available } : service)),
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Menu Management</h2>
        <p className="text-muted-foreground">Manage food menu items and additional services</p>
      </div>

      <Tabs defaultValue="food">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="food">Food Menu</TabsTrigger>
          <TabsTrigger value="services">Additional Services</TabsTrigger>
        </TabsList>
        <TabsContent value="food" className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Food Menu Items</h3>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditItem(null)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Menu Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Menu Item</DialogTitle>
                  <DialogDescription>Add a new item to your food menu</DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const newItem = {
                      name: formData.get("name") as string,
                      description: formData.get("description") as string,
                      price: Number.parseInt(formData.get("price") as string),
                      category: formData.get("category") as string,
                      available: true,
                      image: "/placeholder.svg?height=100&width=100",
                    }
                    handleSaveItem(newItem)
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name">Item Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input id="price" name="price" type="number" min="0" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select name="category" defaultValue="breakfast">
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {foodCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Image</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 overflow-hidden rounded-md border">
                        <Image
                          src="/placeholder.svg?height=100&width=100"
                          alt="Food item"
                          width={100}
                          height={100}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <Button type="button" variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </Button>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" />
                      Save Item
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-2 p-4 font-medium">
              <div className="col-span-3">Name</div>
              <div className="col-span-3">Description</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-1 text-right">Price</div>
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            <Separator />
            {items.map((item) => (
              <div key={item.id}>
                <div className="grid grid-cols-12 gap-2 p-4">
                  <div className="col-span-3 flex items-center gap-2">
                    <div className="h-10 w-10 overflow-hidden rounded-md">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="col-span-3 text-sm text-muted-foreground">{item.description}</div>
                  <div className="col-span-2">
                    <Badge variant="outline">{foodCategories.find((c) => c.id === item.category)?.name}</Badge>
                  </div>
                  <div className="col-span-1 text-right">₹{item.price}</div>
                  <div className="col-span-1 flex justify-center">
                    <Switch checked={item.available} onCheckedChange={() => handleToggleAvailability(item.id)} />
                  </div>
                  <div className="col-span-2 flex justify-end gap-2">
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditItem(item)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Menu Item</DialogTitle>
                          <DialogDescription>Make changes to the menu item</DialogDescription>
                        </DialogHeader>
                        {editItem && (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault()
                              const formData = new FormData(e.currentTarget)
                              const updatedItem = {
                                ...editItem,
                                name: formData.get("name") as string,
                                description: formData.get("description") as string,
                                price: Number.parseInt(formData.get("price") as string),
                                category: formData.get("category") as string,
                              }
                              handleSaveItem(updatedItem)
                            }}
                            className="space-y-4"
                          >
                            <div className="space-y-2">
                              <Label htmlFor="edit-name">Item Name</Label>
                              <Input id="edit-name" name="name" defaultValue={editItem.name} required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-description">Description</Label>
                              <Textarea
                                id="edit-description"
                                name="description"
                                defaultValue={editItem.description}
                                required
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-price">Price (₹)</Label>
                                <Input
                                  id="edit-price"
                                  name="price"
                                  type="number"
                                  min="0"
                                  defaultValue={editItem.price}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-category">Category</Label>
                                <Select name="category" defaultValue={editItem.category}>
                                  <SelectTrigger id="edit-category">
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {foodCategories.map((category) => (
                                      <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-image">Image</Label>
                              <div className="flex items-center gap-4">
                                <div className="h-16 w-16 overflow-hidden rounded-md border">
                                  <Image
                                    src={editItem.image || "/placeholder.svg"}
                                    alt="Food item"
                                    width={100}
                                    height={100}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <Button type="button" variant="outline">
                                  <Upload className="mr-2 h-4 w-4" />
                                  Upload Image
                                </Button>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit">
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                              </Button>
                            </DialogFooter>
                          </form>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="services" className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Additional Services</h3>
            <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditService(null)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Service
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Service</DialogTitle>
                  <DialogDescription>Add a new service to your offerings</DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const newService = {
                      name: formData.get("name") as string,
                      description: formData.get("description") as string,
                      price: Number.parseInt(formData.get("price") as string),
                      available: true,
                    }
                    handleSaveService(newService)
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="service-name">Service Name</Label>
                    <Input id="service-name" name="name" defaultValue={editService?.name || ""} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-description">Description</Label>
                    <Textarea
                      id="service-description"
                      name="description"
                      defaultValue={editService?.description || ""}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-price">Price (₹)</Label>
                    <Input
                      id="service-price"
                      name="price"
                      type="number"
                      min="0"
                      defaultValue={editService?.price || ""}
                      required
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" />
                      Save Service
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-2 p-4 font-medium">
              <div className="col-span-4">Name</div>
              <div className="col-span-4">Description</div>
              <div className="col-span-1 text-right">Price</div>
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            <Separator />
            {serviceItems.map((service) => (
              <div key={service.id}>
                <div className="grid grid-cols-12 gap-2 p-4">
                  <div className="col-span-4 font-medium">{service.name}</div>
                  <div className="col-span-4 text-sm text-muted-foreground">{service.description}</div>
                  <div className="col-span-1 text-right">₹{service.price}</div>
                  <div className="col-span-1 flex justify-center">
                    <Switch
                      checked={service.available}
                      onCheckedChange={() => handleToggleServiceAvailability(service.id)}
                    />
                  </div>
                  <div className="col-span-2 flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditService(service)
                        setIsServiceDialogOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteService(service.id)}>
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
