import { useToast } from "@/hooks/use-toast"
import { AppDispatch } from "@/store"
import { loginSMSUser } from "@/store/slices/smsAuthSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

const SMSLoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
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
            const response = await dispatch(loginSMSUser(
                { email: formData.email, password: formData.password }
            )).unwrap()
            // Check credentials (demo authentication)
            if (response.meta.success) {
                toast({
                    title: "Login Successful",
                    description: `Welcome back, ${formData.email}!`,
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

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
        </form>
    )
}

export default SMSLoginForm