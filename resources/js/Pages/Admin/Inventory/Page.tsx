import AdminLayout from "@/Layouts/AdminLayout"
import { Head, router } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { columns } from './Columns';
import { DataTable } from './DataTable';
import { Category } from '../Category/Columns';
import { Product } from '@/types';

interface PageProps {
    products: {
        data: Product[];
        current_page: number;
        per_page: number;
        total: number;
    };
    categories: Category[];
    totalInventoryValue: number;
    lowStockCount: number;
    outOfStockCount: number;
}

export default function PageInventory({
    products = { data: [], current_page: 1, per_page: 10, total: 0 },
    categories = [],
    totalInventoryValue = 0,
    lowStockCount = 0,
    outOfStockCount = 0,
}: PageProps) {

    return (
        <>
            <AdminLayout>
                <Head title="Inventory Page" />
                <div className="flex items-center">
                    <h1 className="text-lg font-semibold md:text-2xl">
                        Inventory
                    </h1>
                </div>
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 mt-5">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Inventory Value
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                Rp.{totalInventoryValue.toLocaleString('id-ID')}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Product Almost Out of Stock
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {lowStockCount}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Product Out of Stock
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {outOfStockCount}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Stock List</CardTitle>
                        </CardHeader>
                        {/* <CardHeader>
                            <CardTitle>Product</CardTitle>
                            <CardDescription>
                                Manage your product and view their sales performance.
                            </CardDescription>
                        </CardHeader> */}
                        <CardContent>
                            <DataTable
                                columns={columns}
                                data={products.data}
                                serverSide={true}
                                total={products.total}
                                page={products.current_page}
                                perPage={products.per_page}
                                onPageChange={(newPage, newPerPage) => {
                                    router.get(route('admin.inventory'), { page: newPage, per_page: newPerPage }, { preserveState: true, preserveScroll: true })
                                }}
                            />
                        </CardContent>
                    </Card>
                </div>
            </AdminLayout>
        </>
    )
}
