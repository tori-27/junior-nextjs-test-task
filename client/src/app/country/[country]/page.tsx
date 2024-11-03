'use client';

import React, { useEffect, useState } from 'react';
import { useCountryPrice } from "@/app/hooks/useCountryPrice";
import ElectricityPriceChart from "@/app/components/charts/LineChart";
import ActivityWidgetsContainer from "@/app/components/ui/ActivityWidgetsContainer";
import ExportButton from "@/app/components/ui/ExportButton";
import Loader from "@/app/components/ui/Loader";
import NoData from "@/app/components/ui/NoData";
import GoBackButton from "@/app/components/ui/GoBackButton";

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

    if (!country || isLoading) return <Loader />;
    if (!biddingZone) return <NoData country={country}/>;
    if (isError) return <p>Error fetching data.</p>;

    const averagePrice = data.price.reduce((sum, price) => sum + price, 0) / data.price.length;

    return (
        <div className="container mx-auto py-6">
            <div className="relative mb-4">
                <div className="absolute top-4 left-4 z-10">
                    <GoBackButton/>
                </div>
                <h1 className="text-3xl font-bold text-center">Electricity Prices in {country}</h1>
            </div>

            <p className="text-center mb-4">Unit: {data.unit}</p>

            <div className="relative bg-white shadow-md p-4 rounded-lg">
                <ElectricityPriceChart apiDataItem={data} countryName={country}/>
            </div>

            <ExportButton chartData={data} fileName={`${country}ElectricityPrices.xlsx`}/>

            <div className="fixed left-0 w-screen bg-pink-100 py-4 min-h-screen">
                <ActivityWidgetsContainer pricePerMWh={averagePrice}/>
            </div>
        </div>
    );
};

export default CountryDetail;
