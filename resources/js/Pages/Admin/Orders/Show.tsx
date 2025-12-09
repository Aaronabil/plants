import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react'; // Added router
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { ArrowLeft, CheckCircle, Truck, Package, XCircle, CreditCard } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useState } from 'react';

export default function Show({ order }: { order: any }) {

    // Status Logic Helpers
    const isPaid = order.payment_status === 'PAID';
    const isProcessing = order.delivery_status === 'PROCESSING';
    const isShipping = order.delivery_status === 'SHIPPING';
    const isCompleted = order.delivery_status === 'COMPLETED';
    const isCancelled = order.payment_status === 'CANCELLED';

    const [resi, setResi] = useState('');

    const updateStatus = (action: string) => {
        router.visit(route('admin.orders.update-status', order.id), {
            method: 'patch',
            data: { action, resi: action === 'process_order' ? resi : null },
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <Head title={`Order ${order.invoice}`} />
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={() => window.history.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-3xl font-bold tracking-tight">Order Details: {order.invoice}</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Left Column: Order Details & Items (Span 4) */}
                    <div className="col-span-4 space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Product List</CardTitle>
                                <CardDescription>Items purchased in this order.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product</TableHead>
                                            <TableHead className="text-right">Price</TableHead>
                                            <TableHead className="text-right">Qty</TableHead>
                                            <TableHead className="text-right">Subtotal</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {order.items.map((item: any) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.product?.product_name || 'Produk dihapus'}</TableCell>
                                                <TableCell className="text-right">
                                                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(item.price_at_purchase)}
                                                </TableCell>
                                                <TableCell className="text-right">{item.quantity}</TableCell>
                                                <TableCell className="text-right">
                                                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(item.price_at_purchase * item.quantity)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Separator className="my-4" />
                                <div className="space-y-1.5 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(order.total_amount - order.shipping_fee)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(order.shipping_fee)}</span>
                                    </div>
                                    <div className="flex justify-between font-medium text-base">
                                        <span>Total</span>
                                        <span>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(order.total_amount)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Customer Info & Actions (Span 3) */}
                    <div className="col-span-3 space-y-4">
                        {/* Customer Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-1">
                                    <div className="font-medium">{order.user.name}</div>
                                    <div className="text-sm text-muted-foreground">{order.user.email}</div>
                                </div>
                                <Separator />
                                <div className="grid gap-1">
                                    <div className="font-medium">Shipping Address</div>
                                    <div className="text-sm text-muted-foreground whitespace-pre-wrap">{order.shipping_address}</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Workflow Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Workflow Status</CardTitle>
                                <CardDescription>Status right now: <Badge>{order.payment_status} / {order.delivery_status}</Badge></CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">

                                {/* 1. Payment Confirmation */}
                                {order.payment_status === 'AWAITING_PAYMENT' && (
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">Awaiting payment. If already transfer manually, click confirm.</p>
                                        <Button className="w-full" onClick={() => updateStatus('accept_payment')}>
                                            <CreditCard className="mr-2 h-4 w-4" /> Accept Payment
                                        </Button>
                                    </div>
                                )}

                                {/* 2. Process Order (Already Paid) */}
                                {isPaid && isProcessing && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="resi">Resi Number (Optional)</Label>
                                            <Input
                                                id="resi"
                                                placeholder="Enter resi number..."
                                                value={resi}
                                                onChange={(e) => setResi(e.target.value)}
                                            />
                                        </div>
                                        <Button className="w-full" onClick={() => updateStatus('process_order')}>
                                            <Package className="mr-2 h-4 w-4" /> Process Order & Print Label
                                        </Button>
                                    </div>
                                )}

                                {/* 3. Shipping -> Complete */}
                                {isShipping && (
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">Order is being shipped. Mark as complete if the item has arrived.</p>
                                        <Button className="w-full" variant="outline" onClick={() => updateStatus('complete_order')}>
                                            <CheckCircle className="mr-2 h-4 w-4" /> Mark as Complete
                                        </Button>
                                    </div>
                                )}

                                {/* Completed or Cancelled */}
                                {(isCompleted || isCancelled) && (
                                    <div className="flex items-center justify-center p-4 text-muted-foreground bg-muted/50 rounded-lg">
                                        {isCompleted ? 'Order Completed' : 'Order Cancelled'}
                                    </div>
                                )}

                            </CardContent>
                        </Card>

                        {/* Status History (Static/Mock for now) */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Status History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 text-sm">
                                        <div className="grid gap-1">
                                            <div className="font-medium">Order Created</div>
                                            <div className="text-muted-foreground">{new Date(order.created_at).toLocaleString('id-ID')}</div>
                                        </div>
                                    </div>
                                    {/* Placeholder for future history log logic */}
                                    <div className="flex items-start gap-4 text-sm">
                                        <div className="grid gap-1">
                                            <div className="font-medium">Last Update</div>
                                            <div className="text-muted-foreground">{new Date(order.updated_at).toLocaleString('id-ID')}</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
