export interface TypeEventItem {
    id: number
    name: string
    description: string
    age_limit: number
    area: number
    category_id: number
    city_id: number
    create_at: string
    image: string
    owner: number
    event_category: { id: number; name: string; quantity: number; price: number; explanation: string; event: number }
    event_time: { id: number; date: string; start_time: string; end_time: string; event: number }
}
