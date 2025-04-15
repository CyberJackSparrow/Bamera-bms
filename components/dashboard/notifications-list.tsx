import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { BedDouble, CreditCard, Receipt, UserCheck } from "lucide-react"

const notifications = [
  {
    id: 1,
    title: "Room 203 checkout today",
    description: "Guest John Smith is scheduled to check out at 12:00 PM",
    time: "2 hours ago",
    icon: BedDouble,
    type: "checkout",
  },
  {
    id: 2,
    title: "Payment overdue",
    description: "Room 105 has an overdue payment of ₹4,500",
    time: "3 hours ago",
    icon: CreditCard,
    type: "payment",
  },
  {
    id: 3,
    title: "New check-in",
    description: "Priya Sharma checked in to Room 302",
    time: "5 hours ago",
    icon: UserCheck,
    type: "checkin",
  },
  {
    id: 4,
    title: "Bill generated",
    description: "Bill #1234 generated for Room 401",
    time: "6 hours ago",
    icon: Receipt,
    type: "bill",
  },
]

export function NotificationsList() {
  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="flex items-start gap-4 rounded-lg border p-3 transition-colors hover:bg-accent"
        >
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full",
              notification.type === "checkout"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                : notification.type === "payment"
                  ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                  : notification.type === "checkin"
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
            )}
          >
            <notification.icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{notification.title}</h4>
              <Badge
                variant="outline"
                className={cn(
                  notification.type === "checkout"
                    ? "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-400"
                    : notification.type === "payment"
                      ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400"
                      : notification.type === "checkin"
                        ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400"
                        : "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400",
                )}
              >
                {notification.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{notification.description}</p>
            <p className="mt-1 text-xs text-muted-foreground">{notification.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
