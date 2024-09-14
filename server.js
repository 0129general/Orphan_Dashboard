const express = require("express");
const cors = require("cors");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

const config = require("./config");
const app = express();

app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));

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
      rowData[header] = row._rawData[index] || ""; // Assign empty string if value is undefined
    });
    return rowData;
  });
  return jsonData;
}

async function fetchSheetData(sheet) {
  const rows = await sheet.getRows(); // Get all the rows in the sheet
  return rows.map((row) => row._rawData); // Extract raw data from each row
}

let previousData = [];
let newData = [];
async function checkForChanges(res) {
  try {
    const sheet = await loadSheet();
    newData = await fetchSheetData(sheet);
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

// Poll the sheet for changes every 60 seconds
// setInterval(checkForChanges, 5000); // Check for changes every 1 minute
app.get("/sheets/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  setInterval(() => checkForChanges(res), 5000);
});
// API to get headers
app.get("/api/sheets/headers", async (req, res) => {
  try {
    const sheet = await loadSheet();
    await sheet.loadHeaderRow(); // Load the header row (typically the first row)
    const headers = sheet.headerValues; // Get the column names
    res.status(200).json(headers); // Send the headers as JSON
  } catch (error) {
    res.status(500).send("Error retrieving headers");
  }
});

// API to get all rows
app.get("/api/sheets/rows", async (req, res) => {
  try {
    const sheet = await loadSheet();
    // await sheet.loadCells();
    const rows = await sheet.getRows();
    const headers = sheet.headerValues;
    const resJson = convertToJSON(headers, rows);
    // console.log("resJson:", resJson);
    res.json(resJson);
    // res.json(rows.map(row => row._rawData)); // Send raw data to the client
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to add a new row
app.post("/api/sheets/row", async (req, res) => {
  try {
    const newRowData = req.body;
    // await authenticate();
    // console.log(newRowData);
    const sheet = await loadSheet();
    const rows = await sheet.getRows();

    const headers = sheet.headerValues;
    // console.log("headers:",headers)
    // Check if there are existing rows
    let lastId = 0;
    const identity = headers[0];
    if (rows.length > 0) {
      // Get the last row and extract the current 'identity' from the 'identity' column
      const lastRow = rows[rows.length - 1];
      lastId = parseInt(lastRow._rawData[0], 10); // Assuming 'identity' is the header for the identity column
    }

    // Create the new row data, incrementing the 'identity' by 1
    const newIdentity = lastId + 1;
    const newRow = { [identity]: newIdentity, ...newRowData };
    await sheet.addRow(newRow);
    res.status(201).json({ message: "Row added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to update a row
app.put("/api/sheets/row/:id", async (req, res) => {
  try {
    const rowId = req.params.id;
    const updatedData = req.body;
    const sheet = await loadSheet();
    const rows = await sheet.getRows();
    const rowToUpdate = rows.find((row) => row._rawData[0] === rowId);
    if (rowToUpdate == undefined) {
      res.json({ message: "The id not exist" });
      return;
    }
    Object.keys(updatedData).forEach((key) => {
      console.log("headers:", config.headers);
      rowToUpdate._rawData[config.headers[key]] = updatedData[key];
    });
    await rowToUpdate.save(); // Save the updated row
    res.json({ message: "Row updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to delete a row
app.delete("/api/sheets/row/:id", async (req, res) => {
  try {
    const rowId = req.params.id;
    // await authenticate();
    const sheet = await loadSheet();
    const rows = await sheet.getRows();
    const rowToDelete = rows.find((row) => row._rawData[0] === rowId);
    if (rowToDelete == undefined) {
      res.json({ message: "The id not exist" });
      return;
    }
    await rowToDelete.delete(); // Save the updated row
    res.json({ message: "Row deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
