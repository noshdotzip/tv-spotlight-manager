import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Upload, Image, Video, FileText, Trash2, Eye, Download } from "lucide-react";

export default function Content() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  // Mock data - will come from Supabase storage
  const content = [
    {
      id: "1",
      name: "Summer Sale Banner",
      type: "image" as const,
      size: "2.4 MB",
      duration: null,
      uploadedAt: "2 hours ago",
      url: "/placeholder.svg"
    },
    {
      id: "2",
      name: "Product Demo Video",
      type: "video" as const,
      size: "15.2 MB",
      duration: "00:45",
      uploadedAt: "1 day ago",
      url: "/placeholder.svg"
    },
    {
      id: "3",
      name: "Holiday Promotion",
      type: "image" as const,
      size: "1.8 MB",
      duration: null,
      uploadedAt: "3 days ago",
      url: "/placeholder.svg"
    },
    {
      id: "4",
      name: "Store Hours Notice",
      type: "image" as const,
      size: "0.9 MB",
      duration: null,
      uploadedAt: "1 week ago",
      url: "/placeholder.svg"
    }
  ];

  const filteredContent = content.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === "all" || item.type === selectedTab;
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: content.length,
    images: content.filter(c => c.type === 'image').length,
    videos: content.filter(c => c.type === 'video').length,
    totalSize: "19.3 MB"
  };

  return (
    <DashboardLayout currentPage="Content">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Content Library</h1>
            <p className="text-muted-foreground">Upload and manage your digital signage content</p>
          </div>
          <Button className="shadow-glow">
            <Upload className="h-4 w-4 mr-2" />
            Upload Content
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-subtle">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Files</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-subtle">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Image className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.images}</p>
                <p className="text-sm text-muted-foreground">Images</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-subtle">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Video className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.videos}</p>
                <p className="text-sm text-muted-foreground">Videos</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-subtle">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.totalSize}</p>
                <p className="text-sm text-muted-foreground">Total Size</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="image">Images</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
          </TabsList>
          
          <TabsContent value={selectedTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredContent.map((item) => (
                <Card key={item.id} className="group hover:shadow-md transition-all duration-200">
                  <div className="aspect-[9/16] bg-muted rounded-t-lg overflow-hidden relative">
                    <img 
                      src={item.url} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Video className="h-8 w-8 text-white" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <Badge variant={item.type === 'video' ? 'default' : 'secondary'}>
                        {item.type === 'video' ? 'Video' : 'Image'}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                    <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                      <span>{item.size}</span>
                      {item.duration && <span>{item.duration}</span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{item.uploadedAt}</p>
                  </div>
                </Card>
              ))}
            </div>

            {filteredContent.length === 0 && (
              <Card className="p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No content found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? "Try adjusting your search terms" : "Upload your first piece of content to get started"}
                </p>
                {!searchQuery && (
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Content
                  </Button>
                )}
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}