import { Header } from "../components/layout/header"
import { BottomNav } from "../components/layout/bottom-nav"
import { Button } from "../components/ui/button"
import { Settings, User, CreditCard, LogOut } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background pb-20 pt-16 text-white">
      <Header />

      <main className="container max-w-md px-4 py-4">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-muted">
            <User className="h-full w-full p-6 text-gray-400" />
          </div>
          <h1 className="text-xl font-bold text-white">User Name</h1>
          <p className="text-gray-400">user@example.com</p>
        </div>

        <div className="mb-6 space-y-2 rounded-lg bg-muted p-4">
          <Button variant="ghost" className="w-full justify-start text-white">
            <User className="mr-2 h-5 w-5" />
            Account Information
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white">
            <CreditCard className="mr-2 h-5 w-5" />
            Payment Methods
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white">
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </div>

        <Button variant="destructive" className="w-full">
          <LogOut className="mr-2 h-5 w-5" />
          Log Out
        </Button>
      </main>

      <BottomNav />
    </div>
  )
}
