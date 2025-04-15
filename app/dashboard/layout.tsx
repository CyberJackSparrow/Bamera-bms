import type React from "react"
import { MainSidebar } from "@/components/main-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <MainSidebar />
      <div className="flex-1 md:ml-64">
        <main className="container mx-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
