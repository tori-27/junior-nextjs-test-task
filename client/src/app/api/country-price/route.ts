import { NextRequest, NextResponse } from 'next/server';
import cache from "@/app/utils/cache";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const bzn = searchParams.get("bzn");
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if (!bzn) {
        return NextResponse.json({ error: "Parameter 'bzn' is required" });
    }

    const generalCacheKey = `electricity_prices_${bzn}`;
    const detailedCacheKey = `electricity_prices_details_${bzn}_${start || 'default'}_${end || 'default'}`;

    if (start || end) {
        if (cache.has(detailedCacheKey)) {
            console.log(`Serving detailed data for ${bzn} from cache`);
            return NextResponse.json(cache.get(detailedCacheKey));
        }
    } else {
        if (cache.has(generalCacheKey)) {
            console.log(`Serving general data for ${bzn} from cache`);
            return NextResponse.json(cache.get(generalCacheKey));
        }
    }

    try {
        const url = new URL("https://api.energy-charts.info/price");
        url.searchParams.append("bzn", bzn);
        if (start) url.searchParams.append("start", start);
        if (end) url.searchParams.append("end", end);

        console.log("Fetching data from API:", url.toString());
        const response = await fetch(url.toString(), {
            headers: {
                'Accept': 'application/json',
                'User-Agent': '*'
            }
        });

        if (!response.ok) {
            console.error("API returned error status:", response.status);
            return NextResponse.json({ error: `Failed to fetch data, status code: ${response.status}` });
        }

        const data = await response.json();

        if (start || end) {
            cache.set(detailedCacheKey, data);
        } else {
            cache.set(generalCacheKey, data);
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching data in country-price route:", error);
        return NextResponse.json({ error: "Error fetching data in country-price route" });
    }
}
