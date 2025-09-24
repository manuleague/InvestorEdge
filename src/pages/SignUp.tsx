import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/auth-context'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isSignupComplete, setIsSignupComplete] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    try {
      if (password.length < 6) {
        setError('Password must be at least 6 characters long')
        return
      }
      await signUp(email, password)
      setIsSignupComplete(true)
      setError('')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred while creating your account')
      }
      console.error('Signup error:', err)
      setIsSignupComplete(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        {isSignupComplete ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Check Your Email</CardTitle>
            <CardDescription className="text-zinc-400 space-y-2">
              <p>We've sent a confirmation link to:</p>
              <p className="font-medium text-emerald-500">{email}</p>
              <p className="mt-4">Please check your email (including spam folder) and click the confirmation link to activate your account.</p>
            </CardDescription>
            <div className="mt-6">
              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Didn't receive the email? Click to try again
              </Button>
            </div>
          </div>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Create Account</CardTitle>
              <CardDescription className="text-zinc-400">
                Sign up for a new account to get started
              </CardDescription>
            </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
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
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-zinc-200">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
              Sign Up
            </Button>
            <p className="text-sm text-zinc-400 text-center">
              Already have an account?{' '}
              <a href="/login" className="text-emerald-500 hover:text-emerald-400">
                Sign in
              </a>
            </p>
          </CardFooter>
        </form>
        </>
        )}
      </Card>
    </div>
  )
}