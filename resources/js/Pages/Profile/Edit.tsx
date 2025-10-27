import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import DeleteUserForm from './Partials/DeleteUserForm'
import UpdatePasswordForm from './Partials/UpdatePasswordForm'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm'
import { useState } from 'react'
import { CheckCircle, Circle, Edit as EditIcon } from 'lucide-react'
import ProfileDetails from './ProfileDetail'
import TransactionHistory from './TransactionHistory'

export default function Edit({
  auth,
  mustVerifyEmail,
  status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
  const [currentStep, setCurrentStep] = useState(2)
  const steps = [
    'Waiting Payment',
    'Packed',
    'Shipping',
    'In Transit',
    'Delivered',
  ]

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Profile
        </h2>
      }
    >
      <Head title="Profile" />

      <div className="py-10 bg-gray-50 min-h-screen">
        <div className="mx-auto max-w-7xl space-y-8 sm:px-6 lg:px-8">
          {/* ====== HEADER PROFILE ====== */}
          <div className="bg-white p-6 rounded-xl shadow flex flex-col sm:flex-row items-center sm:items-start gap-6 relative">
            <div className="relative">
              <img
                src={'/default-avatar.png'}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border"
              />
              <button className="absolute bottom-0 right-0 bg-gray-200 hover:bg-gray-300 rounded-full p-1">
                <EditIcon className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            <div>
              <h2 className="text-xl font-semibold">{auth.user.name}</h2>
              <p className="text-gray-500">{auth.user.email}</p>
              <p className="text-sm text-gray-400 mt-1">Member sejak 2023</p>
            </div>
          </div>


            <div className="grid md:grid-cols-2 gap-8">
                <ProfileDetails auth={auth} />
                <TransactionHistory />
            </div>
            </div>
          </div>

          <div className="bg-white p-6 shadow rounded-xl">
            <UpdateProfileInformationForm
              mustVerifyEmail={mustVerifyEmail}
              status={status}
              className="max-w-xl"
            />
          </div>

          <div className="bg-white p-6 shadow rounded-xl">
            <UpdatePasswordForm className="max-w-xl" />
          </div>

          <div className="bg-white p-6 shadow rounded-xl">
            <DeleteUserForm className="max-w-xl" />
          </div>
    
      
    </AuthenticatedLayout>
  )
}
