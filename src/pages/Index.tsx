import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DeviceCard } from "@/components/DeviceCard";
import { PlaylistCard } from "@/components/PlaylistCard";
import { LinkDeviceModal } from "@/components/LinkDeviceModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Monitor, Image, Calendar, Users, AlertCircle, Save, RefreshCw } from "lucide-react";

const Index = () => {
  const [linkDeviceOpen, setLinkDeviceOpen] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(false);

  // Mock data - this will come from your database
  const devices = [
    {
      id: "1",
      name: "Store Front Display",
      linkCode: "ABC123",
      status: "online" as const,
      lastSeen: "2 minutes ago",
      location: "Main Store"
    },
    {
      id: "2",
      name: "Back Office Screen",
      linkCode: "DEF456",
      status: "offline" as const,
      lastSeen: "1 hour ago",
      location: "Office"
    },
    {
      id: "3",
      name: "Lobby Display",
      linkCode: "GHI789",
      status: "syncing" as const,
      lastSeen: "Just now",
      location: "Lobby"
    }
  ];

  const playlists = [
    {
      id: "1",
      name: "Monday Specials",
      dayOfWeek: "Monday",
      itemCount: 8,
      duration: 5,
      lastUpdated: "2 hours ago",
      isActive: true
    },
    {
      id: "2",
      name: "Weekend Promotions",
      dayOfWeek: "Saturday",
      itemCount: 12,
      duration: 7,
      lastUpdated: "1 day ago"
    },
    {
      id: "3",
      name: "Holiday Event",
      dayOfWeek: "Special Event",
      itemCount: 15,
      duration: 4,
      lastUpdated: "3 hours ago",
      isEvent: true
    }
  ];

  const stats = [
    { label: "Active Devices", value: "2", icon: Monitor, color: "text-success" },
    { label: "Total Content", value: "47", icon: Image, color: "text-primary" },
    { label: "Playlists", value: "7", icon: Calendar, color: "text-warning" },
    { label: "This Month Views", value: "12.4K", icon: Users, color: "text-primary" }
  ];

  return (
    <DashboardLayout currentPage="Dashboard">
      <div className="p-6 space-y-6">
        {/* Header with Save Changes */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Manage your digital signage network</p>
          </div>
          
          {pendingChanges && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-warning">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Unsaved changes</span>
              </div>
              <Button 
                onClick={() => setPendingChanges(false)}
                className="shadow-glow"
              >
                <Save className="h-4 w-4 mr-2" />
                Save & Publish
              </Button>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4 bg-gradient-subtle hover:shadow-md transition-all duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setLinkDeviceOpen(true)} className="shadow-glow">
            <Plus className="h-4 w-4 mr-2" />
            Link Device
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New Playlist
          </Button>
          <Button variant="outline">
            <Image className="h-4 w-4 mr-2" />
            Upload Content
          </Button>
          <Button variant="ghost" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Status
          </Button>
        </div>

        {/* Connected Devices */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Connected Devices</h2>
            <Badge variant="outline" className="text-xs">
              {devices.filter(d => d.status === 'online').length} of {devices.length} online
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devices.map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        </div>

        {/* Recent Playlists */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Recent Playlists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </div>

        {/* Admin Info */}
        <Card className="p-4 bg-gradient-dark border-primary/20">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Setup Required</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            To enable device linking, content management, and user authentication, you'll need to set up the backend services. 
            Check the setup.txt file in your project for detailed instructions.
          </p>
          <div className="text-xs text-muted-foreground">
            <strong>Admin Access:</strong> Username: nosh | Password: 0129
          </div>
        </Card>
      </div>

      <LinkDeviceModal open={linkDeviceOpen} onOpenChange={setLinkDeviceOpen} />
    </DashboardLayout>
  );
};

export default Index;
