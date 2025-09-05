
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockProjects = [
  { id: 1, name: 'Azure Lofts Campaign', status: 'Active', location: 'Downtown', type: 'Listing Promotion' },
  { id: 2, name: 'Maple Creek Development', status: 'Planning', location: 'Suburbia', type: 'Developer Project' },
  { id: 3, name: 'Oceanview Villas', status: 'Completed', location: 'Coastline', type: 'Listing Promotion' },
  { id: 4, name: 'Downtown Market Report Q2', status: 'Active', location: 'Downtown', type: 'Market Analysis' },
  { id: 5, name: 'Investor Outreach', status: 'On Hold', location: 'Various', type: 'Lead Generation' },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  'Active': 'default',
  'Planning': 'secondary',
  'Completed': 'outline',
  'On Hold': 'destructive',
};

export default function ProjectsPage() {
  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="My Projects"
        description="Organize, track, and manage all your marketing and sales projects."
        icon={<PlusCircle className="h-8 w-8" />}
      >
         <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Project
        </Button>
      </PageHeader>

      <div className="border rounded-lg w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell className="hidden md:table-cell">{project.type}</TableCell>
                <TableCell className="hidden md:table-cell">{project.location}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[project.status] || 'secondary'}>{project.status}</Badge>
                </TableCell>
                <TableCell>
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
