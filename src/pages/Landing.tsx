import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Monitor, Zap, Users, Shield } from "lucide-react";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleAuth = async (type: 'signin' | 'signup') => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = type === 'signin' 
      ? await signIn(email, password)
      : await signUp(email, password);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else if (type === 'signup') {
      toast({
        title: "Success",
        description: "Please check your email to confirm your account",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Monitor className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">TinyBillboard</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                Digital Signage Made <span className="text-primary">Simple</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Transform any Roku or Fire TV into a powerful digital display. 
                Upload content, create playlists, and manage everything from one dashboard.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Instant Setup</h3>
                  <p className="text-sm text-muted-foreground">Ready in minutes</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Multi-Device</h3>
                  <p className="text-sm text-muted-foreground">Unlimited screens</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Monitor className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Smart Playlists</h3>
                  <p className="text-sm text-muted-foreground">Schedule by day</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Secure</h3>
                  <p className="text-sm text-muted-foreground">Enterprise grade</p>
                </div>
              </div>
            </div>
          </div>

          {/* Auth Section */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md p-6 bg-card border-border">
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button 
                    className="w-full shadow-glow" 
                    onClick={() => handleAuth('signin')}
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Choose a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button 
                    className="w-full shadow-glow" 
                    onClick={() => handleAuth('signup')}
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </TabsContent>
              </Tabs>
              
              {/* Admin Login Note */}
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  Admin access: nosh / 0129
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}