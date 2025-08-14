import React, { useState } from 'react';
import { Eye, Download, Share } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Send } from 'lucide-react';

interface Certification {
  id: string;
  testDate: string;
  testName: string;
  status: 'Valid' | 'Expired';
  isPurchased: boolean;
}

const certifications: Certification[] = [
  {
    id: '#CERT-987',
    testDate: '12/03/2025',
    testName: 'FPA',
    status: 'Valid',
    isPurchased: true
  },
  {
    id: '#CERT-988',
    testDate: '18/04/2025',
    testName: 'EEA',
    status: 'Valid',
    isPurchased: true
  },
  {
    id: '#CERT-989',
    testDate: '05/05/2025',
    testName: 'Financial Acumen',
    status: 'Expired',
    isPurchased: false
  }
];

export const CertificationsView = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const ActionButton = ({ 
    icon: Icon, 
    onClick, 
    disabled, 
    tooltipText 
  }: {
    icon: any;
    onClick: () => void;
    disabled: boolean;
    tooltipText?: string;
  }) => {
    const button = (
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        disabled={disabled}
        className="h-6 w-6 p-0"
      >
        <Icon className="h-3 w-3" />
      </Button>
    );

    if (disabled && tooltipText) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-block cursor-not-allowed">
              {button}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    return button;
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="w-full max-w-full mx-auto px-2">
        <TooltipProvider>
      <Card className="shadow-lg">
        <CardContent className="p-2">
          <h2 className="text-lg font-bold mb-2">Certifications</h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex items-center justify-between bg-muted/20 rounded p-2 text-xs">
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-xs truncate">{cert.id.replace('#CERT-', '')}</div>
                  <div className="text-xs text-muted-foreground">{cert.testDate.replace('/2025', '')}</div>
                </div>
                <div className="flex-1 min-w-0 px-2">
                  <div className="font-medium text-xs truncate">{cert.testName}</div>
                  <Badge 
                    variant={cert.status === 'Valid' ? 'secondary' : 'destructive'}
                    className={`text-xs px-1 py-0 h-4 mt-1 ${cert.status === 'Valid' ? 'bg-green-100 text-green-800' : ''}`}
                  >
                    {cert.status === 'Valid' ? '✓' : '✗'}
                  </Badge>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <ActionButton
                    icon={Eye}
                    onClick={() => {}}
                    disabled={!cert.isPurchased}
                    tooltipText={!cert.isPurchased ? "Not purchased" : undefined}
                  />
                  <ActionButton
                    icon={Download}
                    onClick={() => {}}
                    disabled={!cert.isPurchased}
                    tooltipText={!cert.isPurchased ? "Not purchased" : undefined}
                  />
                  <ActionButton
                    icon={Share}
                    onClick={handleShare}
                    disabled={!cert.isPurchased}
                    tooltipText={!cert.isPurchased ? "Not purchased" : undefined}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Certification</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Share className="w-4 h-4" />
                Twitter
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share className="w-4 h-4" />
                LinkedIn
              </Button>
            </div>
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Send className="w-4 h-4" />
              Email
            </Button>
          </div>
        </DialogContent>
      </Dialog>
        </TooltipProvider>
      </div>
    </div>
  );
};