import React from 'react';
import exportChartDataToExcel from "@/app/services/exportToExcel";
import {ChartData} from "@/app/services/parseDataToChartData";

type ExportButtonProps = {
    chartData: ChartData;
    fileName?: string;
};

const ExportButton: React.FC<ExportButtonProps> = ({ chartData,  fileName = 'ElectricityPrices.xlsx' }) => {
    const handleExport = () => {
        console.log("Here is data", chartData);
        exportChartDataToExcel(chartData, fileName);
    };

    return (
        <button
            onClick={handleExport}
            className="bg-pink-500 text-white px-4 py-2 rounded shadow hover:bg-pink-600"
        >
            Export to Excel
        </button>
    );
};

export default ExportButton;
