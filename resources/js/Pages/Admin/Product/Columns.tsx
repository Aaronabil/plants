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
        accessorKey: "primary_image",
        header: () => <div className="text-neutral-700 font-semibold">Image</div>,
        cell: ({ row }) => {
            const image = row.original.primary_image;
            return (
                <img
                    src={image?.image_url}
                    alt={row.original.product_name}
                    className="w-11 h-11 object-cover rounded-sm"
                />
            )
        }
    },
    {
        accessorKey: "category.parent.category_name",
        header: () => <div className="text-neutral-700 font-semibold w-[150px]">Category</div>,
        cell: ({ row }) => {
            const category = row.original.category;
            const parentName = category?.parent?.category_name;
            return `${parentName ? `${parentName} - ` : ''}${category?.category_name || 'N/A'}`;
        },
    },
    {
        accessorKey: "product_name",
        header: () => <div className="text-neutral-700 font-semibold w-[150px]">Name</div>,
    },
    {
        accessorKey: "slug",
        header: () => {
            return <div className="text-neutral-700 font-semibold">Slug</div>
        },
    },
    {
        accessorKey: "detail_description",
        header: () => {
            return <div className="text-neutral-700 font-semibold">Deskripsi Product</div>
        },
        cell: ({ row }) => {
            const description = row.getValue("detail_description") as string;
            if (!description) return "N/A";
            const words = description.split(" ");
            if (words.length <= 5) {
                return description;
            }
            return words.slice(0, 5).join(" ") + "...";
        }
    },
    {
        accessorKey: "description",
        header: () => {
            return <div className="text-neutral-700 font-semibold">Full Description</div>
        },
        cell: ({ row }) => {
            const description = row.getValue("description") as string;
            if (!description) return "N/A";
            const words = description.split(" ");
            if (words.length <= 5) {
                return description;
            }
            return words.slice(0, 5).join(" ") + "...";
        }
    },
    {
        accessorKey: "stock",
        header: () => <div className="text-neutral-700 font-semibold w-[100px]">Stock</div>,
        cell: ({ row }) => {
            const stock = parseInt(row.getValue("stock"));
            return (
                <Badge variant={stock > 0 ? "default" : "destructive"}>
                    {stock > 0 ? `${stock} units` : 'Out of stock'}
                </Badge>
            );
        },
    },
    {
        accessorKey: "price",
        header: () => <div className="text-neutral-700 font-semibold w-[100px]">Price</div>,
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"));
            return `Rp${price.toLocaleString('id-ID')}`;
        },
    },
    {
        accessorKey: "weight_in_kilograms",
        header: () => <div className="text-neutral-700 font-semibold w-[50px]">Weight</div>,
        cell: ({ row }) => {
            const weight = parseFloat(row.getValue("weight_in_kilograms"));
            return `${weight} kg`;
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
            const product = row.original

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
                        <DropdownMenuItem>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]