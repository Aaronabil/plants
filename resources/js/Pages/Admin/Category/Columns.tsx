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

export type Category = {
    id: number
    parent_id: number | null
    category_name: string
    slug: string
    description: string
    image_url: string
    created_at: string
    parent?: {
        id: number
        category_name: string
    }
}

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "image_url",
        header: () => {
            return <div className="text-neutral-700 font-semibold">Image</div>
        },
        cell: ({ row }) => {
            const imageUrl = row.getValue("image_url") as string;
            return <img src={`${imageUrl}`} alt={row.getValue("category_name")} className="w-11 h-11 aspect-square rounded-sm" />
        }
    },
    {
        accessorKey: "parent.category_name",
        header: () => {
            return <div className="text-neutral-700 font-semibold w-[150px]">Parent Category</div>
        },
        cell: ({ row }) => {
            const parent = row.original.parent;
            return parent ? parent.category_name : 'N/A';
        },
    },
    {
        accessorKey: "category_name",
        header: () => {
            return <div className="text-neutral-700 font-semibold">Name</div>
        },
    },
    {
        accessorKey: "slug",
        header: () => {
            return <div className="text-neutral-700 font-semibold">Slug</div>
        },
    },
    {
        accessorKey: "description",
        header: () => {
            return <div className="text-neutral-700 font-semibold">Description</div>
        },
        cell: ({ row }) => {
            const description = row.getValue("description") as string;
            if (!description) return "N/A";
            const words = description.split(" ");
            if (words.length <= 20) {
                return description;
            }
            return words.slice(0, 20).join(" ") + "...";
        }
    },
    {
        accessorKey: "created_at",
        header: () => {
            return <div className="text-neutral-700 font-semibold w-[100px]">Created at</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const category = row.original

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
