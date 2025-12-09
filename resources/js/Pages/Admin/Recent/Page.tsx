import AdminLayout from "@/Layouts/AdminLayout"
import { Head, router } from "@inertiajs/react"
import { columns, Payment } from "./Column"
import { DataTable } from "./DataTable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { useState, useEffect } from "react"

interface PageProps {
    payments: {
        data: Payment[];
        current_page: number;
        per_page: number;
        total: number;
    };
}

export default function PageRecent({ payments }: PageProps) {
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query !== search) {
                router.get(
                    route('admin.recent'),
                    { search: query },
                    { preserveState: true, preserveScroll: true, replace: true }
                );
                setSearch(query);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <AdminLayout>
            <Head title="Recent Transactions" />
            <div className="flex items-center mb-6">
                <h1 className="text-lg font-semibold md:text-2xl">Recent Transactions</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                        View all payment transactions and their status.
                    </CardDescription>
                    <div className="pt-4">
                        <Input
                            type="search"
                            placeholder="Search by Order ID, Transaction ID..."
                            className="w-full appearance-none bg-background shadow-none md:w-1/3"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={payments.data}
                        serverSide={true}
                        total={payments.total}
                        page={payments.current_page}
                        perPage={payments.per_page}
                        globalFilter={query}
                        onPageChange={(newPage, newPerPage) => {
                            router.get(
                                route('admin.recent'),
                                {
                                    page: newPage,
                                    per_page: newPerPage,
                                    search: query
                                },
                                {
                                    preserveState: true,
                                    preserveScroll: true
                                }
                            );
                        }}
                    />
                </CardContent>
            </Card>
        </AdminLayout>
    )
}
