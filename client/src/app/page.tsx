'use client';
import React from 'react';
import EuropeMap from "@/app/components/map/EuropeMap";
import { useAllPrices } from "@/app/hooks/useAllPrices";
import CountryList from "@/app/components/ui/CountryList";
import ProgressBarLoader from "@/app/components/ui/ProgressBarLoader";
import ErrorFetchingData from "@/app/components/ui/ErrorFetchingData";

export default function Home() {
    const { data, isLoading, error } = useAllPrices();
    if (isLoading) return <ProgressBarLoader />;
    if (error) return <ErrorFetchingData message={'Failed to fetch data'} />;
    return (
        <div className="flex justify-between flex-col md:flex-row lg:flex-row">
            <div className="w-full md:w-1/2 lg:w-1/2">
                <EuropeMap prices={data.results} />
            </div>
            <div className="pr-7 w-full md:w-1/2 lg:w-1/2">
                <CountryList prices={data.results}/>
            </div>
        </div>
    );
}
