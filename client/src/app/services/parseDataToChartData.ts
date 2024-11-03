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
const parseDataToChartData = (apiDataItem: ApiDataItem, countryName: string): ChartData => {
    const labels = apiDataItem.unix_seconds.map(timestamp =>
        new Date(timestamp * 1000).toLocaleTimeString("en-GB", {
            hour: '2-digit',
            minute: '2-digit',
        })
    );
    const data = apiDataItem.price;

    return {
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
};

export default parseDataToChartData;
