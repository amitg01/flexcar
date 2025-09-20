import React, {
  useMemo,
  useCallback,
  useState,
  useEffect,
  Suspense,
  lazy,
} from 'react';
import { Grid } from 'react-window';
import { EmptyState, VehicleGridSkeleton } from '@/components/ui';
import { useVehicle } from '@/hooks/useVehicle';
import type { Vehicle } from '@/data/vehicles';

// Lazy load VehicleCard for better performance
const VehicleCard = lazy(() => import('./VehicleCard'));

interface ResponsiveVirtualizedGridProps {
  className?: string;
  onVehicleClick?: (vehicle: Vehicle) => void;
}

interface GridItemProps {
  ariaAttributes: {
    'aria-colindex': number;
    role: 'gridcell';
  };
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
  vehicles: Vehicle[];
  columnsPerRow: number;
}

interface GridCellProps {
  vehicles: Vehicle[];
  columnsPerRow: number;
}

const GridItem = ({
  columnIndex,
  rowIndex,
  style,
  vehicles,
  columnsPerRow,
}: GridItemProps) => {
  const index = rowIndex * columnsPerRow + columnIndex;
  const vehicle = vehicles[index];

  if (!vehicle) {
    return <div style={style} />;
  }

  return (
    <div
      style={{
        ...style,
        padding: '12px',
        boxSizing: 'border-box',
      }}
    >
      <Suspense
        fallback={
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-full">
            <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        }
      >
        <VehicleCard vehicle={vehicle} className="h-full w-full" />
      </Suspense>
    </div>
  );
};

const ResponsiveVirtualizedGrid: React.FC<ResponsiveVirtualizedGridProps> = ({
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

    // Responsive breakpoints - account for filter panel width
    const getColumnsPerRow = (width: number) => {
      // Account for filter panel (320px) + padding
      const availableWidth = width - 400; // 320px filter + 80px padding

      if (availableWidth < 640) return 1; // Mobile: 1 column
      if (availableWidth < 960) return 2; // Tablet: 2 columns
      return 3; // Desktop and large screens: 3 columns max
    };

    const columnsPerRow = getColumnsPerRow(windowSize.width);
    const rows = Math.ceil(itemCount / columnsPerRow);

    // Calculate item dimensions based on available space
    const containerPadding = 48; // 24px * 2 (left/right padding)
    const filterPanelWidth = 320; // Filter panel width
    const availableWidth = Math.max(
      300,
      windowSize.width - containerPadding - filterPanelWidth
    );

    const columnWidth = Math.floor(
      (availableWidth - 24 * (columnsPerRow - 1)) / columnsPerRow
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
    }),
    [state.filteredVehicles, gridConfig.columns]
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

      <Grid<GridCellProps>
        columnCount={gridConfig.columns}
        columnWidth={gridConfig.columnWidth}
        rowCount={gridConfig.rows}
        rowHeight={gridConfig.rowHeight}
        style={{
          height: gridHeight,
          width: '100%',
          padding: '0 12px',
        }}
        cellProps={gridData}
        overscanCount={2}
        className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        cellComponent={GridItem}
      ></Grid>
    </div>
  );
};

export default ResponsiveVirtualizedGrid;
