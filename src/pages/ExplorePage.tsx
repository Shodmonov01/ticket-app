import { Header } from "../components/layout/header"
import { BottomNav } from "../components/layout/bottom-nav"
import { SearchBar } from "../components/search-bar"

export default function ExplorePage() {
  return (
    // <div className="min-h-screen bg-background pb-20 pt-16">
    <div className="flex min-h-screen flex-col items-center justify-center bg-background pb-20 pt-16 text-white">

      <Header />

      <main className="container max-w-md px-4 py-4">
        <div className="mb-6">
          <SearchBar />
        </div>

        <div className="flex h-[60vh] items-center justify-center rounded-lg bg-muted">
          <h2 className="text-xl font-medium text-white">Explore Page</h2>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
