// This file defines TypeScript types for the Telegram Web App

interface TelegramWebApp {
    initData: string
    initDataUnsafe?: {
        query_id?: string
        user?: {
            id: number
            first_name: string
            last_name?: string
            username?: string
            language_code?: string
            photo_url?: string
        }
        auth_date?: string
        hash?: string
    }
    ready: () => void
    expand: () => void
    close: () => void
    showAlert?: (message: string) => void
    showConfirm?: (message: string, callback: (confirmed: boolean) => void) => void
    MainButton?: {
        text: string
        color: string
        textColor: string
        isVisible: boolean
        isActive: boolean
        show: () => void
        hide: () => void
        enable: () => void
        disable: () => void
        setText: (text: string) => void
        onClick: (callback: () => void) => void
        offClick: (callback: () => void) => void
    }
    BackButton?: {
        isVisible: boolean
        show: () => void
        hide: () => void
        onClick: (callback: () => void) => void
        offClick: (callback: () => void) => void
    }
    onEvent?: (eventName: string, callback: (...args: any[]) => void) => void
    offEvent?: (eventName: string, callback: (...args: any[]) => void) => void
    colorScheme?: 'light' | 'dark'
    themeParams?: {
        bg_color?: string
        text_color?: string
        hint_color?: string
        link_color?: string
        button_color?: string
        button_text_color?: string
    }
}

interface TelegramApp {
    WebApp: TelegramWebApp
}

// Extend the Window interface
declare global {
    interface Window {
        Telegram: TelegramApp
    }
}

export {}
