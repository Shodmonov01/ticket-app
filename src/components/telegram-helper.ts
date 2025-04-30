/**
 * Helper functions for Telegram WebApp integration
 */

// Extract initData from URL hash if Telegram WebApp is not available
export function getInitDataFromUrl(): string | null {
    try {
        // Check if we're in a browser environment
        if (typeof window === 'undefined') return null

        // Get the URL hash (everything after #)
        const hash = window.location.hash

        // Look for tgWebAppData in the hash
        if (hash && hash.includes('tgWebAppData=')) {
            // Extract the tgWebAppData parameter
            const tgWebAppDataParam = hash
                .split('&')
                .find(param => param.startsWith('#tgWebAppData=') || param.startsWith('tgWebAppData='))

            if (tgWebAppDataParam) {
                // Get the value part (after =)
                const initData = tgWebAppDataParam.split('=')[1]
                // Decode the URL component
                return decodeURIComponent(initData)
            }
        }

        return null
    } catch (error) {
        console.error('Error extracting initData from URL:', error)
        return null
    }
}

// Check if we're running in Telegram WebApp
export function isTelegramWebApp(): boolean {
    return typeof window !== 'undefined' && !!window.Telegram?.WebApp
}

// Get initData from Telegram WebApp or URL
export function getInitData(): string | null {
    // First try to get it from the Telegram WebApp object
    if (isTelegramWebApp()) {
        return window?.Telegram?.WebApp.initData as any
    }

    // If not available, try to extract from URL
    return getInitDataFromUrl()
}
