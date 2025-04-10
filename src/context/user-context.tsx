"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type UserContextType = {
  isFirstTimeUser: boolean
  setFirstTimeUser: (value: boolean) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(true)

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited")
    if (hasVisited) {
      setIsFirstTimeUser(false)
    }
  }, [])

  const setFirstTimeUser = (value: boolean) => {
    setIsFirstTimeUser(value)
    if (!value) {
      localStorage.setItem("hasVisited", "true")
    }
  }

  return <UserContext.Provider value={{ isFirstTimeUser, setFirstTimeUser }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
