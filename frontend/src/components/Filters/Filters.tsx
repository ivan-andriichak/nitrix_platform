import { FC, useState } from 'react';
import css from './Filters.module.css';

interface FiltersProps {
  onFilterChange: (filters: {
    priceMin?: string;
    priceMax?: string;
    rooms?: string;
  }) => void;
  onResetFilters: () => void;
}

const Filters: FC<FiltersProps> = ({ onFilterChange, onResetFilters }) => {
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [rooms, setRooms] = useState('');

  const applyFilters = () => {
    onFilterChange({ priceMin, priceMax, rooms });
  };

  const resetFilters = () => {
    setPriceMin('');
    setPriceMax('');
    setRooms('');
    onResetFilters();
  };

  return (
    <div className={css.filters}>
      <input
        placeholder="Мін. ціна"
        value={priceMin}
        onChange={e => setPriceMin(e.target.value)}
      />
      <input
        placeholder="Макс. ціна"
        value={priceMax}
        onChange={e => setPriceMax(e.target.value)}
      />
      <input
        type="number"
        placeholder="Кількість кімнат"
        value={rooms}
        onChange={e => {
          const value = parseInt(e.target.value, 10);
          if (!isNaN(value) && value > 0 && value <= 3) {
            setRooms(e.target.value);
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
