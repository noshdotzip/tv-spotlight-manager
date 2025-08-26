import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { User, Bell, Shield, CreditCard, Save } from "lucide-react";

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Mock settings state
  const [settings, setSettings] = useState({
    profile: {
      name: "John Doe",
      email: user?.email || "",
      company: "My Business",
      timezone: "America/New_York"
    },
    notifications: {
      deviceOffline: true,
      contentUpdates: false,
      weeklyReports: true,
      systemAlerts: true
    },
    display: {
      defaultDuration: 5,
      autoRefresh: true,
      lowQuality: false,
      emergencyOverride: true
    }
  });

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
    setLoading(false);
  };

  return (
    <DashboardLayout currentPage="Settings">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
          <Button onClick={handleSave} disabled={loading} className="shadow-glow">
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="display">Display</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6 mt-6">
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <User className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Profile Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={settings.profile.name}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      profile: { ...prev.profile, name: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      profile: { ...prev.profile, email: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={settings.profile.company}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      profile: { ...prev.profile, company: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input
                    id="timezone"
                    value={settings.profile.timezone}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      profile: { ...prev.profile, timezone: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Bell className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Notification Preferences</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Device Offline Alerts</h3>
                    <p className="text-sm text-muted-foreground">Get notified when devices go offline</p>
                  </div>
                  <Switch
                    checked={settings.notifications.deviceOffline}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, deviceOffline: checked }
                    }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Content Updates</h3>
                    <p className="text-sm text-muted-foreground">Notifications for content changes</p>
                  </div>
                  <Switch
                    checked={settings.notifications.contentUpdates}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, contentUpdates: checked }
                    }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Weekly Reports</h3>
                    <p className="text-sm text-muted-foreground">Receive weekly usage reports</p>
                  </div>
                  <Switch
                    checked={settings.notifications.weeklyReports}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, weeklyReports: checked }
                    }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">System Alerts</h3>
                    <p className="text-sm text-muted-foreground">Important system notifications</p>
                  </div>
                  <Switch
                    checked={settings.notifications.systemAlerts}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, systemAlerts: checked }
                    }))}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="display" className="space-y-6 mt-6">
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Display Settings</h2>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="duration">Default Slide Duration (seconds)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    max="60"
                    value={settings.display.defaultDuration}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      display: { ...prev.display, defaultDuration: parseInt(e.target.value) || 5 }
                    }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto Refresh</h3>
                    <p className="text-sm text-muted-foreground">Automatically refresh content</p>
                  </div>
                  <Switch
                    checked={settings.display.autoRefresh}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      display: { ...prev.display, autoRefresh: checked }
                    }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Low Quality Mode</h3>
                    <p className="text-sm text-muted-foreground">Reduce quality for better performance</p>
                  </div>
                  <Switch
                    checked={settings.display.lowQuality}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      display: { ...prev.display, lowQuality: checked }
                    }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Emergency Override</h3>
                    <p className="text-sm text-muted-foreground">Allow emergency content override</p>
                  </div>
                  <Switch
                    checked={settings.display.emergencyOverride}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      display: { ...prev.display, emergencyOverride: checked }
                    }))}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6 mt-6">
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Security</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Change Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button variant="outline">Update Password</Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}