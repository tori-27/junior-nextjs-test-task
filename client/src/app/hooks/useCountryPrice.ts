import { useQuery } from "react-query";
import fetchCountryPrice from "@/app/services/fetchCountryPrice";

export const useCountryPrice = (bzn: string, start?: string, end?: string) => {
    return useQuery(['electricityPrice', bzn, start, end],
        async () => fetchCountryPrice(bzn, start, end),
        {
            enabled: !!bzn,
            staleTime: 60 * 60 * 1000, // 1 hour
        }
    );
};
