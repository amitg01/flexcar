import React, { forwardRef } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  isLoading?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder,
      isLoading = false,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className='w-full'>
        {label && (
          <label className='block text-sm font-semibold text-gray-700 mb-2'>
            {label}
          </label>
        )}
        <div className='relative'>
          <select
            ref={ref}
            className={`w-full px-3 py-2 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-flexcar-blue focus:border-flexcar-blue appearance-none bg-white ${
              error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
          >
            {placeholder && (
              <option value='' disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            <svg
              className='w-4 h-4 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </div>
        </div>
        {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
        {helperText && !error && (
          <p className='text-gray-500 text-sm mt-1'>{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
