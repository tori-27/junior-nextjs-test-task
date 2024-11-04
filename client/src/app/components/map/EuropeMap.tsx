'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import {getBiddingZone} from "@/app/utils/countryMapper";

const geoUrl = '/europe.topojson';

type PriceData = {
    bzn: string;
    data: {
        price: number[];
        unix_seconds: number[];
    };
};

type EuropeMapProps = {
    prices: PriceData[];
};

const EuropeMap: React.FC<EuropeMapProps> = ({ prices }) => {
    const router = useRouter();
    const [tooltip, setTooltip] = useState<{ country: string; price: number | null; x: number; y: number } | null>(null);

    const handleCountryClick = (countryName: string) => {
        router.push(`/country/${countryName.toLowerCase()}`);
    };

    const handleCountryHover = (event: React.MouseEvent, countryName: string) => {
        const countryCode = getBiddingZone(countryName);

        if (!countryCode) {
            setTooltip({
                country: countryName,
                price: null,
                x: event.clientX,
                y: event.clientY,
            });
            return;
        }

        const priceData = prices.find((item) => item.bzn === countryCode);
        const price = priceData ? priceData.data.price[priceData.data.price.length - 1] || null : null;

        setTooltip({
            country: countryName,
            price,
            x: event.clientX,
            y: event.clientY,
        });
    };

    const handleMouseLeave = () => {
        setTooltip(null);
    };

    return (
        <div className="w-full h-auto flex relative">
            <ComposableMap
                projectionConfig={{
                    center: [10, 50],
                    scale: 600,
                }}
                className="bg-white rounded-lg"
            >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const countryName = geo.properties.NAME;
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onClick={() => handleCountryClick(countryName)}
                                    onMouseEnter={(event) => handleCountryHover(event, countryName)}
                                    onMouseLeave={handleMouseLeave}
                                    style={{
                                        default: {
                                            fill: '#D6D6DA',
                                            outline: 'none',
                                        },
                                        hover: {
                                            fill: '#e67aac',
                                            outline: 'none',
                                        },
                                        pressed: {
                                            fill: '#ED61A9',
                                            outline: 'none',
                                        },
                                    }}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
            {tooltip && (
                <div
                    style={{
                        position: 'absolute',
                        left: tooltip.x + 10,
                        top: tooltip.y + 10,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        color: '#fff',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        pointerEvents: 'none',
                        zIndex: 10,
                    }}
                >
                    <strong>{tooltip.country}</strong>
                    <div>{tooltip.price !== null ? `${tooltip.price} EUR/MWh` : 'Data not available'}</div>
                </div>
            )}
        </div>
    );
};

export default EuropeMap;
