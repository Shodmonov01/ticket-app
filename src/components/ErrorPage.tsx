import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
    const navigate = useNavigate()

    return (
        <div className="flex min-h-screen flex-col items-center justify-center text-white bg-[#1c232b]">
            <h1 className="text-2xl font-bold mb-4">Ошибка</h1>
            <p className="text-center mb-6">
                Не удалось инициализировать Telegram WebApp. Пожалуйста, откройте приложение в Telegram.
            </p>
            <button
                className="px-4 py-2 bg-primary text-white rounded-lg"
                onClick={() => navigate('/intro')}
            >
                Попробовать снова
            </button>
        </div>
    )
}