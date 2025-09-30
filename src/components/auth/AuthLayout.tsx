import { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import loginHeroBg from '@/assets/login-hero-bg.jpg'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${loginHeroBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
      
      {/* Theme toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      {/* Main auth card */}
      <div className="w-full max-w-md animate-slide-up">
        <Card className="glass-card shadow-bold border-white/20">
          <CardContent className="p-8">
            {/* Logo section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4 shadow-glow">
                <span className="text-white font-bold text-2xl">bT</span>
              </div>
              <h1 className="text-3xl font-bold gradient-text mb-2">{title}</h1>
              {subtitle && (
                <p className="text-muted-foreground text-sm">{subtitle}</p>
              )}
            </div>
            
            {children}
          </CardContent>
        </Card>
        
        {/* Footer */}
        <div className="text-center mt-8 text-white/80 text-sm">
          <p>© 2025 Benion-Tech. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}