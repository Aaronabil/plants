import AdminLayout from "@/Layouts/AdminLayout"
import { Head } from "@inertiajs/react"

export default function PageRecent() {
    return (
        <>
            <AdminLayout>
                <Head title="Recent Transaction Page" />
                <div className="flex items-center">
                    <h1 className="text-lg font-semibold md:text-2xl">Recent Transaction</h1>
                </div>
            </AdminLayout>
        </>
    )
}
