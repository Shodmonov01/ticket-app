export interface TelegramWebApp {
    expand: () => void
    ready: () => void
    close: () => void
    initData: string
    initDataUnsafe?: {
        start_param?: string
        user?: {
            id: number
            first_name: string
            last_name?: string
            username?: string
            photo_url?: string
        }
    }
    sendData?: (data: string) => void
    MainButton?: {
        text: string
        color: string
        textColor: string
        isVisible: boolean
        isActive: boolean
        isProgressVisible: boolean
        show: () => void
        hide: () => void
        enable: () => void
        disable: () => void
        showProgress: (leaveActive: boolean) => void
        hideProgress: () => void
        setText: (text: string) => void
        onClick: (callback: () => void) => void
        offClick: (callback: () => void) => void
    }
}
