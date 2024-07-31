import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { createToast } from '@/utils/toast';


export const usersFileUploading = (e: any, setData: React.Dispatch<any>) => {
    const file = e.target.files[0];
    const fileExtension = file.name.split('.').pop();
    
    // handle excel files
    if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        const reader = new FileReader();

        reader.onload = (event: any) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            // return jsonData; 
            setData(jsonData);
        };
        reader.readAsBinaryString(file);
    } else if (fileExtension === 'csv') {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                  setData(result.data);
            },
        });
    } else {
        createToast("error", "Unsupported file format!")
    }
   
}