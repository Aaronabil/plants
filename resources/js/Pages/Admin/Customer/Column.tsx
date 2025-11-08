"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { User } from "@/types"
import { format } from 'date-fns'

// export type Product = {
//     id: number
//     category_id: number
//     product_name: string
//     description: string
//     price: number
//     stock: number
//     weight_in_kilograms: number
//     slug: string
//     detail_description: string
//     created_at: string
//     category: {
//         id: number
//         category_name: string
//         parent?: {
//             category_name: string
//         }
//     }
//     primaryImage?: {
//         image_url: string
//     }
// }

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: () => <div className="text-neutral-700 font-semibold">Customer Name</div>,
    },
    {
        accessorKey: "email",
        header: () => <div className="text-neutral-700 font-semibold w-[150px]">Email</div>,
    },
    {
        accessorKey: "phone",
        header: () => <div className="text-neutral-700 font-semibold w-[150px]">Phone</div>,
        cell: ({ row }) => {
            const phone = row.getValue("phone") as number;
            if (!phone) return "-";
        },
    },
    {
        accessorKey: "created_at",
        header: () => <div className="text-neutral-700 font-semibold w-[100px]">Created at</div>,
        cell: ({ row }) => format(new Date(row.original.created_at), "dd MMM yyyy HH:mm"),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            className="text-green-700"
                        >
                            Customer Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-600"
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]