export type ApiDataItem = {
    license_info: string;
    unix_seconds: number[];
    price: number[];
    unit: string;
    deprecated: boolean;
};

export type ChartData = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor?: string;
        backgroundColor?: string;
    }[];
};

const parseDataToChartData = (apiDataItem: ApiDataItem, countryName: string) => {
    if (!apiDataItem.unix_seconds || !apiDataItem.price) {
        console.error("Invalid ApiDataItem structure:", apiDataItem);
        return { chartData: { labels: [], datasets: [] }, minPrice: 0, maxPrice: 0, avgPrice: 0 };
    }

    const labels = apiDataItem.unix_seconds.map(timestamp =>
        new Date(timestamp * 1000).toLocaleTimeString("en-GB", {
            hour: '2-digit',
            minute: '2-digit',
        })
    );

    const data = apiDataItem.price;

    const minPrice = Math.min(...data);
    const maxPrice = Math.max(...data);
    const avgPrice = data.reduce((a, b) => a + b, 0) / data.length;

    const chartData: ChartData = {
        labels,
        datasets: [
            {
                label: `Electricity Price for ${countryName}`,
                data,
                borderColor: '#e67aac',
                backgroundColor: 'rgba(230, 122, 172, 0.2)',
            }
        ]
    };

    return { chartData, minPrice, maxPrice, avgPrice };
};

export default parseDataToChartData;
