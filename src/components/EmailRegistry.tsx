import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.svg";

export const EmailRegistry = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    // Save email for later use
    sessionStorage.setItem("userEmail", email);
    
    toast({
      title: "Verification code sent!",
      description: "Please check your email for the verification code.",
    });
    
    navigate("/email-verification");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center py-8 px-4">
      <div className="max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <img src={logo} alt="Logo" className="h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground">Get Started</h1>
          <p className="text-muted-foreground">Enter your email to begin registration</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Email Registration</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <Button type="submit" className="w-full h-12 text-base font-medium">
                Send Verification Code
              </Button>
            </form>
            
            <div className="text-center mt-4 p-6 pt-0">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="text-primary hover:underline font-medium"
                >
                  Login here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};