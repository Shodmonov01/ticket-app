import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { UserProvider } from './context/user-context'
import { ThemeProvider } from './components/theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
                    <UserProvider>
                        <App />
                    </UserProvider>
                </ThemeProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
)
