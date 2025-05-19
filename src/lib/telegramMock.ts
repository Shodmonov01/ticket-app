export const mockTelegramWebApp = {
    initData:
        'query_id=AAHi3dYUAAAAAOLd1hTIWRVE&user=%7B%22id%22%3A349625826%2C%22first_name%22%3A%22U%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22umidaakbar0va%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FTtaUu__iemURBKwh5Eeo4w6cnb4-aghoqscxSjBCPeQ.svg%22%7D&auth_date=1747643343&signature=2SpW94HQbu-JLpMALH8VbxQKCvN4yLZVytBllpra_oIEWaFEbGUX3DihzUj6PY4f2oBbcBGR6LYcRbUuM0JBBA&hash=1afd6b300f6a06f62ca1d7bd44926dd6c3782a47c7393cdc56f39528e63bd4c3',
    initDataUnsafe: {
        user: {
            id: 123456,
            first_name: 'T2eewwfhjhdsa32jwsdghst',
            last_name: 'Us2feewhwjrds3ad2wsugyugyu',
            username: 'tes2tuwhjfw2eds3sdaswgher',
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
