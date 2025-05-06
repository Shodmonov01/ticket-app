import { createContext, useContext, useState, ReactNode } from 'react'

interface UserContextType {
    isFirstTimeUser: boolean
    setIsFirstTimeUser: (value: boolean) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
    const [isFirstTimeUser, setIsFirstTimeUser] = useState(true)

    return (
        <UserContext.Provider value={{ isFirstTimeUser, setIsFirstTimeUser }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}