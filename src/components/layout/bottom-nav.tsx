import { Home, Search, Heart, Ticket, User } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Explore", href: "/explore", icon: Search },
  { name: "Favorites", href: "/favorites", icon: Heart },
  { name: "Tickets", href: "/tickets", icon: Ticket },
  { name: "Profile", href: "/profile", icon: User },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-around border-t border-gray-800 bg-background">
      {navItems.map((item) => {
        const isActive = location.pathname === item.href
        const Icon = item.icon
        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn("flex flex-col items-center justify-center", isActive ? "text-primary" : "text-gray-500")}
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs">{item.name}</span>
          </Link>
        )
      })}
    </div>
  )
}
