import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.svg";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"request" | "sent">("request");
  const navigate = useNavigate();

  const handleRequestReset = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Reset link sent!",
      description: "Check your email for the reset link.",
    });
    
    setStep("sent");
  };

  if (step === "sent") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center py-8 px-4">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <img src={logo} alt="Logo" className="h-16 mx-auto mb-4" />
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
              <p className="text-muted-foreground mb-6">
                We've sent a reset link to your email.
              </p>
              <Button onClick={() => navigate("/login")} className="w-full">
                Back to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center py-8 px-4">
      <div className="max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <img src={logo} alt="Logo" className="h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground">Forgot Password</h1>
          <p className="text-muted-foreground">Enter your email to reset your password</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleRequestReset} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <Button type="submit" className="w-full h-12 text-base font-medium">
                Send Reset Link
              </Button>

              <div className="text-center">
                <Link 
                  to="/login" 
                  className="text-sm text-primary hover:underline"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};