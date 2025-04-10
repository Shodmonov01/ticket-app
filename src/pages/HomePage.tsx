import { Header } from "../components/layout/header"
import { BottomNav } from "../components/layout/bottom-nav"
import { SearchBar } from "../components/search-bar"
import { CategoryCard } from "../components/category-card"
import { CategorySection } from "../components/category-section"
import { EventCard } from "../components/event-card"
import { Calendar, MegaphoneIcon, Moon } from "lucide-react"

export default function HomePage() {
  return (
    // <div className="min-h-screen bg-background pb-20 pt-16">
    <div className="flex min-h-screen flex-col items-center justify-center bg-background pb-20 pt-16 text-white">

      <Header />

      <main className="container max-w-md px-4 py-4">
        <div className="mb-6">
          <SearchBar />
        </div>

        <div className="mb-8 grid grid-cols-3 gap-4">
          <CategoryCard
            title="This Week"
            count={28}
            icon={<Calendar className="h-full w-full text-primary" />}
            className="bg-primary/10"
          />
          <CategoryCard
            title="New shows"
            count={8}
            icon={<MegaphoneIcon className="h-full w-full text-secondary" />}
            className="bg-secondary/10"
          />
          <CategoryCard
            title="Late night"
            count={15}
            icon={<Moon className="h-full w-full text-tertiary" />}
            className="bg-tertiary/10"
          />
        </div>

        <CategorySection title="Categories" seeAllHref="/categories">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
              <div className="h-12 w-12 overflow-hidden rounded-md">
                <img src="https://via.placeholder.com/48" alt="Tourism" className="h-full w-full object-cover" />
              </div>
              <span className="font-medium text-white">Tourism</span>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
              <div className="h-12 w-12 overflow-hidden rounded-md">
                <img src="https://via.placeholder.com/48" alt="Live Shows" className="h-full w-full object-cover" />
              </div>
              <span className="font-medium text-white">Live Shows</span>
            </div>
          </div>
        </CategorySection>

        <CategorySection title="Near You" seeAllHref="/near-you">
          <div className="grid gap-4">
            <EventCard
              id="1"
              title="Stars under the Pyramids Concert"
              image="https://via.placeholder.com/384x192"
              price={50}
              location="Giza Pyramids, Cairo"
              date="Sep 10, 2025"
              time="06:00 PM"
            />
            <EventCard
              id="2"
              title="Sunset Jazz Festival"
              image="https://via.placeholder.com/384x192"
              price={40}
              location="Santorini Island, Greece"
              date="Oct 5, 2025"
              time="05:00 PM"
            />
          </div>
        </CategorySection>
      </main>

      <BottomNav />
    </div>
  )
}
