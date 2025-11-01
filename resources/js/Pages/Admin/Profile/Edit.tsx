import AdminLayout from '@/Layouts/AdminLayout'; 
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function EditAdminProfile({ status }: PageProps<{ status?: string }>) {
    const admin = usePage().props.auth.user; 

    return (
        <AdminLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Profile</h2>}
        >
            <Head title="Admin Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Update your account's profile information and email address.
                                </p>
                            </header>
                            <div className="mt-6 space-y-4">
                                <div>
                                    <label className="block font-medium text-sm text-gray-700">Name</label>
                                    <p>{admin.name}</p>
                                </div>
                                <div>
                                    <label className="block font-medium text-sm text-gray-700">Email</label>
                                    <p>{admin.email}</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}