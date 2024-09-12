const express = require("express");
const cors = require("cors");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const config = require("./config");

const app = express();

const server = http.createServer(app);
const io = socketIo(server);

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
      rowData.id = rindex;
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
    // Compare the new data with the previous data
    if (JSON.stringify(previousData) !== JSON.stringify(newData)) {
      console.log("Google Sheet data has changed");
      previousData = newData;
      res.write(`data: ${JSON.stringify(newData)}\n\n`);

      // console.log("backendRes:",res);
      // Emit new data to all connected clients
      // io.emit("sheetDataChanged", newData);
    } else {
      console.log("No changes detected");
    }
  } catch (error) {
    console.error("Error checking for changes:", error);
  }
}

// Poll the sheet for changes every 60 seconds
// setInterval(checkForChanges, 5000); // Check for changes every 1 minute

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send data to the client periodically
  // checkForChanges();
  // setInterval(() => {
  //   if (previousData != newData) {
  //     previousData = newData;
  //     res.write(`data: ${JSON.stringify({ message: newData })}\n\n`);
  //   }
  // }, 1000); // Check for changes every 1 minute
  setInterval(() => checkForChanges(res), 5000);
  // setInterval(() => {
  //   res.write(`data: ${JSON.stringify({ message: "Hello from SSE!" })}\n\n`);
  // }, 1000);
});
// API to get all rows
app.get("/api/sheets/rows", async (req, res) => {
  try {
    const sheet = await loadSheet();
    await sheet.loadCells();
    const rows = await sheet.getRows();
    const headers = sheet.headerValues;
    const resJson = convertToJSON(headers, rows);
    console.log("resJson:", resJson);
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
    console.log(newRowData);
    const sheet = await loadSheet();
    await sheet.addRow(newRowData);
    res.status(201).json({ message: "Row added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to update a row
app.put("/api/sheets/row/:index", async (req, res) => {
  try {
    const rowIndex = req.params.index;
    const updatedData = req.body;
    // await authenticate();
    const sheet = await loadSheet();
    const rows = await sheet.getRows();
    const row = rows[rowIndex];

    Object.keys(updatedData).forEach((key) => {
      row._rawData[config.headers[key]] = updatedData[key];
    });
    console.log("UpdatedRow:", row);
    await row.save();
    res.json({ message: "Row updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to delete a row
app.delete("/api/sheets/row/:index", async (req, res) => {
  try {
    const rowIndex = req.params.index;
    // await authenticate();
    const sheet = await loadSheet();
    const rows = await sheet.getRows();
    await rows[rowIndex].delete();
    res.json({ message: "Row deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// io.on("connection", (socket) => {
//   console.log("Client connected");

//   // Optionally, send the initial data to the client when they connect
//   socket.emit("initialData", previousData);

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
