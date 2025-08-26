import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { Monitor, MoreVertical, Trash2, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DeviceCardProps {
  device: {
    id: string;
    name: string;
    linkCode: string;
    status: "online" | "offline" | "syncing";
    lastSeen: string;
    location?: string;
  };
}

export function DeviceCard({ device }: DeviceCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-all duration-200 animate-slide-up">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
            <Monitor className="h-5 w-5 text-foreground" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">{device.name}</h3>
            <p className="text-sm text-muted-foreground">Code: {device.linkCode}</p>
            {device.location && (
              <p className="text-xs text-muted-foreground">{device.location}</p>
            )}
          </div>
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
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <StatusBadge status={device.status} />
        <span className="text-xs text-muted-foreground">
          Last seen: {device.lastSeen}
        </span>
      </div>
    </Card>
  );
}