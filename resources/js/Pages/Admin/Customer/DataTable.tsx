"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel, // Import getFilteredRowModel
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import { ChevronRight, ChevronsRight, ChevronLeft, ChevronsLeft } from "lucide-react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    // server-side pagination props (optional)
    serverSide?: boolean
    total?: number
    page?: number // 1-based
    perPage?: number
    onPageChange?: (page: number, perPage: number) => void
    globalFilter?: string // Menambahkan prop globalFilter
}

export function DataTable<TData, TValue>({
    columns,
    data,
    serverSide = false,
    total = 0,
    page = 1,
    perPage = 10,
    onPageChange,
    globalFilter, // Menerima globalFilter
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(), // Mengaktifkan filtering global
        state: {
            globalFilter, // Meneruskan globalFilter ke TanStack Table
        },
        manualPagination: serverSide, // Pagination manual hanya jika serverSide true
        // server-side: do NOT use getPaginationRowModel (we handle pages on server)
    })

    const pageCount = serverSide ? Math.max(1, Math.ceil(total / perPage)) : table.getPageCount()
    const currentPage = serverSide ? page : (table.getState().pagination.pageIndex + 1)

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
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

            {/* Pagination controls */}
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select value={`${perPage}`} onValueChange={(value) => onPageChange?.(1, Number(value))}>
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={`${perPage}`} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>{pageSize}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {currentPage} of {pageCount}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => onPageChange?.(1, perPage)} disabled={currentPage <= 1}>
                            <ChevronsLeft />
                        </Button>
                        <Button variant="outline" className="h-8 w-8 p-0" onClick={() => onPageChange?.(Math.max(1, currentPage - 1), perPage)} disabled={currentPage <= 1}>
                            <ChevronLeft />
                        </Button>
                        <Button variant="outline" className="h-8 w-8 p-0" onClick={() => onPageChange?.(Math.min(pageCount, currentPage + 1), perPage)} disabled={currentPage >= pageCount}>
                            <ChevronRight />
                        </Button>
                        <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => onPageChange?.(pageCount, perPage)} disabled={currentPage >= pageCount}>
                            <ChevronsRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
