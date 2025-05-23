export interface TypeEventItem {
    results: {
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
        event_category: {
            id: number
            name: string
            quantity: number
            price: number
            explanation: string
            event: number
        }[]
        event_time: {
            id: number
            date: string
            start_time: string
            end_time: string
            event: number
        }[]
    }[]
}

export interface TypeUser {
    id: number
    telegram_id: number
    first_name: string
    last_name: string
    username: string
    email: string | null
    avatar_url: string
    phone_number: string | null
    organization_profile: {
        id: number
        profile_type: string
        owner: number
        organization_name: string | null
        full_name: string
        recipient_full_name: string | null
        inn: string
        kpp: string | null
        ogrn: string | null
        ogrnip: string
        bank_name: string
        bik: string
        checking_account: string
        correspondent_account: string
        bank_inn: string | null
        bank_kpp: string | null
        legal_address: string
        postal_address: string | null
        email: string | null
        contact_phone: string | null
        contact_person: string | null
        ceo_full_name: string | null
        telegram_channels: any
    }
    groups: { id: number; name: string }[]
}

export interface EventsResponse {
    count: number
    next: string | null
    previous: string | null
    results: TypeEventItem[]
}

type Event = {
    id: number
    status: string
    name: string
    description: string
    category_id: number
    age_limit: string
    city_id: number
    area: string
    image: string
    event_category: any
    event_time: any
    owner: any
    views_count: number
    create_at: string
}

type TelegramChannel = {
    id: number
    name: string
    urls: string
    owner: any
}

export type Offer = {
    results: {
        id: number
        sender: number
        event: Event
        channel: TelegramChannel
        status: 'new_offer' | 'accepted' | 'cancelled'
        is_change: string
        create_at: string
    }[]
}
