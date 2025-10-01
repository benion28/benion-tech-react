import { useState } from "react"
import { 
  Home, 
  Image, 
  FileText, 
  Brain, 
  MessageSquare, 
  Heart,
  User,
  Users,
  Settings,
  LogOut
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useSelector } from "react-redux"
import { RootState } from "@/store"

const mainNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Gallery", url: "/gallery", icon: Image },
  { title: "Posts", url: "/posts", icon: FileText },
  { title: "Users", url: "/users", icon: Users },
  { title: "CBT", url: "/cbt", icon: Brain },
  { title: "SMS", url: "/sms", icon: MessageSquare },
  { title: "Donate", url: "/donate", icon: Heart },
]

const userNavItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const { user } = useSelector((state: RootState) => state.auth);

  const isCollapsed = state === "collapsed"
  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"

  return (
    <Sidebar
      collapsible="icon"
      className="bg-sidebar text-sidebar-foreground border-sidebar-border"
    >
      {/* Header */}
      <SidebarHeader className="border-b border-border/50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
            <span className="text-white font-bold text-sm">bT</span>
          </div>
          {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-sm gradient-text truncate">
                  Benion-Tech
                </h2>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  CMS Dashboard
                </p>
              </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={`text-sidebar-foreground/70 ${isCollapsed ? "sr-only" : ""}`}>
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={`text-sidebar-foreground/70 ${isCollapsed ? "sr-only" : ""}`}>
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-border/50 p-4">
        <div className="space-y-4">
          {/* Theme toggle */}
          <div className={`flex ${isCollapsed ? 'justify-center' : 'justify-end'}`}>
            <ThemeToggle />
          </div>

          {/* User profile */}
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={user?.profile} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {user?.firstname ? user?.firstname[0] : "G"}{user?.lastname ? user?.lastname[0] : "U"}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-sidebar-foreground truncate">{user?.firstname ?? "Guest"} {user?.lastname ?? "User"}</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  {user?.role ? user?.role?.charAt(0).toUpperCase() + user?.role.slice(1) : "Guest"}
                </p>
              </div>
            )}
          </div>

          {/* Logout button */}
          <Button
            variant="ghost"
            size={isCollapsed ? "icon" : "sm"}
            className={`${isCollapsed ? 'w-8 h-8' : 'w-full justify-start'} text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10`}
            onClick={() => {
              // Handle logout
              window.location.href = '/login'
            }}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}