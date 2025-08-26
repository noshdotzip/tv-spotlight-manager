import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Image, Video, MoreVertical, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PlaylistCardProps {
  playlist: {
    id: string;
    name: string;
    dayOfWeek: string;
    itemCount: number;
    duration: number; // seconds per image
    lastUpdated: string;
    isEvent?: boolean;
    isActive?: boolean;
  };
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  const formatDuration = (seconds: number) => {
    return `${seconds}s per image`;
  };

  return (
    <Card className="p-4 hover:shadow-md transition-all duration-200 animate-slide-up">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-foreground">{playlist.name}</h3>
            {playlist.isEvent && (
              <Badge variant="destructive" className="text-xs">Event</Badge>
            )}
            {playlist.isActive && (
              <Badge variant="default" className="text-xs">Active</Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{playlist.dayOfWeek}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Image className="h-3 w-3" />
              <span>{playlist.itemCount} items</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{formatDuration(playlist.duration)}</span>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Updated: {playlist.lastUpdated}
          </p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}