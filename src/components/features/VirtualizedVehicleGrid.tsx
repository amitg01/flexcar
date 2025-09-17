import React, { useMemo, useCallback } from 'react';
import { Grid } from 'react-window';
import { EmptyState } from '../ui';
import VehicleCard from './VehicleCard';
import { useVehicle } from '../../hooks/useVehicle';
import type { Vehicle } from '../../data/vehicles';

interface VirtualizedVehicleGridProps {
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

const VirtualizedVehicleGrid: React.FC<VirtualizedVehicleGridProps> = ({
  onVehicleClick,
  className = '',
}) => {
  const { state } = useVehicle();

  // Calculate grid dimensions based on screen size
  const gridConfig = useMemo(() => {
    const vehicles = state.filteredVehicles;
    const itemCount = vehicles.length;

    if (itemCount === 0) {
      return { columns: 1, rows: 1, columnWidth: 300, rowHeight: 400 };
    }

    // Responsive column count based on container width
    const getColumnsPerRow = () => {
      if (typeof window === 'undefined') return 3; // SSR fallback

      const width = window.innerWidth;
      if (width < 640) return 1; // sm: 1 column
      if (width < 1024) return 2; // md: 2 columns
      if (width < 1280) return 3; // lg: 3 columns
      return 4; // xl: 4 columns
    };

    const columnsPerRow = getColumnsPerRow();
    const rows = Math.ceil(itemCount / columnsPerRow);

    // Calculate item dimensions
    const containerPadding = 24; // 12px * 2 (left/right padding)
    const itemSpacing = 24; // 12px * 2 (gap between items)
    const availableWidth = Math.max(300, window.innerWidth - containerPadding);

    const columnWidth = Math.floor(
      (availableWidth - itemSpacing * (columnsPerRow - 1)) / columnsPerRow
    );
    const rowHeight = 500; // Fixed height for each row

    return {
      columns: columnsPerRow,
      rows,
      columnWidth: Math.max(280, columnWidth),
      rowHeight,
    };
  }, [state.filteredVehicles]);

  const gridData = useMemo(
    () => ({
      vehicles: state.filteredVehicles,
      columnsPerRow: gridConfig.columns,
      onVehicleClick,
    }),
    [state.filteredVehicles, gridConfig.columns, onVehicleClick]
  );

  // Handle window resize
  const handleResize = useCallback(() => {
    // Force re-render when window resizes
    window.dispatchEvent(new Event('resize'));
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  if (state.isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-gray-600 text-lg">Loading vehicles...</p>
      </div>
    );
  }

  if (state.filteredVehicles.length === 0 && !state.error) {
    return (
      <EmptyState
        title="No vehicles match your filters"
        description="Try adjusting your filters to see more results."
        action={{
          label: 'Clear Filters',
          onClick: () => {
            window.dispatchEvent(new CustomEvent('clearFilters'));
          },
        }}
        className={className}
      />
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <Grid
        columnCount={gridConfig.columns}
        columnWidth={gridConfig.columnWidth}
        height={Math.min(600, gridConfig.rows * gridConfig.rowHeight)}
        rowCount={gridConfig.rows}
        rowHeight={gridConfig.rowHeight}
        width="100%"
        itemData={gridData}
        overscanRowCount={2}
        overscanColumnCount={1}
      >
        {GridItem}
      </Grid>
    </div>
  );
};

export default VirtualizedVehicleGrid;
