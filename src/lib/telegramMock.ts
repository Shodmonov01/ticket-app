export const mockTelegramWebApp = {
    initData:
        'query_id=AAGzzMo2AAAAALPMyjaHCsWY&user=%7B%22id%22%3A919260339%2C%22first_name%22%3A%22%D0%90%D0%BC%D0%B8%D1%80%22%2C%22last_name%22%3A%22%D0%A8%D0%BE%D0%B4%D0%BC%D0%BE%D0%BD%D0%BE%D0%B2%22%2C%22username%22%3A%22a_shodmonov60%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FofQvVPKvTSdiEBT2LTidZ9awJyIWfIOprti3vZQIlbs.svg%22%7D&auth_date=1746621424&signature=FdFRUQEuwGNLak2tNaGlWqkGOKJe_P4_cNiwg5zyT2YLrSUm-ldR6wBG_ilGYreU0CcEsMIJSAeDcXOZ5tN8BQ&hash=fc24655cd88b275559e7956eb3b88a51b92f1ad202c7f4fd7aa3242c5b6140cf',
    initDataUnsafe: {
        user: {
            id: 123456,
            first_name: 'Tehjghst',
            last_name: 'Userugyugyu',
            username: 'testusgher',
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
