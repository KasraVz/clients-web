import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const FastTrakView = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-8" style={{ paddingLeft: '248px' }}>
      <div className="w-full max-w-2xl">
        <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Fast Trak Tour</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-muted-foreground leading-relaxed">
            The Fast Trak Tour is an accelerated learning experience designed to get you up to speed 
            quickly with our platform and certification processes. This comprehensive tour covers all 
            essential features, best practices, and shortcuts to help you maximize your success in the 
            shortest time possible.
          </p>
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Interactive platform walkthrough</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Exam preparation strategies</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Certification roadmap guidance</span>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};