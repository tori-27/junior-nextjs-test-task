import React from 'react';

type CountrySearchProps = {
    searchQuery: string;
    onSearchChange: (query: string) => void;
};

const CountrySearch: React.FC<CountrySearchProps> = ({ searchQuery, onSearchChange }) => {
    return (
        <div className="mb-4">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search for a country..."
                className="p-2 border border-gray-300 rounded w-full"
            />
        </div>
    );
};

export default CountrySearch;
