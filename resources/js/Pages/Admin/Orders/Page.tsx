import AdminLayout from "@/Layouts/AdminLayout"
import { Head } from "@inertiajs/react"

export default function PageOrders() {
    return (
        <>
            <AdminLayout>
                <Head title="Orders Page" />
                <div className="flex items-center">
                    <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
                </div>
            </AdminLayout>
        </>
    )
}
