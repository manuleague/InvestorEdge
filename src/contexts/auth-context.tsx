import { createContext, useContext, useEffect, useState } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'

type AuthContextType = {
  session: Session | null
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<{ user: User | null, session: Session | null }>
  signOut: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const value: AuthContextType = {
    session,
    user,
    signIn: async (email: string, password: string) => {
      try {
        console.log('Attempting sign in for:', email)
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (error) {
          console.error('Sign in error:', error)
          throw error
        }

        if (!data?.user) {
          throw new Error('No user returned from authentication')
        }

        console.log('Sign in successful:', data.user)
      } catch (error) {
        console.error('Sign in error:', error)
        throw error
      }
    },
    signUp: async (email: string, password: string) => {
      try {
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters long')
        }

        console.log('Starting signup process for:', email)

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/login?confirmed=true`
          }
        })

        if (error) {
          console.error('Sign up error:', error)
          throw error
        }

        if (!data?.user) {
          throw new Error('No user data returned from signup')
        }

        console.log('Sign up successful, verification email sent to:', email)
        return { user: data.user, session: data.session }
      } catch (error) {
        console.error('Sign up error:', error)
        throw error
      }
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    },
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}