// utils/googleSheetHelper.js
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const doc = new GoogleSpreadsheet(
  process.env.GOOGLE_SHEET_ID,
  serviceAccountAuth
);
let previousData = [];

async function loadSheet() {
  await doc.loadInfo();
  return doc.sheetsByIndex[0];
}

function convertToJSON(headers, rows) {
  return rows.map((row) => {
    const rowData = {};
    headers.forEach((header, index) => {
      rowData[header] = row._rawData[index] || "";
    });
    return rowData;
  });
}

async function fetchSheetData(sheet) {
  const rows = await sheet.getRows();
  return rows.map((row) => row._rawData);
}

async function checkForChanges(res) {
  try {
    const sheet = await loadSheet();
    const newData = await fetchSheetData(sheet);
    if (JSON.stringify(previousData) !== JSON.stringify(newData)) {
      previousData = newData;
      await sheet.loadCells();
      const rows = await sheet.getRows();
      const headers = sheet.headerValues;
      const resJson = convertToJSON(headers, rows);
      console.log("Google Sheet data has changed");
      res.write(`data: ${JSON.stringify(resJson)}\n\n`);
    } else {
      console.log("No changes detected");
    }
  } catch (error) {
    console.error("Error checking for changes:", error);
  }
}

module.exports = {
  loadSheet,
  fetchSheetData,
  convertToJSON,
  checkForChanges,
};
