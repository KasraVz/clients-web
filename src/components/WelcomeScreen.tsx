import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import logoSvg from "@/assets/logo.svg";

export const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <img src={logoSvg} alt="Suspindex" className="h-20" />
            </div>
            
            <div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Welcome to Suspindex
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The premier platform for startup founders and entrepreneurs. Connect with millions of top founders, get certified, and accelerate your startup journey.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <Button 
                onClick={() => navigate("/email-registry")}
                className="w-full h-12 text-base font-medium"
                size="lg"
              >
                Get Started
              </Button>
              
              <Button 
                onClick={() => navigate("/login")}
                variant="outline" 
                className="w-full h-12 text-base font-medium"
                size="lg"
              >
                Already have an account? Login
              </Button>
            </div>

            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Join thousands of successful founders who have accelerated their startup journey with our certification program.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};