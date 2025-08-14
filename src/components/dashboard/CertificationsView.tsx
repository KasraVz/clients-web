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
        className="h-8 w-8"
      >
        <Icon className="h-4 w-4" />
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
    <div className="w-full">
      <div className="w-full max-w-4xl mx-auto px-4">
        <TooltipProvider>
      <Card className="shadow-lg">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-4">Certifications</h2>
          <div className="w-full">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-xs">ID</TableHead>
                  <TableHead className="w-20 text-xs">Date</TableHead>
                  <TableHead className="flex-1 text-xs">Name</TableHead>
                  <TableHead className="w-16 text-xs">Status</TableHead>
                  <TableHead className="w-12 text-xs">View</TableHead>
                  <TableHead className="w-12 text-xs">Get</TableHead>
                  <TableHead className="w-12 text-xs">Share</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certifications.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell className="font-mono text-xs p-2">{cert.id.replace('#CERT-', '')}</TableCell>
                    <TableCell className="text-xs p-2">{cert.testDate}</TableCell>
                    <TableCell className="font-medium text-xs p-2">{cert.testName}</TableCell>
                    <TableCell className="p-2">
                      <Badge 
                        variant={cert.status === 'Valid' ? 'secondary' : 'destructive'}
                        className={`text-xs px-1 py-0 ${cert.status === 'Valid' ? 'bg-green-100 text-green-800' : ''}`}
                      >
                        {cert.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="p-1">
                      <ActionButton
                        icon={Eye}
                        onClick={() => {}}
                        disabled={!cert.isPurchased}
                        tooltipText={!cert.isPurchased ? "You haven't purchased this item yet..." : undefined}
                      />
                    </TableCell>
                    <TableCell className="p-1">
                      <ActionButton
                        icon={Download}
                        onClick={() => {}}
                        disabled={!cert.isPurchased}
                        tooltipText={!cert.isPurchased ? "You haven't purchased this item yet..." : undefined}
                      />
                    </TableCell>
                    <TableCell className="p-1">
                      <ActionButton
                        icon={Share}
                        onClick={handleShare}
                        disabled={!cert.isPurchased}
                        tooltipText={!cert.isPurchased ? "You haven't purchased this item yet..." : undefined}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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