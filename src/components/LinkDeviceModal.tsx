import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Smartphone } from "lucide-react";

interface LinkDeviceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LinkDeviceModal({ open, onOpenChange }: LinkDeviceModalProps) {
  const [linkCode, setLinkCode] = useState("");
  const [deviceName, setDeviceName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would link the device
    console.log("Linking device:", { linkCode, deviceName });
    onOpenChange(false);
    setLinkCode("");
    setDeviceName("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5 text-primary" />
            <span>Link New Device</span>
          </DialogTitle>
          <DialogDescription>
            Enter the link code displayed on your Roku or Fire TV device to connect it to your dashboard.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="linkCode">Device Link Code</Label>
            <Input
              id="linkCode"
              placeholder="Enter 6-digit code"
              value={linkCode}
              onChange={(e) => setLinkCode(e.target.value)}
              maxLength={6}
              className="text-center text-lg font-mono tracking-widest"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deviceName">Device Name (Optional)</Label>
            <Input
              id="deviceName"
              placeholder="e.g., Store Front Display"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={linkCode.length !== 6}>
              Link Device
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}