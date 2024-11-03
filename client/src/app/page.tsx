'use client';
import React from 'react';
import EuropeMap from "@/app/components/map/EuropeMap";
import { useAllPrices } from "@/app/hooks/useAllPrices";
import CountryList from "@/app/components/ui/CountryList";
import ProgressBarLoader from "@/app/components/ui/ProgressBarLoader";

export default function Home() {
    const { data, isLoading, error } = useAllPrices();
    if (isLoading) return <ProgressBarLoader />;
    if (error) return <p>Error loading data.</p>;
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
