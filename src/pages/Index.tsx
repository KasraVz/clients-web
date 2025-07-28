import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const email = sessionStorage.getItem("userEmail");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
            Welcome to the Network!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center space-y-6">
          <div>
            <p className="text-muted-foreground mb-2">
              Congratulations! You've successfully joined our startup networking platform.
            </p>
            {email && (
              <p className="text-sm text-primary font-medium">
                {email}
              </p>
            )}
          </div>
          
          <div className="space-y-4">
            <Button className="w-full" size="lg">
              Explore Network
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              Complete Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
