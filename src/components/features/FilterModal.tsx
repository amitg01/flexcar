import React from 'react';
import { Modal } from '@/components/ui';
import FilterPanel from './FilterPanel';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filters">
      <div className="max-h-[80vh] overflow-y-auto">
        <FilterPanel />
      </div>
    </Modal>
  );
};

export default FilterModal;
