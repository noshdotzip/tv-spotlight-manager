import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DeviceCard } from "@/components/DeviceCard";
import { LinkDeviceModal } from "@/components/LinkDeviceModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, RefreshCw, Monitor } from "lucide-react";

export default function Devices() {
  const [linkDeviceOpen, setLinkDeviceOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - will come from Supabase
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
    },
    {
      id: "4",
      name: "Waiting Room TV",
      linkCode: "JKL012",
      status: "online" as const,
      lastSeen: "5 minutes ago",
      location: "Waiting Area"
    }
  ];

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.linkCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineDevices = devices.filter(d => d.status === 'online').length;

  return (
    <DashboardLayout currentPage="Devices">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Devices</h1>
            <p className="text-muted-foreground">Manage your connected displays</p>
          </div>
          <Button onClick={() => setLinkDeviceOpen(true)} className="shadow-glow">
            <Plus className="h-4 w-4 mr-2" />
            Link Device
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-gradient-subtle">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Monitor className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{onlineDevices}</p>
                <p className="text-sm text-muted-foreground">Online Devices</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-subtle">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Monitor className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{devices.length}</p>
                <p className="text-sm text-muted-foreground">Total Devices</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-subtle">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Monitor className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{devices.length - onlineDevices}</p>
                <p className="text-sm text-muted-foreground">Offline Devices</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search devices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-xs">
              {onlineDevices} of {devices.length} online
            </Badge>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Status
            </Button>
          </div>
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDevices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>

        {filteredDevices.length === 0 && (
          <Card className="p-8 text-center">
            <Monitor className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No devices found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Try adjusting your search terms" : "Link your first device to get started"}
            </p>
            {!searchQuery && (
              <Button onClick={() => setLinkDeviceOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Link Device
              </Button>
            )}
          </Card>
        )}
      </div>

      <LinkDeviceModal open={linkDeviceOpen} onOpenChange={setLinkDeviceOpen} />
    </DashboardLayout>
  );
}