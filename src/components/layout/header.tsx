"use client"

import { Bell, ChevronDown, MapPin } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

export function Header() {
  const [location, setLocation] = useState("New York")

  const locations = ["New York", "Los Angeles", "Chicago", "Miami", "San Francisco"]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-between bg-background px-4">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-gray-400" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-1 p-0">
              <span className="text-white">{location}</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {locations.map((loc) => (
              <DropdownMenuItem key={loc} onClick={() => setLocation(loc)}>
                {loc}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button variant="ghost" size="icon" className="text-white">
        <Bell className="h-5 w-5" />
      </Button>
    </div>
  )
}
