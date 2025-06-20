import { signOut } from 'firebase/auth'
import { auth } from '../firebase' // make sure this points to your initialized auth

export const logout = async () => {
  try {
    await signOut(auth)
    console.log('User signed out successfully.')
  } catch (error: unknown) {
    console.error('Logout error:', error)
    throw new Error(error instanceof Error ? error.message : `${error}`)
  }
}
