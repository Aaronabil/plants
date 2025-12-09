import { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";

interface CustomerDeetailsFormProps {
    user: User;
    onSuccess: () => void;
}

export default function CustomerDetailsForm({ user, onSuccess }: CustomerDeetailsFormProps) {
    // Get orders from user relation
    const orders = user.orders || [];

    // Get unique addresses from orders
    const uniqueAddresses = Array.from(
        new Set(
            orders
                .map(o => o.shipping_address)
                .filter((addr): addr is string => !!addr)
        )
    );

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone || '-'}</p>
                </CardContent>
            </Card>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Address List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Address</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {uniqueAddresses.length > 0 ? (
                                uniqueAddresses.map((address, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{address}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={1} className="text-center">No addresses found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.length > 0 ? (
                                orders.map((order) => {
                                    
                                    return (
                                        <TableRow key={order.id}>
                                            <TableCell>{order.invoice}</TableCell>
                                            <TableCell>{new Date(order.created_at).toLocaleDateString("id-ID")}</TableCell>
                                            <TableCell>{order.payment_status}</TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">No orders found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
