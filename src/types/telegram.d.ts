// src/types/telegram.d.ts

interface TelegramWebAppUser {
    id: number
    first_name: string
    last_name?: string
    username?: string
    language_code?: string
    photo_url?: string
    is_premium?: boolean
    added_to_attachment_menu?: boolean
    allows_write_to_pm?: boolean
}

interface TelegramWebAppInitDataUnsafe {
    query_id?: string
    user?: TelegramWebAppUser
    receiver?: TelegramWebAppUser
    chat?: any
    start_param?: string
    can_send_after?: number
    auth_date?: string
    hash?: string
}

interface MainButton {
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
    setText: (text: string) => void
    onClick: (callback: () => void) => void
    offClick: (callback: () => void) => void
    showProgress: (leaveActive?: boolean) => void
    hideProgress: () => void
}

interface BackButton {
    isVisible: boolean
    show: () => void
    hide: () => void
    onClick: (callback: () => void) => void
    offClick: (callback: () => void) => void
}

interface TelegramWebApp {
    // Core properties
    initData: string
    initDataUnsafe: TelegramWebAppInitDataUnsafe
    version: string
    platform: string
    colorScheme: 'light' | 'dark'
    themeParams: Record<string, string>
    isExpanded: boolean
    viewportHeight: number
    viewportStableHeight: number
    headerColor: string
    backgroundColor: string
    
    // Methods
    ready: () => void
    expand: () => void
    close: () => void
    sendData: (data: string) => void
    openLink: (url: string, options?: { try_instant_view?: boolean }) => void
    openTelegramLink: (url: string) => void
    showPopup: (params: { title?: string; message: string; buttons?: Array<{
        id?: string
        type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive'
        text: string
    }> }, callback?: (buttonId: string) => void) => void
    showAlert: (message: string, callback?: () => void) => void
    showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void
    showScanQrPopup: (params: { text?: string }, callback?: (data: string) => void) => void
    closeScanQrPopup: () => void
    readTextFromClipboard: (callback?: (text: string) => void) => void
    requestWriteAccess: (callback?: (access: boolean) => void) => void
    requestContact: (callback?: (phoneNumber: string) => void) => void
    
    // Buttons
    MainButton: MainButton
    BackButton: BackButton
    SettingsButton: {
        isVisible: boolean
        show: () => void
        hide: () => void
        onClick: (callback: () => void) => void
        offClick: (callback: () => void) => void
    }
    
    // Events
    onEvent: (eventType: string, handler: (...args: any[]) => void) => void
    offEvent: (eventType: string, handler: (...args: any[]) => void) => void
    
    // Haptic feedback
    HapticFeedback: {
        impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
        notificationOccurred: (type: 'error' | 'success' | 'warning') => void
        selectionChanged: () => void
    }
}

interface TelegramApp {
    WebApp: TelegramWebApp
}

declare global {
    interface Window {
        Telegram?: TelegramApp
    }
}

export {}