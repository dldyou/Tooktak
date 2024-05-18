import * as XLSX from "xlsx";
import {parseAndFormatDate} from "./date";

export function handleFileUpload(event, initXlsx) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });

        const headers = json[0];
        const data={};
        json.slice(1).forEach(row => {
            let rowData = {};
            row.forEach((cell, index) => {
                rowData[headers[index]] = String(cell);  // Forcefully convert cell values to string
            });
            const key = parseAndFormatDate(rowData["검사일자"]) + "/" + rowData["환자명"];
            data[key] = rowData;
        });
        initXlsx(data);
    };
    reader.readAsBinaryString(file);
}