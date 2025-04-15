import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const pendingPayments = [
  {
    id: "BILL-1001",
    guest: "Arjun Mehta",
    room: "105",
    amount: "₹4,500",
    dueDate: "Today",
    status: "Overdue",
  },
  {
    id: "BILL-1002",
    guest: "Neha Gupta",
    room: "210",
    amount: "₹2,300",
    dueDate: "Tomorrow",
    status: "Pending",
  },
  {
    id: "BILL-1003",
    guest: "Sanjay Kumar",
    room: "304",
    amount: "₹1,200",
    dueDate: "Apr 17, 2025",
    status: "Pending",
  },
  {
    id: "BILL-1004",
    guest: "Meera Reddy",
    room: "118",
    amount: "₹3,600",
    dueDate: "Apr 16, 2025",
    status: "Pending",
  },
]

export function PendingPaymentsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Bill ID</TableHead>
          <TableHead>Guest</TableHead>
          <TableHead>Room</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pendingPayments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell className="font-medium">{payment.id}</TableCell>
            <TableCell>{payment.guest}</TableCell>
            <TableCell>{payment.room}</TableCell>
            <TableCell>{payment.amount}</TableCell>
            <TableCell>{payment.dueDate}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  payment.status === "Overdue"
                    ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900"
                    : "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-900"
                }
              >
                {payment.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/billing/${payment.id}`}>Collect</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
