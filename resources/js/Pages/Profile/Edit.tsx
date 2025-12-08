import { Button } from '@/Components/ui/button'
import { PageProps } from '@/types'
import { Head, Link } from '@inertiajs/react'
import DeleteUserForm from './Partials/DeleteUserForm'
import UpdatePasswordForm from './Partials/UpdatePasswordForm'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm'
import { useState } from 'react'
import { Edit as EditIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog"
import StatusOrder from './StatusOrder'
import { Avatar, AvatarFallback } from '@/Components/ui/avatar'
import GuestLayout from '@/Layouts/GuestLayout'

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
  const user = auth.user;
  const [openProfile, setOpenProfile] = useState(false)
  const [openPassword, setOpenPassword] = useState(false)

  return (
    <>
      <GuestLayout hideFooter={true}>
        <Head title="Profile" />

        <div className="py-10 bg-gray-50 min-h-screen">
          <div className="mx-auto max-w-7xl space-y-8 sm:px-6 lg:px-8">
            {/* ====== HEADER PROFILE ====== */}
            <div className="bg-white p-6 rounded-xl shadow flex flex-col sm:flex-row items-center sm:items-start gap-6 relative">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarFallback>
                    {user.name?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {/* <button className="absolute bottom-0 right-0 bg-gray-200 hover:bg-gray-300 rounded-full p-1">
                <EditIcon className="w-4 h-4 text-gray-700" />
              </button> */}
              </div>

              <div className="mt-2">
                <h2 className="text-xl font-semibold">{auth.user.name}</h2>
                <p className="text-gray-500">{auth.user.email}</p>
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary hover:underline"
                  onClick={() => setOpenPassword(true)}
                >
                  Update Password
                </Button>
              </div>
            </div>


            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white rounded-xl shadow p-6 w-full">
                <CardHeader className="flex flex-row items-center justify-between p-0 mb-4">
                  <CardTitle className="text-lg font-semibold text-gray-700">
                    Personal Details
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpenProfile(true)}
                    className="hover:bg-gray-100"
                  >
                    <EditIcon className="w-4 h-4 text-gray-600" />
                  </Button>
                </CardHeader>

                <CardContent className="text-sm text-gray-700 space-y-3 p-0">
                  <p>
                    <strong className="font-semibold w-16 inline-block">Name:</strong>
                    {user.name || "-"}
                  </p>
                  <p>
                    <strong className="font-semibold w-16 inline-block">Email:</strong>
                    {user.email || "-"}
                  </p>
                  <p>
                    <strong className="font-semibold w-16 inline-block">Phone:</strong>
                    {user.phone || "-"}
                  </p>
                </CardContent>
              </Card>

              {/* --- Edit Profile Dialog --- */}
              <Dialog open={openProfile} onOpenChange={setOpenProfile}>
                <DialogContent className="max-w">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className="p-0"
                    onClose={() => setOpenProfile(false)}
                  />
                </DialogContent>
              </Dialog>

              {/* --- Update Password Dialog --- */}
              <Dialog open={openPassword} onOpenChange={setOpenPassword}>
                <DialogContent className="max-w">
                  <DialogHeader>
                    <DialogTitle>Update Password</DialogTitle>
                  </DialogHeader>
                  <UpdatePasswordForm
                    className="max-w-xl p-0"
                    onClose={() => setOpenPassword(false)}
                  />
                </DialogContent>
              </Dialog>
              <StatusOrder />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 shadow rounded-xl">
          <DeleteUserForm className="max-w-xl" />
        </div>
      </GuestLayout>
    </>
  )
}
