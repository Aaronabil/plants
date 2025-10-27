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

export default function PersonalDetails({ auth }: { auth: AuthProps }) {
  const user = auth?.user || {}

  const [open, setOpen] = useState(false)
  const [name, setName] = useState(user.name || "")
  const [email, setEmail] = useState(user.email || "")
  const [address, setAddress] = useState("Tangerang, Indonesia")

  const handleSave = () => {
    // nanti bisa tambahkan logika update ke Supabase
    console.log("Updated profile:", { name, email, address })
    setOpen(false)
  }

  return (
    <Card className="bg-white rounded-xl shadow p-6">
      <CardHeader className="flex items-center justify-between mb-4">
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

      <CardContent className="text-sm text-gray-700 space-y-2">
        <p><strong>Name:</strong> {name || "-"}</p>
        <p><strong>Email:</strong> {email || "-"}</p>
        <p><strong>Address:</strong> {address}</p>
      </CardContent>

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
    </Card>
  )
}
