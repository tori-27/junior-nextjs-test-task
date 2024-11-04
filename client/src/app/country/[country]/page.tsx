'use client';

import React, { useEffect, useState } from 'react';
import { useCountryPrice } from "@/app/hooks/useCountryPrice";
import ElectricityPriceChart from "@/app/components/charts/LineChart";
import ElectricityPriceBarChart from "@/app/components/charts/BarChart";
import ActivityWidgetsContainer from "@/app/components/ui/ActivityWidgetsContainer";
import ExportButton from "@/app/components/ui/ExportButton";
import Loader from "@/app/components/ui/Loader";
import NoData from "@/app/components/ui/NoData";
import GoBackButton from "@/app/components/ui/GoBackButton";
import ChartToggleButton from "@/app/components/ui/ChartToggleButton";
import { getBiddingZone } from "@/app/utils/countryMapper";
import parseDataToChartData from "@/app/services/parseDataToChartData";

const CountryDetail = ({ params }: { params: Promise<{ country: string }> }) => {
    const [country, setCountry] = useState<string | null>(null);
    const [biddingZone, setBiddingZone] = useState<string | null>(null);
    const [isLineChart, setIsLineChart] = useState(true);

    useEffect(() => {
        async function fetchParams() {
            const resolvedParams = await params;
            const decodedCountryName = decodeURIComponent(resolvedParams.country).toLowerCase();
            setCountry(decodedCountryName);
            setBiddingZone(getBiddingZone(decodedCountryName));
        }
        fetchParams();
    }, [params]);

    const { data, isLoading, isError } = useCountryPrice(biddingZone || "");

    if (!country || isLoading) return <Loader />;
    if (!biddingZone) return <NoData country={country} />;
    if (isError) return <p>Error fetching data.</p>;

    const averagePrice = data.price.reduce((sum: number, price: number) => sum + price, 0) / data.price.length;
    const capitalizeCountryName = (country: string): string => {
        if (country.toLowerCase() === "czech republic") {
            return "Czech Republic";
        }
        return country.charAt(0).toUpperCase() + country.slice(1);
    };

    const {chartData} = parseDataToChartData(data, country);

    return (
        <div className="container mx-auto py-6">
            <div className="relative mb-4">
                <div className="flex flex-col md:flex-row md:justify-between items-center mb-4">
                    <div className="hidden md:block mb-2 md:mb-0">
                        <GoBackButton />
                    </div>
                    <h1 className="text-3xl font-bold text-center">Electricity Prices in {capitalizeCountryName(country)}</h1>
                    <div className="mb-2 md:mb-0">
                        <ExportButton chartData={chartData} fileName={`${country}ElectricityPrices.xlsx`} />
                    </div>
                </div>

                <p className="text-center mb-4">Unit: {data.unit}</p>

                <div className="text-center mb-4">
                    <ChartToggleButton isLineChart={isLineChart} onToggle={() => setIsLineChart(!isLineChart)} />
                </div>

                <div className="relative bg-white shadow-md p-4 rounded-lg">
                    {isLineChart ? (
                        <ElectricityPriceChart apiDataItem={data} countryName={country} />
                    ) : (
                        <ElectricityPriceBarChart apiDataItem={data} countryName={country} />
                    )}
                </div>

                <div className="fixed left-0 w-screen bg-pink-100 py-4 min-h-screen">
                    <ActivityWidgetsContainer pricePerMWh={averagePrice} />
                </div>
            </div>
        </div>
    );
};

export default CountryDetail;
