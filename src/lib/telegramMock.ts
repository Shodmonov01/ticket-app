export const mockTelegramWebApp = {
    initData:
        'query_id=AAHi3dYUAAAAAOLd1hQC3jBr&user=%7B%22id%22%3A349625826%2C%22first_name%22%3A%22U%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22umidaakbar0va%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FTtaUu__iemURBKwh5Eeo4w6cnb4-aghoqscxSjBCPeQ.svg%22%7D&auth_date=1747115501&signature=QHXC0SiYuUH6bbl7Cu-jTj8Zw01z90Y-zOWHyb46virTXLyph3oTznIHPuTizlBGWXlDCEC9sJGsK6l7vUXDBA&hash=fddb590bc7c9e4e78480de2d6ca4911de00e9c91468c73d114d16b537c96511b',
    initDataUnsafe: {
        user: {
            id: 123456,
            first_name: 'T2eefhjsdghst',
            last_name: 'Us2feerdsugyugyu',
            username: 'tes2tufedssgher',
            language_code: 'en'
        }
    },
    ready: () => console.log('[Mock] Telegram WebApp ready'),
    expand: () => console.log('[Mock] Telegram WebApp expand'),
    sendData: (data: string) => console.log('[Mock] Send data:', data)
    // Добавьте другие методы Telegram WebApp, если они используются
}

export const isTelegramEnv = () => {
    return typeof window !== 'undefined' && !!window.Telegram?.WebApp?.initData
}

export const getTelegramWebApp = () => {
    return isTelegramEnv() ? window.Telegram.WebApp : mockTelegramWebApp
}
