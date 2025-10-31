import AdminLayout from "@/Layouts/AdminLayout"
import { Head } from "@inertiajs/react"

export default function PageProduct() {
    return (
        <>
            <AdminLayout>
                <Head title="Product Page" />
                <div className="flex items-center">
                    <h1 className="text-lg font-semibold md:text-2xl">Product</h1>
                </div>
            </AdminLayout>
        </>
    )
}
