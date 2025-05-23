export const mockTelegramWebApp = {
    initData:
        'query_id=AAHi3dYUAAAAAOLd1hTm6ARC&user=%7B%22id%22%3A349625826%2C%22first_name%22%3A%22U%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22umidaakbar0va%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FTtaUu__iemURBKwh5Eeo4w6cnb4-aghoqscxSjBCPeQ.svg%22%7D&auth_date=1748018853&signature=XZKsYZT6_CSEEyMxBh95P0-lFFtd_E5PZaX3C3e0u5h8VJW2UyoO83hB-gS6N4nQ8t1cDMzw03ME2y2AsgeRDw&hash=0baa2b43ea0568dfdb68f7082bc2cd07c4d4ba57cbe5c2dc4b822d9397879d79',
    initDataUnsafe: {
        user: {
            id: 123456,
            first_name: 'T2eewwfhjhdsfsda32jwsdghst',
            last_name: 'Us2feewhwjrdsfds3ad2wsugyugyu',
            username: 'tes2tuwhjfw2edsfgf3sdaswgher',
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
