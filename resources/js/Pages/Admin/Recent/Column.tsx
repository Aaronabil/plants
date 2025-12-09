"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/Components/ui/badge"
import { format } from 'date-fns'

export type Payment = {
    id: number
    order_id: string
    invoice_number: string
    amount: number
    payment_method: string
    payment_type: string
    status: string
    transaction_id: string
    paid_at: string | null
    created_at: string
    updated_at: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "order_id",
        header: () => <div className="text-neutral-700 font-semibold">Order ID</div>,
        cell: ({ row }) => <span className="capitalize">{"ORD-00" + row.original.order_id}</span>,
    },
     {
        accessorKey: "invoice_number",
        header: () => <div className="text-neutral-700 font-semibold">Invoice Number</div>,
        cell: ({ row }) => <span className="capitalize">{row.original.invoice_number}</span>,
    },
    {
        accessorKey: "created_at",
        header: () => <div className="text-neutral-700 font-semibold">Date & Time</div>,
        cell: ({ row }) => format(new Date(row.original.created_at), "dd MMM yyyy HH:mm"),
    },
    {
        accessorKey: "payment_method",
        header: () => <div className="text-neutral-700 font-semibold">Payment Method</div>,
        cell: ({ row }) => <span className="capitalize">{row.original.payment_method}</span>,
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-neutral-700 font-semibold">Total Nominal</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(amount)
            return formatted
        },
    },
    {
        accessorKey: "status",
        header: () => <div className="text-neutral-700 font-semibold">Status</div>,
        cell: ({ row }) => {
            const status = row.original.status
            let variant: "default" | "secondary" | "destructive" | "outline" = "default"
            let className = ""

            switch (status) {
                case 'paid':
                case 'settlement':
                case 'capture':
                    variant = "default"
                    className = "bg-green-100 text-green-700 hover:bg-green-100/80"
                    break;
                case 'pending':
                    variant = "secondary"
                    className = "bg-yellow-100 text-yellow-700 hover:bg-yellow-100/80"
                    break;
                case 'expire':
                case 'cancel':
                case 'deny':
                    variant = "destructive"
                    break;
                default:
                    variant = "outline"
            }

            return <Badge variant={variant} className={className}>{status}</Badge>
        },
    },
]
