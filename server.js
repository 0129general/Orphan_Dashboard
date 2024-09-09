const express = require('express');
const cors = require('cors');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require("google-auth-library");
// const { config } = require('dotenv');
// require("dotenv").config();
const config=require('./config');
// const { config } = require('dotenv');

const app = express();
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));

// const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

// async function authenticate() {
//   await doc.useServiceAccountAuth({
//     client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//     private_key: process.env.GOOGLE_PRIVATE_KEY,
//   });
// }
const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  
  // console.log(serviceAccountAuth);
  
  const doc = new GoogleSpreadsheet(
    process.env.GOOGLE_SHEET_ID,
    serviceAccountAuth
  );

async function loadSheet() {
  await doc.loadInfo();
  return doc.sheetsByIndex[0]; // Access the first sheet
}

function convertToJSON(headers, rows) {
    const jsonData = rows.map((row, rindex) => {
        const rowData = {};
        headers.forEach((header, index) => {
            rowData.id = rindex;
            rowData[header] = row._rawData[index] || ""; // Assign empty string if value is undefined
        });
        return rowData;
      });
    return jsonData;
  }

// API to get all rows
app.get('/api/rows', async (req, res) => {
  try {
    // await authenticate();
    const sheet = await loadSheet();
    await sheet.loadCells();
    const rows = await sheet.getRows();
    const headers = sheet.headerValues;
    const resJson= convertToJSON(headers,rows);
    console.log("resJson:",resJson);
    res.json(resJson)
    // res.json(rows.map(row => row._rawData)); // Send raw data to the client
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 
});

// API to add a new row
app.post('/api/row', async (req, res) => {
  try {
    const newRowData = req.body;
    // await authenticate();
    console.log(newRowData);
    const sheet = await loadSheet();
    await sheet.addRow(newRowData);
    res.status(201).json({ message: 'Row added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to update a row
app.put('/api/row/:index', async (req, res) => {
  try {
    const rowIndex = req.params.index;
    const updatedData = req.body;
    // await authenticate();
    const sheet = await loadSheet();
    const rows = await sheet.getRows();
    const row = rows[rowIndex];

    Object.keys(updatedData).forEach(key => {
      row._rawData[config.headers[key]] = updatedData[key];
    });
    console.log("UpdatedRow:",row)
    await row.save();
    res.json({ message: 'Row updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to delete a row
app.delete('/api/row/:index', async (req, res) => {
  try {
    const rowIndex = req.params.index;
    // await authenticate();
    const sheet = await loadSheet();
    const rows = await sheet.getRows();
    await rows[rowIndex].delete();
    res.json({ message: 'Row deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
