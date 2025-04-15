"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Check, Coffee, MinusCircle, PlusCircle, Search, ShoppingCart, Utensils } from "lucide-react"
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
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Masala Dosa",
    description: "South Indian crepe with potato filling and chutneys",
    price: 250,
    category: "breakfast",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Butter Chicken",
    description: "Creamy tomato curry with tender chicken pieces",
    price: 550,
    category: "lunch",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Paneer Tikka",
    description: "Grilled cottage cheese with spices and vegetables",
    price: 450,
    category: "lunch",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Biryani",
    description: "Fragrant rice dish with spices and meat or vegetables",
    price: 650,
    category: "dinner",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "Masala Chai",
    description: "Spiced Indian tea with milk",
    price: 120,
    category: "beverages",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 7,
    name: "Gulab Jamun",
    description: "Sweet milk solids balls soaked in sugar syrup",
    price: 180,
    category: "desserts",
    image: "/placeholder.svg?height=100&width=100",
  },
]

// Sample services data
const services = [
  {
    id: "laundry",
    name: "Laundry Service",
    description: "Wash and iron clothes",
    price: 500,
    icon: "shirt",
  },
  {
    id: "spa",
    name: "Spa Treatment",
    description: "Relaxing massage and therapy",
    price: 2500,
    icon: "spa",
  },
  {
    id: "transport",
    name: "Airport Transfer",
    description: "Private car to/from airport",
    price: 1200,
    icon: "car",
  },
  {
    id: "gym",
    name: "Gym Access",
    description: "Full day access to fitness center",
    price: 300,
    icon: "dumbbell",
  },
]

// Sample rooms data
const rooms = [
  { id: 101, guest: "Rahul Verma" },
  { id: 102, guest: "Priya Sharma" },
  { id: 103, guest: "Vikram Singh" },
  { id: 104, guest: "Ananya Patel" },
  { id: 105, guest: "Arjun Mehta" },
]

export default function FoodServicePage() {
  const { toast } = useToast()
  const [activeCategory, setActiveCategory] = useState("breakfast")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null)
  const [cart, setCart] = useState<Array<{ id: number; name: string; price: number; quantity: number }>>([])

  const filteredItems = foodItems.filter(
    (item) =>
      (activeCategory === "all" || item.category === activeCategory) &&
      (searchQuery === "" || item.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const addToCart = (item: { id: number; name: string; price: number }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === itemId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem,
        )
      } else {
        return prevCart.filter((cartItem) => cartItem.id !== itemId)
      }
    })
  }

  const placeOrder = () => {
    if (!selectedRoom) {
      toast({
        title: "Room not selected",
        description: "Please select a room to place the order",
        variant: "destructive",
      })
      return
    }

    if (cart.length === 0) {
      toast({
        title: "Empty cart",
        description: "Please add items to your cart",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Order placed successfully",
      description: `Order placed for Room ${selectedRoom}`,
    })

    setCart([])
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Food & Services</h2>
        <p className="text-muted-foreground">Order food and additional services for guests</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="md:w-3/4">
          <Tabs defaultValue="food">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="food">
                <Utensils className="mr-2 h-4 w-4" />
                Food Menu
              </TabsTrigger>
              <TabsTrigger value="services">
                <Coffee className="mr-2 h-4 w-4" />
                Additional Services
              </TabsTrigger>
            </TabsList>
            <TabsContent value="food" className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search menu items..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex overflow-x-auto pb-2">
                <div className="flex gap-2">
                  <Button
                    variant={activeCategory === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory("all")}
                  >
                    All
                  </Button>
                  {foodCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-0">
                      <div className="flex items-center gap-4 p-4">
                        <div className="h-16 w-16 overflow-hidden rounded-md">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                          <p className="mt-1 font-medium">₹{item.price}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-2">
                      <Button variant="outline" className="w-full" onClick={() => addToCart(item)}>
                        Add to Order
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="services" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <Card key={service.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <Coffee className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="font-medium">₹{service.price}</p>
                        <Button
                          variant="outline"
                          onClick={() =>
                            addToCart({
                              id: Number.parseInt(service.id),
                              name: service.name,
                              price: service.price,
                            })
                          }
                        >
                          Add to Order
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:w-1/4">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Current Order
              </CardTitle>
              <CardDescription>Select a room and add items to order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="room">Select Room</Label>
                <div className="grid grid-cols-3 gap-2">
                  {rooms.map((room) => (
                    <Button
                      key={room.id}
                      variant={selectedRoom === room.id ? "default" : "outline"}
                      className="h-auto py-1 text-xs"
                      onClick={() => setSelectedRoom(room.id)}
                    >
                      {room.id}
                    </Button>
                  ))}
                </div>
                {selectedRoom && (
                  <p className="text-sm text-muted-foreground">
                    Guest: {rooms.find((r) => r.id === selectedRoom)?.guest}
                  </p>
                )}
              </div>

              <Separator />

              {cart.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  <ShoppingCart className="mx-auto h-8 w-8 opacity-50" />
                  <p className="mt-2">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              addToCart({
                                id: item.id,
                                name: item.name,
                                price: item.price,
                              })
                            }
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p>₹{item.price * item.quantity}</p>
                    </div>
                  ))}

                  <Separator />

                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{cart.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={placeOrder} disabled={cart.length === 0 || !selectedRoom}>
                <Check className="mr-2 h-4 w-4" />
                Place Order
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
