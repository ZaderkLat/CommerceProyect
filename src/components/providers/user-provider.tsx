
"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Session, User } from "@supabase/supabase-js"

interface AuthContextType {
    user: User | null
    session: Session | null
    loading: boolean
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true
})

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [loading, setloading] = useState(true)
    useEffect(() => {
        // Obtener sesión actual al montar
        const currentSession = supabase.auth.getSession().then(({ data }) => {
            setSession(data.session)
            setUser(data.session?.user ?? null)
        })

        // Escuchar cambios en la sesión (login, logout, refresh)
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
        })
        setloading(false)
        return () => {
            listener?.subscription.unsubscribe()
            
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, session, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook para usar en componentes
export function useAuth() {
    return useContext(AuthContext)
}
