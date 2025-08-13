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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {button}
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return button;
  };

  return (
    <>
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6">Certifications</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cert ID</TableHead>
                  <TableHead>Test Date</TableHead>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Preview</TableHead>
                  <TableHead>Download</TableHead>
                  <TableHead>Share to</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certifications.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell className="font-medium">{cert.id}</TableCell>
                    <TableCell>{cert.testDate}</TableCell>
                    <TableCell>{cert.testName}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={cert.status === 'Valid' ? 'secondary' : 'destructive'}
                        className={cert.status === 'Valid' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {cert.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ActionButton
                        icon={Eye}
                        onClick={() => {}}
                        disabled={!cert.isPurchased}
                        tooltipText={!cert.isPurchased ? "You haven't purchased this item yet..." : undefined}
                      />
                    </TableCell>
                    <TableCell>
                      <ActionButton
                        icon={Download}
                        onClick={() => {}}
                        disabled={!cert.isPurchased}
                        tooltipText={!cert.isPurchased ? "You haven't purchased this item yet..." : undefined}
                      />
                    </TableCell>
                    <TableCell>
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
    </>
  );
};