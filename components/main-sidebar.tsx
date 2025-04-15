"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "@/components/sidebar-provider"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  BedDouble,
  Calendar,
  ChevronLeft,
  CreditCard,
  FileText,
  Home,
  Menu,
  Settings,
  ShoppingBag,
  Users,
  Utensils,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"

interface SidebarLinkProps {
  href: string
  icon: React.ElementType
  label: string
  isActive?: boolean
}

function SidebarLink({ href, icon: Icon, label, isActive }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  )
}

export function MainSidebar() {
  const pathname = usePathname()
  const { isOpen, toggle, isMobile } = useSidebar()

  // Don't render sidebar on login page
  if (pathname === "/login") {
    return null
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button variant="outline" size="icon" className="fixed left-4 top-4 z-50 md:hidden" onClick={toggle}>
        <Menu className="h-4 w-4" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Sidebar Backdrop */}
      {isMobile && isOpen && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={toggle} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-card transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <BedDouble className="h-5 w-5 text-primary" />
            <span>Bamera-BMS</span>
          </Link>
          <Button variant="ghost" size="icon" className="ml-auto md:hidden" onClick={toggle}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Close Sidebar</span>
          </Button>
        </div>
        <ScrollArea className="flex-1 px-2 py-4">
          <div className="space-y-1">
            <SidebarLink href="/dashboard" icon={Home} label="Dashboard" isActive={pathname === "/dashboard"} />
            <SidebarLink
              href="/guests"
              icon={Users}
              label="Guest Management"
              isActive={pathname.startsWith("/guests")}
            />
            <SidebarLink
              href="/rooms"
              icon={BedDouble}
              label="Room Management"
              isActive={pathname.startsWith("/rooms")}
            />
            <SidebarLink href="/billing" icon={CreditCard} label="Billing" isActive={pathname.startsWith("/billing")} />
            <SidebarLink
              href="/food-service"
              icon={Utensils}
              label="Food & Services"
              isActive={pathname.startsWith("/food-service")}
            />
            <SidebarLink
              href="/menu-management"
              icon={ShoppingBag}
              label="Menu Management"
              isActive={pathname.startsWith("/menu-management")}
            />
            <SidebarLink
              href="/bookings"
              icon={Calendar}
              label="Bookings"
              isActive={pathname.startsWith("/bookings")}
            />
            <SidebarLink href="/reports" icon={BarChart3} label="Reports" isActive={pathname.startsWith("/reports")} />
            <SidebarLink href="/audit" icon={FileText} label="Audit Logs" isActive={pathname.startsWith("/audit")} />
            <SidebarLink
              href="/settings"
              icon={Settings}
              label="Settings"
              isActive={pathname.startsWith("/settings")}
            />
          </div>
        </ScrollArea>
        <div className="flex items-center justify-between border-t p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-sm">
                  <span className="font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">Admin</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/login" className="flex w-full">
                  Log out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </div>
    </>
  )
}
