import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Grid } from 'react-window';
import { EmptyState, VehicleGridSkeleton } from '../ui';
import VehicleCard from './VehicleCard';
import { useVehicle } from '../../hooks/useVehicle';
import type { Vehicle } from '../../data/vehicles';

interface ResponsiveVirtualizedGridProps {
  onVehicleClick?: (vehicle: Vehicle) => void;
  className?: string;
}

interface GridItemProps {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
  data: {
    vehicles: Vehicle[];
    columnsPerRow: number;
    onVehicleClick?: (vehicle: Vehicle) => void;
  };
}

const GridItem: React.FC<GridItemProps> = ({
  columnIndex,
  rowIndex,
  style,
  data,
}) => {
  const { vehicles, columnsPerRow, onVehicleClick } = data;
  const index = rowIndex * columnsPerRow + columnIndex;
  const vehicle = vehicles[index];

  if (!vehicle) {
    return <div style={style} />;
  }

  return (
    <div style={style} className="p-3">
      <VehicleCard
        vehicle={vehicle}
        onViewDetails={() => onVehicleClick?.(vehicle)}
        className="h-full"
      />
    </div>
  );
};

const ResponsiveVirtualizedGrid: React.FC<ResponsiveVirtualizedGridProps> = ({
  onVehicleClick,
  className = '',
}) => {
  const { state, clearFilters } = useVehicle();
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  // Handle window resize
  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Calculate responsive grid configuration
  const gridConfig = useMemo(() => {
    const vehicles = state.filteredVehicles;
    const itemCount = vehicles.length;

    if (itemCount === 0) {
      return { columns: 1, rows: 1, columnWidth: 300, rowHeight: 400 };
    }

    // Responsive breakpoints
    const getColumnsPerRow = (width: number) => {
      if (width < 640) return 1; // sm: 1 column
      if (width < 768) return 1; // md: 1 column
      if (width < 1024) return 2; // lg: 2 columns
      if (width < 1280) return 3; // xl: 3 columns
      return 4; // 2xl: 4 columns
    };

    const columnsPerRow = getColumnsPerRow(windowSize.width);
    const rows = Math.ceil(itemCount / columnsPerRow);

    // Calculate item dimensions
    const containerPadding = 48; // 24px * 2 (left/right padding)
    const itemSpacing = 24; // 12px * 2 (gap between items)
    const availableWidth = Math.max(300, windowSize.width - containerPadding);

    const columnWidth = Math.floor(
      (availableWidth - itemSpacing * (columnsPerRow - 1)) / columnsPerRow
    );

    // Responsive row height
    const getRowHeight = (width: number) => {
      if (width < 640) return 450; // Mobile: smaller cards
      if (width < 768) return 500; // Tablet: medium cards
      return 520; // Desktop: larger cards
    };

    const rowHeight = getRowHeight(windowSize.width);

    return {
      columns: columnsPerRow,
      rows,
      columnWidth: Math.max(280, columnWidth),
      rowHeight,
    };
  }, [state.filteredVehicles, windowSize.width]);

  const gridData = useMemo(
    () => ({
      vehicles: state.filteredVehicles,
      columnsPerRow: gridConfig.columns,
      onVehicleClick,
    }),
    [state.filteredVehicles, gridConfig.columns, onVehicleClick]
  );

  if (state.isLoading) {
    return <VehicleGridSkeleton count={6} className={className} />;
  }

  if (state.filteredVehicles.length === 0 && !state.error) {
    return (
      <EmptyState
        title="No vehicles match your filters"
        description="Try adjusting your filters to see more results."
        action={{
          label: 'Clear Filters',
          onClick: clearFilters,
        }}
        className={className}
      />
    );
  }

  // Calculate grid height with max limit
  const maxHeight = Math.min(800, gridConfig.rows * gridConfig.rowHeight);
  const gridHeight = Math.max(400, maxHeight);

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-4 text-sm text-gray-600">
        Showing {state.filteredVehicles.length} vehicles
        {gridConfig.columns > 1 && ` in ${gridConfig.columns} columns`}
      </div>

      <Grid
        columnCount={gridConfig.columns}
        columnWidth={gridConfig.columnWidth}
        height={gridHeight}
        rowCount={gridConfig.rows}
        rowHeight={gridConfig.rowHeight}
        width="100%"
        itemData={gridData}
        overscanRowCount={2}
        overscanColumnCount={1}
        className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        {GridItem}
      </Grid>
    </div>
  );
};

export default ResponsiveVirtualizedGrid;
