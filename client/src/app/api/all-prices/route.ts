import { NextRequest, NextResponse } from 'next/server';
import cache from "@/app/utils/cache";

const biddingZones = [
    "AT", "BE", "CH", "CZ", "DE-LU", "DK1", "DK2",
    "FR", "HU", "IT-North", "NL", "NO2", "PL", "SE4"
];

export async function GET(req: NextRequest) {
    try {
        const fetchPromises = biddingZones.map(async (bzn) => {
            const cacheKey = `electricity_prices_${bzn}`;

            if (cache.has(cacheKey)) {
                console.log(`Serving ${bzn} data from cache`);
                return { bzn, data: cache.get(cacheKey) };
            }

            const url = `https://api.energy-charts.info/price?bzn=${bzn}`;
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': '*'
                }
            });

            if (!response.ok) {
                return { bzn, error: `Status code: ${response.status}` };
            }

            const data = await response.json();

            cache.set(cacheKey, data);
            return { bzn, data };
        });

        const results = await Promise.all(fetchPromises);
        return NextResponse.json({ results });
    } catch (error) {
        console.error("Error fetching data in all-prices route:", error);
        return NextResponse.json({ error: "Failed to fetch data all prices" });
    }
}
