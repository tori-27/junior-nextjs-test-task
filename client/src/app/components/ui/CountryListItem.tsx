import React from 'react';
import { useRouter } from 'next/navigation';

type CountryListItemProps = {
    countryName: string;
    price: number | null;
    timestamp: number | null;
};

const CountryListItem: React.FC<CountryListItemProps> = ({ countryName, price, timestamp }) => {
    const router = useRouter();

    const handleItemClick = () => {
        console.log("From CountryList", countryName);
        router.push(`/country/${countryName.toLowerCase()}`);
    };

    const formattedTime = timestamp ? new Date(timestamp * 1000).toLocaleString() : 'No data';

    return (
        <li onClick={handleItemClick} className="flex justify-between bg-pink-200 p-2 rounded cursor-pointer">
            <div>
                <span>{countryName}</span>
                <span className="block text-xs text-gray-500">Last updated: {formattedTime}</span>
            </div>
            <span>{price !== null ? `${price} EUR/MWh` : 'Data not available'}</span>
        </li>
    );
};

export default CountryListItem;
