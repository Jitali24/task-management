// AuthProvider.tsx
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { auth } from '../firebase' // your firebase config
import type { User } from 'firebase/auth'

type Props = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return () => unsubscribe() // Cleanup on unmount
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
