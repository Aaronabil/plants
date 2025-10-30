import { useState } from "react"
import { Edit } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"

interface AuthProps {
  user?: {
    name?: string
    email?: string
  }
}

export default function ProfileSection({ auth }: { auth: AuthProps }) {
  const user = auth?.user || {}

  // State for the edit dialog
  const [open, setOpen] = useState(false)
  
  // User data state (can be initialized from props/context)
  const [name, setName] = useState(user.name || "Nabil")
  const [email, setEmail] = useState(user.email || "nabilmuhamad630@gmail.com")
  const [address, setAddress] = useState("Tangerang, Indonesia")
  const memberSince = "2023" // Static for this example, should come from user data

  const handleSave = () => {
    // Logic to update profile (e.g., API call)
    console.log("Updated profile:", { name, email, address })
    setOpen(false)
  }

  return (
    <>
      {/* --- Profile Info Section (Top Bar) --- */}
      <div className="flex items-center space-x-4 mb-6 p-4">
        {/* Placeholder for Profile Picture */}
        <div className="rounded-full w-16 h-16 bg-gray-200 border border-gray-300">
          {/*  */}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-600">{email}</p>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Member sejak {memberSince}
          </div>
        </div>
      </div>

      {/* --- Personal Details Card (Bottom Left Section) --- */}
      <Card className="bg-white rounded-xl shadow p-6 w-full lg:w-1/2">
        <CardHeader className="flex flex-row items-center justify-between p-0 mb-4">
          <CardTitle className="text-lg font-semibold text-gray-700">
            Personal Details
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
            className="hover:bg-gray-100"
          >
            <Edit className="w-4 h-4 text-gray-600" />
          </Button>
        </CardHeader>

        <CardContent className="text-sm text-gray-700 space-y-3 p-0">
          <p>
            <strong className="font-semibold w-16 inline-block">Name:</strong> 
            {name || "-"}
          </p>
          <p>
            <strong className="font-semibold w-16 inline-block">Email:</strong> 
            {email || "-"}
          </p>
          <p>
            <strong className="font-semibold w-16 inline-block">Address:</strong> 
            {address}
          </p>
        </CardContent>
      </Card>

      {/* --- Edit Profile Dialog --- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 mt-2">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Address</label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}