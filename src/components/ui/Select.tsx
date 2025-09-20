import React, { forwardRef, useState, useRef, useEffect } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  isLoading?: boolean;
  value?: string;
  onChange?: (event: { target: { value: string } }) => void;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder,
      isLoading = false,
      className = '',
      value = '',
      onChange,
      disabled = false,
      name,
      id,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const selectRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    // Find the selected option
    const selectedOption = options.find(option => option.value === value);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (disabled || isLoading) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setFocusedIndex(prev => (prev < options.length - 1 ? prev + 1 : 0));
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setFocusedIndex(prev => (prev > 0 ? prev - 1 : options.length - 1));
          }
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else if (focusedIndex >= 0) {
            const option = options[focusedIndex];
            if (!option.disabled) {
              handleOptionSelect(option.value);
            }
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setFocusedIndex(-1);
          buttonRef.current?.focus();
          break;
        case 'Tab':
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    };

    const handleOptionSelect = (optionValue: string) => {
      onChange?.({ target: { value: optionValue } });
      setIsOpen(false);
      setFocusedIndex(-1);
      buttonRef.current?.focus();
    };

    const handleButtonClick = () => {
      if (!disabled && !isLoading) {
        setIsOpen(!isOpen);
        setFocusedIndex(-1);
      }
    };

    // Scroll focused option into view
    useEffect(() => {
      if (isOpen && focusedIndex >= 0 && listRef.current) {
        const focusedElement = listRef.current.children[
          focusedIndex
        ] as HTMLElement;
        if (focusedElement) {
          focusedElement.scrollIntoView({ block: 'nearest' });
        }
      }
    }, [focusedIndex, isOpen]);

    return (
      <div ref={ref} className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            {label}
          </label>
        )}
        <div ref={selectRef} className="relative">
          <button
            ref={buttonRef}
            type="button"
            id={id}
            name={name}
            onClick={handleButtonClick}
            onKeyDown={handleKeyDown}
            disabled={disabled || isLoading}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-labelledby={label ? `${id}-label` : undefined}
            className={`w-full px-3 py-2 border rounded-lg text-base text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${
              error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
            } ${isLoading || disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${
              isOpen ? 'ring-2 ring-blue-500 border-blue-500' : ''
            }`}
          >
            <span className="block truncate">
              {selectedOption
                ? selectedOption.label
                : placeholder || 'Select an option'}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </button>

          {isOpen && (
            <ul
              ref={listRef}
              role="listbox"
              className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none"
              aria-labelledby={label ? `${id}-label` : undefined}
            >
              {options.map((option, index) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === value}
                  className={`px-3 py-2 cursor-pointer text-sm ${
                    option.value === value
                      ? 'bg-blue-100 text-blue-900'
                      : focusedIndex === index
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-900 hover:bg-gray-100'
                  } ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() =>
                    !option.disabled && handleOptionSelect(option.value)
                  }
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {helperText && !error && (
          <p className="text-gray-500 text-sm mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
