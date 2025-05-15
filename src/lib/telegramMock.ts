export const mockTelegramWebApp = {
    initData:
        // 'query_id=AAGzzMo2AAAAALPMyjaHCsWY&user=%7B%22id%22%3A919260339%2C%22first_name%22%3A%22%D0%90%D0%BC%D0%B8%D1%80%22%2C%22last_name%22%3A%22%D0%A8%D0%BE%D0%B4%D0%BC%D0%BE%D0%BD%D0%BE%D0%B2%22%2C%22username%22%3A%22a_shodmonov60%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FofQvVPKvTSdiEBT2LTidZ9awJyIWfIOprti3vZQIlbs.svg%22%7D&auth_date=1746621424&signature=FdFRUQEuwGNLak2tNaGlWqkGOKJe_P4_cNiwg5zyT2YLrSUm-ldR6wBG_ilGYreU0CcEsMIJSAeDcXOZ5tN8BQ&hash=fc24655cd88b275559e7956eb3b88a51b92f1ad202c7f4fd7aa3242c5b6140cf',
        'user=%7B%22id%22%3A5806927593%2C%22first_name%22%3A%22Jekki%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22xcode_devfull%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2Fxo_jV14A7LOlMg1_jassHkQaMAQf22m353cHRSn7RDLc4cUBkCGZHdW_P2vO9U-t.svg%22%7D&chat_instance=1490613134288801178&chat_type=sender&auth_date=1747234422&signature=Dcy0n32_gG-OdidrpGYF-YUJ2vho3DgYeYVGKQiDrcRsRlzGUBZ3q12Rwxfa_y281T1MrSDzbwG31Fwl-mTBBg&hash=9d896fed45b661ae58dc26dac06bb4f24466d420ae2427c5fcb20b6fa99d59ba',
        // 'user=%7B%22id%22%3A919260339%2C%22first_name%22%3A%22%D0%90%D0%BC%D0%B8%D1%80%22%2C%22last_name%22%3A%22%D0%A8%D0%BE%D0%B4%D0%BC%D0%BE%D0%BD%D0%BE%D0%B2%22%2C%22username%22%3A%22a_shodmonov60%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FofQvVPKvTSdiEBT2LTidZ9awJyIWfIOprti3vZQIlbs.svg%22%7D&chat_instance=2066461366582565504&chat_type=sender&auth_date=1747146296&signature=oX2mqr-vsW0BY1LHDaDERGVx-HJlT4VeWt7RRpjcM-46IEBtvPfhOpKXjWpPOwRiJidygNA92dli-0D0fvmiAA&hash=21624c702d49fbb61615883ca969f77570b9ae0ba4751609e819d024f443c8ca',
    initDataUnsafe: {
        user: {
            id: 123456,
            first_name: 'T2eewwfhjhdsa2jwsdghst',
            last_name: 'Us2feewhwjrdsad2wsugyugyu',
            username: 'tes2tuwhjfw2edssdaswgher',
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
