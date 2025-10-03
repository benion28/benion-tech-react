import { useToast } from "@/hooks/use-toast"
import { AppDispatch } from "@/store"
import { loginUser } from "@/store/slices/authSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false
    })
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { toast } = useToast()
    const dispatch: AppDispatch = useDispatch()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Simulate login API call
            const response = await dispatch(loginUser(
                { username: formData.username, password: formData.password }
            )).unwrap()
            // Check credentials (demo authentication)
            if (response.success) {
                toast({
                    title: "Login Successful",
                    description: `Welcome back, ${formData.username}!`,
                })
                navigate('/dashboard')
            } else {
                toast({
                    title: "Login Failed",
                    description: "Invalid username or password",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleGuestLogin = () => {
        setFormData({ username: 'guest', password: 'guest123', rememberMe: false })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username field */}
            <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                        className="pl-10"
                        required
                    />
                </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10"
                        required
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                </div>
            </div>

            {/* Remember me and forgot password */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="remember"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) =>
                            setFormData(prev => ({ ...prev, rememberMe: !!checked }))
                        }
                    />
                    <Label htmlFor="remember" className="text-sm">Remember me</Label>
                </div>
                <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:text-primary-hover transition-colors"
                >
                    Forgot password?
                </Link>
            </div>

            {/* Login button */}
            <Button
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-90 transition-all shadow-glow"
                disabled={isLoading}
            >
                {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            {/* Guest login */}
            <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGuestLogin}
            >
                Login as Guest
            </Button>

            {/* Sign up link */}
            <div className="text-center">
                <span className="text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="text-primary hover:text-primary-hover font-medium transition-colors"
                    >
                        Create Account
                    </Link>
                </span>
            </div>
        </form>
    )
}

export default LoginForm