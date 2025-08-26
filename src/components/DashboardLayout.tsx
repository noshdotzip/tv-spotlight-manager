import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Monitor, Users, Settings, BarChart3, LogOut, Menu, Image } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
  currentPage?: string;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: Monitor },
  { name: "Devices", href: "/devices", icon: Monitor },
  { name: "Content", href: "/content", icon: Image },
  { name: "Playlists", href: "/playlists", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function DashboardLayout({ children, currentPage = "Dashboard" }: DashboardLayoutProps) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Monitor className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold">TinyBillboard</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft"></div>
              <span className="text-sm text-muted-foreground">Connected</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col bg-card border-r border-border">
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={currentPage === item.name ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  currentPage === item.name && "bg-primary text-primary-foreground shadow-glow"
                )}
                asChild
              >
                <Link to={item.href}>
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>
          
          <div className="p-4 border-t border-border">
            <Card className="p-3 bg-gradient-subtle">
              <div className="text-sm font-medium text-foreground mb-1">Pro Plan</div>
              <div className="text-xs text-muted-foreground">5 devices connected</div>
              <Button variant="outline" size="sm" className="w-full mt-2">
                Upgrade
              </Button>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}