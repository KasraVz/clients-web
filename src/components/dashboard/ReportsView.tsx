import React, { useState } from 'react';
import { Eye, Download, Send, Share } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Report {
  id: string;
  testDate: string;
  publishDate: string;
  testName: string;
  status: 'Valid' | 'Expired';
  isPurchased: boolean;
}

const reports: Report[] = [
  {
    id: '#00123',
    testDate: '12/03/2025',
    publishDate: '15/03/2025',
    testName: 'FPA',
    status: 'Valid',
    isPurchased: true
  },
  {
    id: '#00124',
    testDate: '18/04/2025',
    publishDate: '20/04/2025',
    testName: 'EEA',
    status: 'Valid',
    isPurchased: true
  },
  {
    id: '#00125',
    testDate: '05/05/2025',
    publishDate: '',
    testName: 'Financial Acumen',
    status: 'Valid',
    isPurchased: false
  }
];

export const ReportsView = () => {
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
    <div className="w-full flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-6xl">
        <TooltipProvider>
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6">Reports</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Test Date</TableHead>
                  <TableHead>Publish Date</TableHead>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Preview</TableHead>
                  <TableHead>Download</TableHead>
                  <TableHead>Send to</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>{report.testDate}</TableCell>
                    <TableCell>{report.publishDate || '-'}</TableCell>
                    <TableCell>{report.testName}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={report.status === 'Valid' ? 'secondary' : 'destructive'}
                        className={report.status === 'Valid' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ActionButton
                        icon={Eye}
                        onClick={() => {}}
                        disabled={!report.isPurchased}
                        tooltipText={!report.isPurchased ? "You haven't purchased this item yet..." : undefined}
                      />
                    </TableCell>
                    <TableCell>
                      <ActionButton
                        icon={Download}
                        onClick={() => {}}
                        disabled={!report.isPurchased}
                        tooltipText={!report.isPurchased ? "You haven't purchased this item yet..." : undefined}
                      />
                    </TableCell>
                    <TableCell>
                      <ActionButton
                        icon={Send}
                        onClick={handleShare}
                        disabled={!report.isPurchased}
                        tooltipText={!report.isPurchased ? "You haven't purchased this item yet..." : undefined}
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
            <DialogTitle>Share Report</DialogTitle>
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