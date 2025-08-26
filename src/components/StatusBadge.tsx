import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "online" | "offline" | "syncing";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    online: {
      color: "bg-success",
      text: "Online",
      textColor: "text-success"
    },
    offline: {
      color: "bg-muted-foreground",
      text: "Offline",
      textColor: "text-muted-foreground"
    },
    syncing: {
      color: "bg-warning",
      text: "Syncing",
      textColor: "text-warning"
    }
  };

  const config = statusConfig[status];

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className={cn("w-2 h-2 rounded-full", config.color, status === "online" && "animate-pulse-soft")} />
      <span className={cn("text-sm font-medium", config.textColor)}>{config.text}</span>
    </div>
  );
}