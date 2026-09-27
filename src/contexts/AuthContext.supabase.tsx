import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { LoadingState } from '../components/ui/LoadingState'

interface AuthContextType {
  session: Session | any | null
  user: User | any | null
  isLoading: boolean
  isDemoMode: boolean
  signInDemo: (email: string) => void
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const isDemoEnv = import.meta.env.VITE_ENABLE_DEMO_MODE === 'true'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | any | null>(null)
  const [user, setUser] = useState<User | any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDemoMode, setIsDemoMode] = useState(false)

  useEffect(() => {
    // Verifica sessão demo primeiro
    if (isDemoEnv) {
      const storedDemo = localStorage.getItem('@futcrm:demo_session')
      if (storedDemo) {
        try {
          const data = JSON.parse(storedDemo)
          setSession(data.session)
          setUser(data.user)
          setIsDemoMode(true)
          setIsLoading(false)
          return
        } catch (e) {
          console.error('Erro ao ler sessão demo', e)
        }
      }
    }

    // Fluxo normal do Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // Se não estivermos ativamente no modo demo, aplicamos a sessão real
      if (!localStorage.getItem('@futcrm:demo_session')) {
        setSession(session)
        setUser(session?.user ?? null)
        setIsDemoMode(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInDemo = (email: string) => {
    if (!isDemoEnv) return

    const fakeUser = {
      id: 'demo-user-123',
      email: email,
      user_metadata: {
        first_name: 'Usuário',
        last_name: 'Demo'
      }
    }

    const fakeSession = {
      access_token: 'demo-token-123',
      user: fakeUser
    }

    localStorage.setItem('@futcrm:demo_session', JSON.stringify({ session: fakeSession, user: fakeUser }))
    setSession(fakeSession)
    setUser(fakeUser)
    setIsDemoMode(true)
  }

  const signOut = async () => {
    if (isDemoMode || localStorage.getItem('@futcrm:demo_session')) {
      localStorage.removeItem('@futcrm:demo_session')
      setSession(null)
      setUser(null)
      setIsDemoMode(false)
    } else {
      await supabase.auth.signOut()
    }
  }

  if (isLoading) {
    return <LoadingState fullScreen message="Carregando..." />
  }

  return (
    <AuthContext.Provider value={{ session, user, isLoading, isDemoMode, signInDemo, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
