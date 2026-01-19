
import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { PaginationState, PaginationControls as PaginationControlsType } from "@/hooks/useRunicData/paginationUtils";
import { calculatePagination } from "@/hooks/useRunicData/paginationUtils";

interface PaginationControlsComponentProps {
  pagination: PaginationState;
  controls: PaginationControlsType;
}

export const PaginationControls: React.FC<PaginationControlsComponentProps> = ({ 
  pagination, 
  controls 
}) => {
  const paginationInfo = calculatePagination(
    pagination.totalItems, 
    pagination.currentPage, 
    pagination.pageSize
  );

  if (pagination.totalItems === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-between bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4">
      <div className="text-slate-300 text-sm">
        Visar {paginationInfo.startItem}-{paginationInfo.endItem} av {pagination.totalItems} runinskrifter
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-slate-300 text-sm">Poster per sida:</span>
          <Select 
            value={pagination.pageSize.toString()} 
            onValueChange={(value) => controls.setPageSize(parseInt(value))}
          >
            <SelectTrigger className="w-20 bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-white/20">
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
              <SelectItem value="200">200</SelectItem>
              <SelectItem value="500">500</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => controls.goToPage(1)}
            disabled={!paginationInfo.hasPrevPage}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={controls.prevPage}
            disabled={!paginationInfo.hasPrevPage}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2 px-4 text-slate-300 text-sm">
            Sida {pagination.currentPage} av {paginationInfo.totalPages}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={controls.nextPage}
            disabled={!paginationInfo.hasNextPage}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => controls.goToPage(paginationInfo.totalPages)}
            disabled={!paginationInfo.hasNextPage}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
