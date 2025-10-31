import AdminLayout from "@/Layouts/AdminLayout"
import { Head } from "@inertiajs/react"

export default function PageInventory() {
    return (
        <>
            <AdminLayout>
                <Head title="Inventory Page" />
                <div className="flex items-center">
                    <h1 className="text-lg font-semibold md:text-2xl">Inventroy</h1>
                </div>
            </AdminLayout>
        </>
    )
}
