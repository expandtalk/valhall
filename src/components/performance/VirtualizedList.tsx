import React from 'react';
import { useVirtualization } from '@/hooks/useVirtualization';

interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  height: number;
  renderItem: (item: T & { index: number }) => React.ReactNode;
  className?: string;
}

export function VirtualizedList<T>({
  items,
  itemHeight,
  height,
  renderItem,
  className = ''
}: VirtualizedListProps<T>) {
  const { visibleItems, totalHeight, offsetY, onScroll } = useVirtualization({
    items,
    itemHeight,
    containerHeight: height
  });

  return (
    <div
      className={`overflow-auto ${className}`}
      style={{ height }}
      onScroll={onScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item) => (
            <div key={item.index} style={{ height: itemHeight }}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}