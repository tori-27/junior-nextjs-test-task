import React, { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, TooltipItem} from 'chart.js';
import parseDataToChartData from '../../services/parseDataToChartData';
import { ApiDataItem } from '../../services/parseDataToChartData';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip);

type ElectricityPriceBarChartProps = {
    apiDataItem: ApiDataItem;
    countryName: string;
};

const ElectricityPriceBarChart: React.FC<ElectricityPriceBarChartProps> = ({ apiDataItem, countryName }) => {
    const chartRef = useRef(null);
    const { chartData, avgPrice } = parseDataToChartData(apiDataItem, countryName);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem: TooltipItem<'bar'>) => {
                        const { data } = tooltipItem.dataset;
                        const numericData = (data as (number | null | { x: number, y: number })[])
                            .map(item => typeof item === 'number' ? item : item?.y)
                            .filter((item): item is number => item !== null && item !== undefined);
                        const minPrice = Math.min(...numericData);
                        const maxPrice = Math.max(...numericData);
                        return [
                            `€${tooltipItem.raw}`,
                            `Min: €${minPrice}`,
                            `Max: €${maxPrice}`
                        ];
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time of Day',
                },
            },
            y: {
                title: {
                    display: true,
                    text: apiDataItem.unit,
                },
            },
        },
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                Average Price: €{avgPrice.toFixed(2)}
            </div>
            <Bar ref={chartRef} data={chartData} options={options} />
        </div>
    );
};

export default ElectricityPriceBarChart;
