import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { 
  Upload, 
  Search, 
  Filter,
  Image as ImageIcon,
  Grid3X3,
  List,
  MoreHorizontal,
  Trash2,
  Edit,
  Eye,
  Loader2
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { fetchMediaItems, uploadMediaItem, updateMediaItem, deleteMediaItem, setFilters } from '@/store/slices/gallerySlice'

export default function Gallery() {
  const dispatch = useAppDispatch()
  const { mediaItems, loading, uploading, error, pagination, filters } = useAppSelector((state) => state.gallery)
  const [searchQuery, setSearchQuery] = useState('')
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [uploadData, setUploadData] = useState({
    file: null as File | null,
    name: '',
    alt: '',
    caption: '',
    folder: ''
  })

  useEffect(() => {
    dispatch(fetchMediaItems({ page: 1, limit: 20 }))
  }, [dispatch])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    dispatch(setFilters({ search: value }))
    dispatch(fetchMediaItems({ 
      page: 1, 
      limit: 20, 
      search: value,
      type: filters.type,
      folder: filters.folder 
    }))
  }

  const handleUpload = async () => {
    if (!uploadData.file) {
      toast.error('Please select a file to upload')
      return
    }

    try {
      await dispatch(uploadMediaItem({
        file: uploadData.file,
        name: uploadData.name || uploadData.file.name,
        alt: uploadData.alt,
        caption: uploadData.caption,
        folder: uploadData.folder
      })).unwrap()
      
      toast.success('Media uploaded successfully')
      setIsUploadOpen(false)
      setUploadData({ file: null, name: '', alt: '', caption: '', folder: '' })
    } catch (error) {
      toast.error('Failed to upload media')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteMediaItem(id)).unwrap()
      toast.success('Media deleted successfully')
    } catch (error) {
      toast.error('Failed to delete media')
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <DashboardLayout 
      title="Gallery"
      breadcrumbs={[{ label: "Gallery" }]}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Media Gallery</h2>
            <p className="text-muted-foreground">
              Manage and organize your media files
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Files
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Media</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="file">File</Label>
                    <Input
                      id="file"
                      type="file"
                      accept="image/*,video/*,.pdf,.doc,.docx"
                      onChange={(e) => setUploadData({ ...uploadData, file: e.target.files?.[0] || null })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="name">Name (optional)</Label>
                    <Input
                      id="name"
                      value={uploadData.name}
                      onChange={(e) => setUploadData({ ...uploadData, name: e.target.value })}
                      placeholder="Custom name for the file"
                    />
                  </div>
                  <div>
                    <Label htmlFor="alt">Alt Text (for images)</Label>
                    <Input
                      id="alt"
                      value={uploadData.alt}
                      onChange={(e) => setUploadData({ ...uploadData, alt: e.target.value })}
                      placeholder="Alternative text for accessibility"
                    />
                  </div>
                  <div>
                    <Label htmlFor="caption">Caption</Label>
                    <Textarea
                      id="caption"
                      value={uploadData.caption}
                      onChange={(e) => setUploadData({ ...uploadData, caption: e.target.value })}
                      placeholder="Caption or description"
                    />
                  </div>
                  <div>
                    <Label htmlFor="folder">Folder</Label>
                    <Input
                      id="folder"
                      value={uploadData.folder}
                      onChange={(e) => setUploadData({ ...uploadData, folder: e.target.value })}
                      placeholder="Folder name (optional)"
                    />
                  </div>
                  <Button 
                    onClick={handleUpload} 
                    disabled={uploading || !uploadData.file}
                    className="w-full"
                  >
                    {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Upload
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search and View Options */}
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search media files..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mediaItems.map((item) => (
              <Card key={item.id} className="glass-card hover:shadow-modern transition-all duration-300 group">
                <CardContent className="p-4">
                  <div className="aspect-square bg-muted/30 rounded-lg mb-4 flex items-center justify-center group-hover:bg-muted/50 transition-colors">
                    {item.type === 'image' ? (
                      <img 
                        src={item.thumbnailUrl || item.url} 
                        alt={item.alt || item.name}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement
                          target.style.display = 'none'
                          const sibling = target.nextElementSibling as HTMLElement
                          if (sibling) sibling.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div className="w-full h-full flex items-center justify-center" style={{ display: item.type === 'image' ? 'none' : 'flex' }}>
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium truncate" title={item.name}>{item.name}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{formatFileSize(item.size)}</span>
                      <Badge variant="secondary" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <Button variant="ghost" size="sm" onClick={() => window.open(item.url, '_blank')}>
                      <Eye className="mr-1 h-3 w-3" />
                      View
                    </Button>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(item.id)}
                        className="hover:text-destructive"
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

        {/* Upload Area */}
        <Card className="glass-card border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Upload Media Files</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop your files here, or click to browse
                </p>
              </div>
              <Button className="bg-gradient-primary hover:opacity-90">
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}