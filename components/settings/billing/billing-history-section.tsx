'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';

interface BillingRecord {
  id: string;
  date: Date;
  description: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  invoiceUrl?: string;
}

interface BillingHistorySectionProps {
  records: BillingRecord[];
}

const ITEMS_PER_PAGE = 5;

const getStatusBadge = (status: string) => {
  const statusMap: Record<string, { bg: string; text: string }> = {
    paid: { bg: 'bg-green-500/10', text: 'text-green-500' },
    pending: { bg: 'bg-yellow-500/10', text: 'text-yellow-500' },
    failed: { bg: 'bg-red-500/10', text: 'text-red-500' },
  };

  const config = statusMap[status] || statusMap.pending;

  return (
    <Badge variant="outline" className={`${config.bg} ${config.text} border-0`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export function BillingHistorySection({ records }: BillingHistorySectionProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return records.slice(startIndex, endIndex);
  }, [records, currentPage]);

  const totalPages = Math.ceil(records.length / ITEMS_PER_PAGE);

  return (
    <Card className="border-border bg-card">
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div>
          <h3 className="text-xl font-semibold text-foreground">Billing History</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            View and download your past invoices
          </p>
        </div>

        {/* Table */}
        {records.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Date</TableHead>
                    <TableHead className="text-muted-foreground">Description</TableHead>
                    <TableHead className="text-muted-foreground">Amount</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-right text-muted-foreground">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRecords.map((record) => (
                    <TableRow key={record.id} className="border-border/50 hover:bg-background/50">
                      <TableCell className="text-foreground">
                        {record.date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell className="text-foreground font-medium">
                        {record.description}
                      </TableCell>
                      <TableCell className="text-foreground font-semibold">
                        {record.currency === 'UZS' ? 'UZS' : '$'}
                        {record.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell className="text-right">
                        {record.invoiceUrl && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => window.open(record.invoiceUrl, '_blank')}
                            className="text-purple-500 hover:text-purple-600 hover:bg-purple-500/10"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-border/50 pt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
                  {Math.min(currentPage * ITEMS_PER_PAGE, records.length)} of {records.length}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-lg bg-background p-8 text-center">
            <p className="text-muted-foreground">No billing records found</p>
          </div>
        )}
      </div>
    </Card>
  );
}
