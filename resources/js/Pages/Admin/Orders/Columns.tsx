"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { ArrowUpDown, MoreHorizontal, Eye } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Link } from "@inertiajs/react"

export type Order = {
    id: number
    invoice: string
    created_at: string
    total_amount: number
    payment_status: 'AWAITING_PAYMENT' | 'PAID' | 'FAILED' | 'CANCELLED' | 'EXPIRED'
    delivery_status: 'PROCESSING' | 'SHIPPING' | 'DELIVERED' | 'COMPLETED'
    user: {
        name: string
        email: string
    }
}

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "invoice",
        header: "ID Order",
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Tanggal
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("created_at"))
            return <div>{date.toLocaleDateString("id-ID")}</div>
        },
    },
    {
        accessorKey: "user.name",
        header: "Customer Name",
    },
    {
        accessorKey: "total_amount",
        header: "Total",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("total_amount"))
            const formatted = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0
            }).format(amount)
            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
            const paymentStatus = row.original.payment_status
            const deliveryStatus = row.original.delivery_status

            let statusText: string = paymentStatus

            if (paymentStatus === 'AWAITING_PAYMENT') {
                statusText = "Pending Payment"
            } else if (paymentStatus === 'PAID') {
                if (deliveryStatus === 'PROCESSING') {
                    statusText = "Processing"
                } else if (deliveryStatus === 'SHIPPING') {
                    statusText = "Shipping"
                } else if (deliveryStatus === 'COMPLETED' || deliveryStatus === 'DELIVERED') {
                    statusText = "Completed"
                } else {
                    statusText = "Paid"
                }
            } else if (paymentStatus === 'CANCELLED') {
                statusText = "Cancelled"
            } else if (paymentStatus === 'EXPIRED') {
                statusText = "Expired"
            } else if (paymentStatus === 'FAILED') {
                statusText = "Failed"
            }

            // Using default badge variants for now
            const colorMap: Record<string, string> = {
                "Pending Payment": "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
                "Processing": "bg-blue-100 text-blue-800 hover:bg-blue-100",
                "Shipping": "bg-purple-100 text-purple-800 hover:bg-purple-100",
                "Completed": "bg-green-100 text-green-800 hover:bg-green-100",
                "Paid": "bg-green-100 text-green-800 hover:bg-green-100",
                "Cancelled": "bg-red-100 text-red-800 hover:bg-red-100",
                "Expired": "bg-gray-100 text-gray-800 hover:bg-gray-100",
                "Failed": "bg-red-100 text-red-800 hover:bg-red-100"
            }

            return (
                <Badge
                    variant="outline"
                    className={`border-0 ${colorMap[statusText] || "bg-gray-100 text-gray-800"}`}
                >
                    {statusText}
                </Badge>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const order = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Action</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(order.invoice)}
                        >
                            Copy Order ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={route('admin.orders.show', order.id)}>
                                <Eye className="mr-2 h-4 w-4" />
                                See The Detail
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
