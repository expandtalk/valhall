import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  showAvatar?: boolean;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  lines = 3,
  showAvatar = false
}) => {
  return (
    <div className={cn('animate-pulse', className)}>
      <div className="flex space-x-4">
        {showAvatar && (
          <div className="rounded-full bg-muted h-10 w-10"></div>
        )}
        <div className="flex-1 space-y-2">
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={cn(
                'h-4 bg-muted rounded',
                index === lines - 1 ? 'w-3/4' : 'w-full'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('p-4 border rounded-lg space-y-4 animate-pulse', className)}>
    <div className="h-4 bg-muted rounded w-3/4"></div>
    <div className="space-y-2">
      <div className="h-3 bg-muted rounded"></div>
      <div className="h-3 bg-muted rounded w-5/6"></div>
    </div>
    <div className="flex space-x-2">
      <div className="h-6 bg-muted rounded w-16"></div>
      <div className="h-6 bg-muted rounded w-20"></div>
    </div>
  </div>
);

export const ListSkeleton: React.FC<{ 
  items?: number; 
  className?: string; 
}> = ({ items = 5, className }) => (
  <div className={cn('space-y-4', className)}>
    {Array.from({ length: items }).map((_, index) => (
      <CardSkeleton key={index} />
    ))}
  </div>
);