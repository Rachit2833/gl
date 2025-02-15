const express = require("express");
const multer = require("multer");
const ExcelJS = require("exceljs");

const app = express();
const port = 2833;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("File received:", req.file);
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer);
    const worksheet = workbook.worksheets[0];
    const rows = [];

    worksheet.eachRow((row, rowNumber) => {
      rows.push(row.values.slice(1));
    });

    console.log("Excel Data:", rows);

    res.status(200).json({
      success: true,
      message: "File processed successfully",
      data: rows,
    });
  } catch (error) {
    console.error("Processing error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
