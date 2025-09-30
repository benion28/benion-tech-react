import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  FileText, 
  Image, 
  MessageSquare, 
  TrendingUp,
  Activity,
  Clock,
  Plus,
  Loader2
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { fetchPosts } from '@/store/slices/postsSlice'
import { fetchMediaItems } from '@/store/slices/gallerySlice'
import { fetchUsers } from '@/store/slices/usersSlice'

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const { posts } = useAppSelector((state) => state.posts)
  const { mediaItems } = useAppSelector((state) => state.gallery)
  const { users } = useAppSelector((state) => state.users)

  useEffect(() => {
    // Fetch initial data for dashboard stats
    dispatch(fetchPosts({ page: 1, limit: 5 }))
    dispatch(fetchMediaItems({ page: 1, limit: 5 }))
    dispatch(fetchUsers({ page: 1, limit: 5 }))
  }, [dispatch])
  const stats = [
    {
      title: "Total Posts",
      value: posts.length.toString(),
      change: "+12%",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/30"
    },
    {
      title: "Gallery Items",
      value: mediaItems.length.toString(),
      change: "+8%",
      icon: Image,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/30"
    },
    {
      title: "Messages",
      value: "24",
      change: "+4%",
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/30"
    },
    {
      title: "Active Users",
      value: users.length.toString(),
      change: "+16%",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/30"
    }
  ]

  const recentActivities = [
    {
      action: "New post published",
      title: "React Performance Optimization",
      time: "2 hours ago",
      type: "post"
    },
    {
      action: "Image uploaded",
      title: "Project Screenshot",
      time: "4 hours ago",
      type: "gallery"
    },
    {
      action: "CBT test created",
      title: "JavaScript Fundamentals",
      time: "6 hours ago",
      type: "cbt"
    },
    {
      action: "New message received",
      title: "Project Collaboration Request",
      time: "1 day ago",
      type: "message"
    }
  ]

  const quickActions = [
    { title: "Create New Post", icon: FileText, href: "/posts/new", color: "bg-blue-500" },
    { title: "Upload Image", icon: Image, href: "/gallery/upload", color: "bg-green-500" },
    { title: "Create CBT Test", icon: Activity, href: "/cbt/new", color: "bg-purple-500" },
    { title: "Send SMS", icon: MessageSquare, href: "/sms/send", color: "bg-orange-500" }
  ]

  return (
    <DashboardLayout 
      title="Dashboard"
      breadcrumbs={[{ label: "Dashboard" }]}
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, Bernard!</h2>
            <p className="text-muted-foreground">
              Here's what's happening with your content management system today.
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
            <Button size="sm" className="bg-gradient-primary hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Quick Action
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card hover:shadow-modern transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Quick Actions */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 hover:bg-muted/50"
                  onClick={() => window.location.href = action.href}
                >
                  <div className={`p-2 rounded-lg ${action.color} mr-3`}>
                    <action.icon className="h-4 w-4 text-white" />
                  </div>
                  <span>{action.title}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="glass-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest updates and changes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.title}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="text-xs">
                      {activity.type}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Additional Dashboard Content */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Content Overview</CardTitle>
              <CardDescription>
                Summary of your content library
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Published Posts</span>
                <Badge variant="default">128</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Draft Posts</span>
                <Badge variant="secondary">14</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Gallery Images</span>
                <Badge variant="default">89</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>CBT Tests</span>
                <Badge variant="default">23</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>
                Current system health and performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Database</span>
                <Badge className="bg-green-500">Healthy</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Storage</span>
                <Badge className="bg-green-500">Normal</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>API Status</span>
                <Badge className="bg-green-500">Active</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Backup</span>
                <Badge variant="secondary">Last: 2h ago</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}