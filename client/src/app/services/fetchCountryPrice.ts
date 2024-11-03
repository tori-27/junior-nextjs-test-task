import axios from 'axios';

export const fetchCountryPrice = async (bzn: string, start?: string, end?: string) => {
    try {
        const url = new URL("/api/country-price", window.location.origin);
        url.searchParams.append("bzn", bzn);
        if (start) url.searchParams.append("start", start);
        if (end) url.searchParams.append("end", end);

        const response = await axios.get(url.toString());
        return response.data;
    } catch {
        return { error: "Error fetching data in service" };
    }
};

export default fetchCountryPrice;
