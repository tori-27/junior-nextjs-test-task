import React from 'react';

type CountryFilterProps = {
    sortType: 'price' | 'alphabet';
    sortOrder: 'asc' | 'desc';
    onSortChange: (sortType: 'price' | 'alphabet') => void;
    onSortOrderToggle: () => void;
};

const CountryFilter: React.FC<CountryFilterProps> = ({ sortType, sortOrder, onSortChange}) => {
    return (
        <div className="mb-4">
            <button
                onClick={() => onSortChange('alphabet')}
                className={`mr-2 p-2 rounded ${sortType === 'alphabet' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}
            >
                Sort by Alphabet {sortType === 'alphabet' ? (sortOrder === 'asc' ? 'A-Z' : 'Z-A') : ''}
            </button>
            <button
                onClick={() => onSortChange('price')}
                className={`p-2 rounded ${sortType === 'price' ? 'bg-green-700 text-white' : 'bg-green-500 text-white'}`}
            >
                Sort by Price {sortType === 'price' ? (sortOrder === 'asc' ? 'Low-High' : 'High-Low') : ''}
            </button>
        </div>
    );
};

export default CountryFilter;
