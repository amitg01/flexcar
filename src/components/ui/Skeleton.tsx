import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  animate?: boolean;
  children?: React.ReactNode;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width,
  height,
  rounded = false,
  animate = true,
  children,
}) => {
  const getRoundedClass = () => {
    if (rounded === true) return 'rounded';
    if (rounded === 'sm') return 'rounded-sm';
    if (rounded === 'md') return 'rounded-md';
    if (rounded === 'lg') return 'rounded-lg';
    if (rounded === 'xl') return 'rounded-xl';
    if (rounded === 'full') return 'rounded-full';
    return '';
  };

  const style: React.CSSProperties = {
    width: width !== undefined ? width : '100%',
    height: height !== undefined ? height : '1rem',
  };

  return (
    <div
      data-testid="skeleton"
      className={`
        bg-gray-200 
        ${getRoundedClass()}
        ${animate ? 'animate-pulse' : ''}
        ${className}
      `}
      style={style}
    >
      {children}
    </div>
  );
};

export default Skeleton;
