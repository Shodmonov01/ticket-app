import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export function SearchBar() {
  return (
    <div className="relative w-full">
      <div className="flex w-full items-center rounded-md bg-muted px-3 py-2">
        <Search className="mr-2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Discover live shows ..."
          className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button variant="ghost" size="icon" className="ml-auto">
          <SlidersHorizontal className="h-5 w-5 text-gray-400" />
        </Button>
      </div>
    </div>
  )
}
