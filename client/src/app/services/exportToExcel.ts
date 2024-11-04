import * as XLSX from 'xlsx';
import { ChartData } from './parseDataToChartData';

const exportChartDataToExcel = (chartData: ChartData, fileName: string = 'ElectricityPrices.xlsx') => {
    if (!chartData.labels || !chartData.datasets || chartData.datasets.length === 0) {
        console.error("Invalid chart data structure:", chartData);
        return;
    }

    const worksheetData = chartData.labels.map((label, index) => ({
        Time: label,
        Price: `${chartData.datasets[0].data[index] ?? 'N/A'} €`
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Electricity Prices');

    XLSX.writeFile(workbook, fileName);
};

export default exportChartDataToExcel;
