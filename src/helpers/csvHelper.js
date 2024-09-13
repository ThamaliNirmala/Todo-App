import { saveAs } from "file-saver";

// Function to convert JSON data to CSV format
const convertToCSV = (data) => {
  const csvRows = [];

  // Get the headers
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));

  data.forEach((row) => {
    const values = headers.map((header) => row[header]);
    csvRows.push(values.join(","));
  });

  return csvRows.join("\n");
};

// Function to handle download
const handleDownloadCSV = (tableData) => {
  const csvData = convertToCSV(tableData);
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, `table_data-${Date.now()}.csv`);
};

export const csvHelper = { handleDownloadCSV };
