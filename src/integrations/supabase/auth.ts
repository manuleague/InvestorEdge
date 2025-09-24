import { supabase } from './client'
import type { Database } from './types'

export async function checkUserExists(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .match({ email })
      .single()

    if (error) {
      console.error('Error checking user existence:', error)
      return false
    }

    return !!data
  } catch (err) {
    console.error('Exception checking user existence:', err)
    return false
  }
}

export async function createUserProfile(userId: string, email: string) {
  try {
    const insertData = {
      id: userId,
      email,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('profiles')
      .insert([insertData]) as unknown as { error: any }

    if (error) {
      console.error('Error creating user profile:', error)
      throw error
    }
  } catch (err) {
    console.error('Exception creating user profile:', err)
    throw err
  }
}