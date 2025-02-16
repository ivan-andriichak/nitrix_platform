import { FC, useEffect, useState } from 'react';
import css from './Filters.module.css';

interface FiltersProps {
  filters: {
    priceMin?: string;
    priceMax?: string;
    rooms?: string;
  };
  onFilterChange: (filters: { priceMin?: string; priceMax?: string; rooms?: string }) => void;
  onResetFilters: () => void;
}

const Filters: FC<FiltersProps> = ({ filters, onFilterChange, onResetFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (key: keyof typeof localFilters, value: string) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
  };

  const resetFilters = () => {
    setLocalFilters({ priceMin: '', priceMax: '', rooms: '' });
    onResetFilters();
  };

  return (
    <div className={css.filters}>
      <input
        placeholder="Мін. ціна"
        value={localFilters.priceMin || ''}
        onChange={e => handleChange('priceMin', e.target.value)}
      />
      <input
        placeholder="Макс. ціна"
        value={localFilters.priceMax || ''}
        onChange={e => handleChange('priceMax', e.target.value)}
      />
      <input
        type="number"
        placeholder="Кількість кімнат"
        value={localFilters.rooms || ''}
        onChange={e => {
          const value = parseInt(e.target.value, 10);
          if (!isNaN(value) && value > 0 && value <= 3) {
            handleChange('rooms', e.target.value);
          }
        }}
      />
      <button className={css.editButton} onClick={applyFilters}>
        Застосувати
      </button>
      <button className={css.editButton} onClick={resetFilters}>
        Очистити
      </button>
    </div>
  );
};


export { Filters };
