import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (stack: any[]) => {
    if (!stack) return;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(stack);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Devices');
  
    const excelBuffer: ArrayBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'devices.xlsx');
};
export const exportToCSV = <T>(data: T[], fileName = "export.csv") => {
    if (!data || data.length === 0) return;
    const csv = XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(data));
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, fileName);
  };
