import { useState } from "react"
import { Edit } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"
import { User } from "@/types"

// interface AuthProps {
//   user?: {
//     name?: string
//     email?: string
//   }
// }

export default function ProfileSection({ auth }: { auth: User }) {
  const user = auth.user;
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* --- Personal Details Card (Bottom Left Section) --- */}
      <Card className="bg-white rounded-xl shadow p-6 w-full">
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
            {auth.user.name || "-"}
          </p>
          <p>
            <strong className="font-semibold w-16 inline-block">Email:</strong>
            {user.email || "-"}
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
              <Input value={user.name} />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input value={user.email} />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}