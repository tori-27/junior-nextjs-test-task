import * as XLSX from 'xlsx';

const exportChartDataToExcel = (chartData, fileName: string = 'ElectricityPrices.xlsx') => {
    const worksheetData = chartData.labels.map((label, index) => ({
        Time: label,
        Price: `${chartData.datasets[0].data[index]} €`
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Electricity Prices');

    XLSX.writeFile(workbook, fileName);
};

export default exportChartDataToExcel;
