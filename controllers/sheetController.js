// controllers/sheetController.js
const config = require("../utils/config");
const {
  loadSheet,
  fetchSheetData,
  convertToJSON,
  checkForChanges,
} = require("../utils/googleSheetHelper");

exports.sheetEvents = async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  setInterval(() => checkForChanges(res), 5000);
};

exports.getHeaders = async (req, res) => {
  try {
    const sheet = await loadSheet();
    await sheet.loadHeaderRow();
    const headers = sheet.headerValues;
    res.status(200).json({ res: headers });
  } catch (error) {
    res.status(500).send("Error retrieving headers");
  }
};

exports.getRows = async (req, res) => {
  try {
    const sheet = await loadSheet();
    const rows = await sheet.getRows();
    const headers = sheet.headerValues;
    const resJson = convertToJSON(headers, rows);
    res.json({ res: resJson });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addRow = async (req, res) => {
  try {
    const newRowData = req.body;
    const sheet = await loadSheet();
    const rows = await sheet.getRows();
    const headers = sheet.headerValues;

    let lastId =
      rows.length > 0 ? parseInt(rows[rows.length - 1]._rawData[0], 10) : 0;
    const newIdentity = lastId + 1;
    const newRow = { [headers[0]]: newIdentity, ...newRowData };

    await sheet.addRow(newRow);
    res.status(201).json({ message: "Row added successfully", res: newRow });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRow = async (req, res) => {
  try {
    const rowId = req.params.id;
    const updatedData = req.body;
    const sheet = await loadSheet();
    const rows = await sheet.getRows();
    const rowToUpdate = rows.find((row) => row._rawData[0] === rowId);

    if (!rowToUpdate) {
      return res.status(404).json({ message: "The ID does not exist" });
    }

    Object.keys(updatedData).forEach((key) => {
      rowToUpdate._rawData[config.headers[key]] = updatedData[key];
    });
    await rowToUpdate.save();
    res.json({ message: "Row updated successfully", res: updatedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRow = async (req, res) => {
  try {
    const rowId = req.params.id;
    const sheet = await loadSheet();
    const rows = await sheet.getRows();
    const rowToDelete = rows.find((row) => row._rawData[0] === rowId);

    if (!rowToDelete) {
      return res.status(404).json({ message: "The ID does not exist" });
    }

    await rowToDelete.delete();
    res.json({ message: "Row deleted successfully", res: rowId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
