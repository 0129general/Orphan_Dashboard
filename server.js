const express = require("express");
const { google } = require("googleapis");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");

const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

const app = express();
const port = process.env.PORT || 5000;

// const sheets = google.sheets({ version: "v4", auth: config.apiKey });  

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// console.log(serviceAccountAuth);

const doc = new GoogleSpreadsheet(
  "1RN32yHsBpdMmXD6P3cCT09oq-d1VsBVgCYBDlt38KFI",
  serviceAccountAuth
);

app.get("/api/sheets", async (req, res) => {
  try {
    await doc.loadInfo();
    // console.log(doc);
    const worksheet = doc.sheetsByIndex[0]; // Here, 1st tab on Google Spreadsheet is used.
    // const values = [
    //       { a: "123", b: "456" },
    //       { a: "321", b: "654" },
    //     ];
    //     await worksheet.setHeaderRow(["a", "b"]); // This is the header row.
    //     await worksheet.addRows(values); // Your value is put to the sheet.
    // const response = await sheets.spreadsheets.values.get({
    //   spreadsheetId: config.googleSheetId,
    //   range: "Sheet1!A1:D10",
    // });
    // const jsonData = {};
    await worksheet.loadCells();
    const rows = await worksheet.getRows();
    const headers = worksheet.headerValues;
    console.log(headers);
    rowsData = rows.map((row) => row._rawData);
    const flag=[0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,0]
    //A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z
    //D,E,F,H,O,R,U,W
    const jsonData = rows.map((row, rindex) => {
      const rowData = {};
      headers.forEach((header, index) => {
        if(flag[index]){
          rowData.id = rindex;
          rowData[header] = row._rawData[index] || ""; // Assign empty string if value is undefined
        }
      });
      return rowData;
    });
    console.log(jsonData);
    res.json({ values: jsonData });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
