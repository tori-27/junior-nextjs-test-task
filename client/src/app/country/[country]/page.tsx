'use client';

import React, { useEffect, useState } from 'react';
import { useCountryPrice } from "@/app/hooks/useCountryPrice";
import ElectricityPriceChart from "@/app/components/charts/LineChart";
import ActivityWidgetsContainer from "@/app/components/ui/ActivityWidgetsContainer";
import ExportButton from "@/app/components/ui/ExportButton";

const countryToBiddingZone = {
    austria: 'AT',
    belgium: 'BE',
    switzerland: 'CH',
    "czech republic": 'CZ',
    germany: 'DE-LU',
    france: 'FR',
    hungary: 'HU',
    italy: 'IT-North',
    netherlands: 'NL',
    norway: 'NO2',
    poland: 'PL',
    sweden: 'SE4',
    slovenia: 'SI'
};

const CountryDetail = ({ params }: { params: Promise<{ country: string }> }) => {
    const [country, setCountry] = useState<string | null>(null);
    const [biddingZone, setBiddingZone] = useState<string | null>(null);

    useEffect(() => {
        async function fetchParams() {
            const resolvedParams = await params;
            const countryName = resolvedParams.country.toLowerCase();
            setCountry(countryName);
            setBiddingZone(countryToBiddingZone[countryName]);
        }
        fetchParams();
    }, [params]);

    const { data, isLoading, isError } = useCountryPrice(biddingZone);

    if (!country) return <p>Loading...</p>;
    if (!biddingZone) return <p>Sorry, no data available for {country}.</p>;
    if (isLoading) return <p>Loading data...</p>;
    if (isError) return <p>Error fetching data.</p>;

    const averagePrice = data.price.reduce((sum, price) => sum + price, 0) / data.price.length;

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-3xl font-bold mb-4">Electricity Prices in {country}</h1>
            {data.deprecated && <p className="text-red-500">This data is deprecated.</p>}
            <p>License: {data.license_info}</p>
            <p>Unit: {data.unit}</p>

            <ElectricityPriceChart apiDataItem={data} countryName={country}/>

            <ExportButton chartData={data} fileName={`${country}ElectricityPrices.xlsx`}/>

            <div className="fixed left-0 w-screen bg-pink-100 py-4 min-h-screen ">
                <ActivityWidgetsContainer pricePerMWh={averagePrice}/>
            </div>


        </div>
    );
};

export default CountryDetail;
