import { useState } from 'react'
import { useAuth } from '../contexts/auth-context'
import type { Database } from '../integrations/supabase/types'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/components/ui/use-toast'

export default function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Load user profile data
  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .match({ id: user?.id })
        .single() as { data: Database['public']['Tables']['profiles']['Row'] | null, error: any }

      if (error) throw error
      if (data) setFullName(data.full_name || '')
    } catch (error) {
      console.error('Error loading user profile:', error)
    }
  }

  // Update user profile
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!user?.id || !user?.email) throw new Error('User not found')

      const updateData = {
        full_name: fullName,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user?.id || '') as unknown as { error: any }

      if (error) throw error

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      })
    } catch (error) {
      setError('Error updating profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold text-white">Profile Settings</CardTitle>
              <CardDescription className="text-zinc-400">{user?.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <form onSubmit={handleUpdateProfile}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium text-zinc-200">
                Full Name
              </label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}