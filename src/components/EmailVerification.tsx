import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";

export const EmailVerification = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const email = sessionStorage.getItem("userEmail");

  const handleVerify = () => {
    if (code.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter a 6-digit code",
        variant: "destructive",
      });
      return;
    }

    // Simulate verification
    toast({
      title: "Email verified!",
      description: "Your email has been successfully verified.",
    });
    
    navigate("/register");
  };

  const handleResend = () => {
    toast({
      title: "Code resent",
      description: "A new verification code has been sent to your email.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
            <p className="text-muted-foreground mb-2">
              We sent a code to your email.
            </p>
            <p className="text-muted-foreground mb-6">
              Please enter it here.
            </p>
            {email && (
              <p className="text-sm text-primary font-medium">
                {email}
              </p>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex justify-center">
              <InputOTP 
                maxLength={6} 
                value={code} 
                onChange={setCode}
                className="gap-2"
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot index={0} className="w-12 h-12 text-lg font-semibold" />
                  <InputOTPSlot index={1} className="w-12 h-12 text-lg font-semibold" />
                  <InputOTPSlot index={2} className="w-12 h-12 text-lg font-semibold" />
                  <InputOTPSlot index={3} className="w-12 h-12 text-lg font-semibold" />
                  <InputOTPSlot index={4} className="w-12 h-12 text-lg font-semibold" />
                  <InputOTPSlot index={5} className="w-12 h-12 text-lg font-semibold" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button 
              onClick={handleVerify}
              className="w-full h-12 text-base font-medium"
              disabled={code.length !== 6}
            >
              Verify Code
            </Button>

            <div className="text-center">
              <button
                onClick={handleResend}
                className="text-sm text-primary hover:underline transition-colors"
              >
                Didn't receive the code? Resend
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};