import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'
import {
  Plus,
  Search,
  Filter,
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Loader2,
  Users as UsersIcon
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { fetchUsers, createUser, updateUser, deleteUser, setFilters } from '@/store/slices/usersSlice'

export default function Users() {
  const dispatch = useAppDispatch()
  const { users, loading, error, pagination, filters } = useAppSelector((state) => state.users)
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    _id: '',
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    role: 'user' as 'admin' | 'editor' | 'user',
    profile: '',
    job: '',
    town: '',
    password: '',
    amountBalance: 0,
    date: '',
    token: '',
  })

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: 10 }))
  }, [dispatch])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    dispatch(setFilters({ search: value }))
    dispatch(fetchUsers({
      page: 1,
      limit: 10,
      search: value,
      role: filters.role,
      status: filters.status
    }))
  }

  const handleCreateUser = async () => {
    if (!newUser.username || !newUser.email || !newUser.firstname || !newUser.lastname) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      await dispatch(createUser(newUser)).unwrap()
      toast.success('User created successfully')
      setIsCreateOpen(false)
      setNewUser({
        _id: '',
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        role: 'user' as 'admin' | 'editor' | 'user',
        profile: '',
        job: '',
        town: '',
        password: '',
        amountBalance: 0,
        date: '',
        token: '',
      })
    } catch (error) {
      toast.error('Failed to create user')
    }
  }

  const handleDeleteUser = async (id: string) => {
    try {
      await dispatch(deleteUser(id)).unwrap()
      toast.success('User deleted successfully')
    } catch (error) {
      toast.error('Failed to delete user')
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500'
      case 'editor':
        return 'bg-blue-500'
      case 'user':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <DashboardLayout
      title="Users"
      breadcrumbs={[{ label: "Users" }]}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">User Management</h2>
            <p className="text-muted-foreground">
              Manage system users and their permissions
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstname">First Name *</Label>
                      <Input
                        id="firstname"
                        value={newUser.firstname}
                        onChange={(e) => setNewUser({ ...newUser, firstname: e.target.value })}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastname">Last Name *</Label>
                      <Input
                        id="lastname"
                        value={newUser.lastname}
                        onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })}
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="username">Username *</Label>
                    <Input
                      id="username"
                      value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                      placeholder="Enter username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="Enter email town"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Select value={newUser.role} onValueChange={(value: 'admin' | 'editor' | 'user') => setNewUser({ ...newUser, role: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="job">Job</Label>
                      <Input
                        id="job"
                        value={newUser.job}
                        onChange={(e) => setNewUser({ ...newUser, job: e.target.value })}
                        placeholder="Enter job"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="town">town</Label>
                    <Input
                      id="town"
                      value={newUser.town}
                      onChange={(e) => setNewUser({ ...newUser, town: e.target.value })}
                      placeholder="Enter town"
                    />
                  </div>
                  <Button
                    onClick={handleCreateUser}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create User
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <UsersIcon className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-xl font-bold">{users.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <User className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-xl font-bold">{users.filter(u => u.amountBalance > 0).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <User className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Admins</p>
                  <p className="text-xl font-bold">{users.filter(u => u.role === 'admin').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <User className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Editors</p>
                  <p className="text-xl font-bold">{users.filter(u => u.role === 'editor').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <Card key={user._id} className="glass-card hover:shadow-modern transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.profile} />
                      <AvatarFallback>
                        {user.firstname[0]}{user.lastname[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold">
                            {user.firstname} {user.lastname}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            @{user.username}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={`${getRoleColor(user.role)} text-white`}>
                            {user.role}
                          </Badge>
                          <Badge variant={user.amountBalance > 0 ? 'default' : 'secondary'}>
                            {user.amountBalance > 0 ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </span>
                        {user.job && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {user.job}
                          </span>
                        )}
                        {user.town && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {user.town}
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Created: {new Date(user.date).toLocaleDateString()}
                        {user.birthday && (
                          <span className="ml-4">
                            Birthday: {new Date(user.birthday).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" title="Edit user">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-destructive"
                        onClick={() => handleDeleteUser(user._id)}
                        title="Delete user"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}