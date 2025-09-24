import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Check if user has just confirmed their email
    const params = new URLSearchParams(location.search)
    if (params.get('confirmed') === 'true') {
      setSuccessMessage('Email confirmed successfully! You can now log in.')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Reset any previous errors
      setError('')

      // Check if the password is too short
      if (password.length < 6) {
        setError('Password must be at least 6 characters long')
        return
      }

      // Validate email format
      if (!email.includes('@')) {
        setError('Please enter a valid email address')
        return
      }

      console.log('Attempting login with:', { email })
      await signIn(email, password)
      console.log('Login successful, redirecting to dashboard...')
      navigate('/dashboard')
    } catch (err) {
      console.error('Login attempt failed:', err)
      if (err instanceof Error) {
        setError(err.message)
      } else {
        console.error('Unexpected login error:', err)
        setError('An unexpected error occurred. Please try again.')
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Welcome back</CardTitle>
          <CardDescription className="text-zinc-400">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {successMessage && (
              <Alert className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-zinc-200">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-zinc-200">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
              Sign In
            </Button>
            <p className="text-sm text-zinc-400 text-center">
              Don't have an account?{' '}
              <a href="/signup" className="text-emerald-500 hover:text-emerald-400">
                Sign up
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}