import { useQuery } from "react-query";
import fetchAllPrices from "@/app/services/fetchAllPrices"

export const useAllPrices = () => {
    return useQuery('allPrices', fetchAllPrices, {
        staleTime: 60 * 60 * 1000, // 1 hour
    });
};