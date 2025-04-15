import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import Link from "next/link"

const recentCheckins = [
  {
    id: "CHK-1001",
    name: "Priya Sharma",
    room: "302",
    checkIn: "Today, 10:30 AM",
    checkOut: "Apr 18, 2025",
    status: "Active",
  },
  {
    id: "CHK-1002",
    name: "Rahul Verma",
    room: "205",
    checkIn: "Today, 11:45 AM",
    checkOut: "Apr 20, 2025",
    status: "Active",
  },
  {
    id: "CHK-1003",
    name: "Ananya Patel",
    room: "401",
    checkIn: "Today, 2:15 PM",
    checkOut: "Apr 17, 2025",
    status: "Active",
  },
  {
    id: "CHK-1004",
    name: "Vikram Singh",
    room: "103",
    checkIn: "Today, 3:30 PM",
    checkOut: "Apr 19, 2025",
    status: "Active",
  },
]

export function RecentCheckinsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Guest Name</TableHead>
          <TableHead>Room</TableHead>
          <TableHead>Check-in</TableHead>
          <TableHead>Check-out</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentCheckins.map((checkin) => (
          <TableRow key={checkin.id}>
            <TableCell className="font-medium">{checkin.id}</TableCell>
            <TableCell>{checkin.name}</TableCell>
            <TableCell>{checkin.room}</TableCell>
            <TableCell>{checkin.checkIn}</TableCell>
            <TableCell>{checkin.checkOut}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900"
              >
                {checkin.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/guests/${checkin.id}`}>
                  <FileText className="h-4 w-4" />
                  <span className="sr-only">View details</span>
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
