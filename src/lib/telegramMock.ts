export const mockTelegramWebApp = {
    initData:
        'query_id=AAGzzMo2AAAAALPMyjYcK0ZV&user=%7B%22id%22%3A919260339%2C%22first_name%22%3A%22%D0%90%D0%BC%D0%B8%D1%80%22%2C%22last_name%22%3A%22%D0%A8%D0%BE%D0%B4%D0%BC%D0%BE%D0%BD%D0%BE%D0%B2%22%2C%22username%22%3A%22a_shodmonov60%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FofQvVPKvTSdiEBT2LTidZ9awJyIWfIOprti3vZQIlbs.svg%22%7D&auth_date=1747756667&signature=qXy9fVG-GCnmSi8_2nhJFYzGd__mlgnznFPoa_dC-y4GJm1N8jx1ab91HSULMMX5AC0cI4jRUnpZt9Ljgq4nDQ&hash=f424865c362d2ad78957c269b75234b793a6b9a9534ddbd7602c0f00936cbbe1',
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
