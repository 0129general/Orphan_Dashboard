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
  process.env.GOOGLE_SHEET_ID,
  serviceAccountAuth
);

async function loadSheet() {
  await doc.loadInfo(); // Load the spreadsheet
  const sheet = doc.sheetsByIndex[0]; // Select the first sheet (you can choose any index)
  await sheet.loadCells();
  return sheet;
}

app.post(`/api/sheets/save`,async(req, res)=>{
  console.log("config-Headers:",config.headers)
  console.log("saveReq:", req.body)
})

app.get(`/api/sheets/:id`, async(req, res)=>{
  console.log("req:",req.params?.id)
  const id=req.params?.id;
  try{
    const sheet=await loadSheet();
    const rows = await sheet.getRows();
    const headers = sheet.headerValues;
    console.log("headers:", headers);
    const row= rows[id];
    console.log("row:",rows[id]);
    const rowData = {};
    headers.forEach((header, index) => {
        rowData.id = id;
        rowData[header] = row._rawData[index] || ""; // Assign empty string if value is undefined
    });
    res.json({value:rowData});
  }
  catch(err){
    console.log(err.message);
    res.status(500).json({ err: err.message });
  }
})
app.get("/api/sheets", async (req, res) => {
  try {
    await doc.loadInfo();
    const worksheet = doc.sheetsByIndex[0]; // Here, 1st tab on Google Spreadsheet is used.
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
