// services/exportToExcel.ts
import * as XLSX from 'xlsx';
import { ChartData } from './parseDataToChartData';

const exportChartDataToExcel = (chartData, fileName: string = 'ElectricityPrices.xlsx') => {
    // Підготовка даних для Excel
    const worksheetData = chartData.labels.map((label, index) => ({
        Time: label,
        Price: `${chartData.datasets[0].data[index]} €`
    }));

    // Створення нового робочого аркуша Excel
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Створення нової книги Excel та додавання аркуша
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Electricity Prices');

    // Експорт та завантаження файлу
    XLSX.writeFile(workbook, fileName);
};

export default exportChartDataToExcel;
