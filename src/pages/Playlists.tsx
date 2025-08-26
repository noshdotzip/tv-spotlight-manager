import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PlaylistCard } from "@/components/PlaylistCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Calendar, Clock, Play } from "lucide-react";

export default function Playlists() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Mock data - will come from Supabase
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
    },
    {
      id: "4",
      name: "Tuesday Deals",
      dayOfWeek: "Tuesday",
      itemCount: 6,
      duration: 8,
      lastUpdated: "5 hours ago"
    },
    {
      id: "5",
      name: "Wednesday Highlights",
      dayOfWeek: "Wednesday",
      itemCount: 10,
      duration: 6,
      lastUpdated: "1 day ago"
    },
    {
      id: "6",
      name: "Weekend Sale",
      dayOfWeek: "Sunday",
      itemCount: 14,
      duration: 5,
      lastUpdated: "2 days ago"
    }
  ];

  const filteredPlaylists = playlists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.dayOfWeek.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: playlists.length,
    active: playlists.filter(p => p.isActive).length,
    events: playlists.filter(p => p.isEvent).length,
    avgDuration: Math.round(playlists.reduce((acc, p) => acc + p.duration, 0) / playlists.length)
  };

  return (
    <DashboardLayout currentPage="Playlists">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Playlists</h1>
            <p className="text-muted-foreground">Create and manage content schedules</p>
          </div>
          <Button onClick={() => navigate('/playlists/new')} className="shadow-glow">
            <Plus className="h-4 w-4 mr-2" />
            New Playlist
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-subtle">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Playlists</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-subtle">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Play className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.active}</p>
                <p className="text-sm text-muted-foreground">Active Today</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-subtle">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.events}</p>
                <p className="text-sm text-muted-foreground">Special Events</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-subtle">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.avgDuration}s</p>
                <p className="text-sm text-muted-foreground">Avg Duration</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search playlists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-xs">
              {stats.active} active today
            </Badge>
          </div>
        </div>

        {/* Playlists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>

        {filteredPlaylists.length === 0 && (
          <Card className="p-8 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No playlists found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Try adjusting your search terms" : "Create your first playlist to get started"}
            </p>
            {!searchQuery && (
              <Button onClick={() => navigate('/playlists/new')}>
                <Plus className="h-4 w-4 mr-2" />
                New Playlist
              </Button>
            )}
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}