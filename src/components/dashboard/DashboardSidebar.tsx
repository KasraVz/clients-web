import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface SidebarItem {
  id: string;
  label: string;
  children?: SidebarItem[];
}

interface DashboardSidebarProps {
  onItemSelect: (itemId: string) => void;
  selectedItem: string | null;
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'supsindex-offer',
    label: 'Supsindex Offer',
    children: [
      { id: 'fast-trak', label: 'Fast Trak' },
      { id: 'special-offer', label: 'Special Offer' }
    ]
  },
  {
    id: 'certs-reports',
    label: 'Certs & Reports',
    children: [
      { id: 'reports', label: 'Reports' },
      { id: 'certifications', label: 'Certifications' }
    ]
  }
];

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ onItemSelect, selectedItem }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (item: SidebarItem) => {
    if (item.children) {
      toggleExpanded(item.id);
    } else {
      onItemSelect(item.id);
    }
  };

  const isSelected = (itemId: string) => selectedItem === itemId;
  const isExpanded = (itemId: string) => expandedItems.includes(itemId);

  const renderSidebarItem = (item: SidebarItem, level: number = 0) => (
    <div key={item.id} className="w-full">
      <Button
        variant="ghost"
        onClick={() => handleItemClick(item)}
        className={`w-full justify-start text-left p-3 mb-1 ${
          isSelected(item.id) 
            ? 'bg-primary/10 text-primary shadow-md ring-2 ring-primary/20' 
            : 'hover:bg-muted/50'
        } ${level > 0 ? 'ml-4 text-sm' : 'font-medium'}`}
      >
        {item.children && (
          <span className="mr-2">
            {isExpanded(item.id) ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </span>
        )}
        {item.label}
      </Button>
      
      {item.children && isExpanded(item.id) && (
        <div className="ml-2 border-l border-border/50 pl-2">
          {item.children.map(child => renderSidebarItem(child, level + 1))}
        </div>
      )}
    </div>
  );

  return (
    <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-background shadow-lg p-4 z-40 overflow-y-auto border-r border-border">
      <nav className="space-y-2">
        {sidebarItems.map(item => renderSidebarItem(item))}
      </nav>
    </aside>
  );
};