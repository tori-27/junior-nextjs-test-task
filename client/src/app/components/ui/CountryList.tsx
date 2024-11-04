import React, { useState } from 'react';
import CountryListItem from './CountryListItem';
import CountryFilter from './CountryFilter';
import CountrySearch from './CountrySearch';
import {getCountryFromBiddingZone} from "@/app/utils/countryMapper";

type PriceData = {
    bzn: string;
    data: {
        price: number[];
        unix_seconds: number[];
    };
};

type CountryListProps = {
    prices: PriceData[];
};

const CountryList: React.FC<CountryListProps> = ({ prices = [] }) => {
    const [sortType, setSortType] = useState<'price' | 'alphabet'>('alphabet');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSortChange = (newSortType: 'price' | 'alphabet') => {
        if (sortType === newSortType) {
            setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortType(newSortType);
            setSortOrder('asc');
        }
    };


    const handleSortOrderToggle = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    const filteredPrices = prices.filter((item) => {
        const countryName = getCountryFromBiddingZone(item.bzn) || item.bzn;
        return countryName.toLowerCase().startsWith(searchQuery.toLowerCase());
    });


    const sortedPrices = [...filteredPrices].sort((a, b) => {
        if (sortType === 'price') {
            const priceA = a.data.price.length ? a.data.price[a.data.price.length - 1] : 0;
            const priceB = b.data.price.length ? b.data.price[b.data.price.length - 1] : 0;
            return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
        } else {
            const countryA = getCountryFromBiddingZone(a.bzn) || a.bzn;
            const countryB = getCountryFromBiddingZone(b.bzn) || b.bzn;
            return sortOrder === 'asc' ? countryA.localeCompare(countryB) : countryB.localeCompare(countryA);
        }
    });

    const capitalizeCountryName = (country: string): string => {
        if (country.toLowerCase() === "czech republic") {
            return "Czech Republic";
        }
        return country.charAt(0).toUpperCase() + country.slice(1);
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Available Countries</h2>
            <CountrySearch searchQuery={searchQuery} onSearchChange={handleSearchChange}/>
            <CountryFilter sortType={sortType} sortOrder={sortOrder} onSortChange={handleSortChange}
                           onSortOrderToggle={handleSortOrderToggle}/>
            <ul className="space-y-2">
                {sortedPrices.map((item) => (
                    <CountryListItem
                        key={item.bzn}
                        countryName={capitalizeCountryName(getCountryFromBiddingZone(item.bzn) || item.bzn)}
                        price={item.data.price.length ? item.data.price[item.data.price.length - 1] : null}
                        timestamp={item.data.unix_seconds.length ? item.data.unix_seconds[item.data.unix_seconds.length - 1] : null}
                    />
                ))}
            </ul>

        </div>
    );
};

export default CountryList;
