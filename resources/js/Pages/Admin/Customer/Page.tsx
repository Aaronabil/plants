import AdminLayout from "@/Layouts/AdminLayout"
import { Head } from "@inertiajs/react"

export default function PageCustomer() {
    return (
        <>
            <AdminLayout>
                <Head title="Customer Page" />
                <div className="flex items-center">
                    <h1 className="text-lg font-semibold md:text-2xl">Customer</h1>
                </div>
            </AdminLayout>
        </>
    )
}
