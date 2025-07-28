import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

export const SecureAccount = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
  };

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumbers && hasSymbols && hasMinLength;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwords.oldPassword || !passwords.newPassword || !passwords.confirmPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all password fields",
        variant: "destructive",
      });
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirm password must match",
        variant: "destructive",
      });
      return;
    }

    if (!validatePassword(passwords.newPassword)) {
      toast({
        title: "Weak password",
        description: "Password must meet all requirements",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password updated!",
      description: "Your account has been secured successfully.",
    });
    
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Secure Your Account</DialogTitle>
          <p className="text-center text-muted-foreground">
            We sent you a system-generated password. Please enter it and change it to a new one.
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="oldPassword">Old Password</Label>
            <Input
              id="oldPassword"
              type="password"
              value={passwords.oldPassword}
              onChange={(e) => handlePasswordChange("oldPassword", e.target.value)}
              placeholder="Enter the password we sent you"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={passwords.newPassword}
              onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
              placeholder="Enter your new password"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={passwords.confirmPassword}
              onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
              placeholder="Confirm your new password"
              required
            />
          </div>

          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Password Requirements:</strong><br />
              Use a strong password with at least 8 characters, including uppercase, lowercase, numbers, and symbols.
            </p>
          </div>

          <Button type="submit" className="w-full">
            Update Password
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};