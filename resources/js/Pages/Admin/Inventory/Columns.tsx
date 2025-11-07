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
import { Product } from "@/types"
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

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "product_name",
        header: () => <div className="text-neutral-700 font-semibold w-[150px]">Product Name</div>,
    },
    {
        accessorKey: "category.category_name",
        header: () => <div className="text-neutral-700 font-semibold w-[150px]">Category</div>,
        cell: ({ row }) => {
            const category = row.original.category;
            return category?.category_name || 'N/A';
        },
    },
    {
        accessorKey: "stock",
        header: () => <div className="text-neutral-700 font-semibold w-[100px]">Stock</div>,
        // cell: ({ row }) => {
        //     const stock = parseInt(row.getValue("stock"));
        //     return (
        //         <Badge variant={stock > 0 ? "default" : "destructive"}>
        //             {stock > 0 ? `${stock} units` : 'Out of stock'}
        //         </Badge>
        //     );
        // },
    },
    {
        id: "status",
        header: () => <div className="text-neutral-700 font-semibold w-[100px]">Status</div>,
        cell: ({ row }) => {
            const stock = row.original.stock; // stock is already a number
            let statusText = "";
            let variant: "default" | "secondary" | "destructive" | "outline" = "default";

            if (stock === 0) {
                statusText = "Out of Stock";
                variant = "destructive";
            } else if (stock <= 10) {
                statusText = "Low Stock";
                variant = "outline";
            } else {
                statusText = "In Stock";
                variant = "default";
            }

            return (
                <Badge variant={variant} className="rounded-full items-center">
                    ● {statusText}
                </Badge>
            );
        },
    },
    {
        accessorKey: "price",
        header: () => <div className="text-neutral-700 font-semibold w-[150px]">Price</div>,
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"));
            return `Rp${price.toLocaleString('id-ID')}`;
        },
    },
    // {
    //     id: "actions",
    //     cell: ({ row }) => {
    //         const product = row.original

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <MoreHorizontal className="h-4 w-4" />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                     <DropdownMenuItem>
    //                         Edit
    //                     </DropdownMenuItem>
    //                     <DropdownMenuItem className="text-red-600">
    //                         Delete
    //                     </DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         )
    //     },
    // },
]
