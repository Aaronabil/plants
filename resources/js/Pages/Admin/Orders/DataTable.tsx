"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import { Button } from "@/Components/ui/button"
import { ChevronRight, ChevronsRight, ChevronLeft, ChevronsLeft } from "lucide-react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    links?: any[] // Inertia pagination links
    meta?: any // Inertia pagination meta
}

export function DataTable<TData, TValue>({
    columns,
    data,
    links,
    meta
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount: meta?.last_page || 1,
    })

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination custom for Inertia */}
            {meta && (
                <div className="flex items-center justify-between space-x-2 py-4">
                    <div className="text-sm text-muted-foreground">
                        Showing {meta.from} to {meta.to} of {meta.total} results
                    </div>
                    <div className="flex items-center space-x-2">
                        {meta.links.map((link: any, i: number) => {
                            // Simple previous/next buttons logic or full pagination
                            // For brevity, just mapping needed parts or using simpler logic
                            if (link.label.includes("Previous")) {
                                return (
                                    <Button
                                        key={i}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => link.url && (window.location.href = link.url)}
                                        disabled={!link.url}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                )
                            }
                            if (link.label.includes("Next")) {
                                return (
                                    <Button
                                        key={i}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => link.url && (window.location.href = link.url)}
                                        disabled={!link.url}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                )
                            }
                            return null;
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
