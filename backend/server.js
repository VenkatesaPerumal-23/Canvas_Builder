const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");
const PDFDocument = require("pdfkit");

const app = express();
const PORT = 3000;

let canvas, ctx;
let elements = [];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const upload = multer({ dest: "uploads/" });

app.post("/init", (req, res) => {
  const { width, height } = req.body;
  canvas = createCanvas(parseInt(width), parseInt(height));
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);
  elements = [];
  res.json({ message: "Canvas initialized." });
});

app.post("/add/shape", (req, res) => {
  const { type, x, y, width, height, radius, color } = req.body;
  ctx.fillStyle = color || "#000";

  if (type === "rectangle") {
    ctx.fillRect(x, y, width, height);
  } else if (type === "circle") {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  } else {
    return res.status(400).json({ error: "Invalid shape type." });
  }

  elements.push({ type, x, y, width, height, radius, color });
  res.json({ message: `${type} added.` });
});

app.post("/add/text", (req, res) => {
  const { text, x, y, fontSize, color } = req.body;
  ctx.fillStyle = color || "#000";
  ctx.font = `${fontSize || 20}px Arial`;
  ctx.fillText(text, x, y);

  elements.push({ type: "text", text, x, y, fontSize, color });
  res.json({ message: "Text added." });
});

app.post("/add/image", upload.single("image"), async (req, res) => {
  const filePath = req.file ? path.join(__dirname, "uploads", req.file.filename) : null;
  try {
    const image = await loadImage(filePath);
    const { x, y, width, height } = req.body;
    ctx.drawImage(image, parseInt(x), parseInt(y), parseInt(width), parseInt(height));
    res.json({ message: "Image added." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image loading failed." });
  }
});

app.post('/export-pdf', upload.single('canvas'), (req, res) => {
    const imgPath = req.file.path;
    const outputPath = path.join(__dirname, 'uploads', 'output.pdf');

    const doc = new PDFDocument({ size: 'A4' });
    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);

    doc.image(imgPath, {
      fit: [500, 700],
      align: 'center',
      valign: 'center',
    });

    doc.end();

    writeStream.on('finish', () => {
      res.download(outputPath, 'canvas-export.pdf', () => {
        fs.unlinkSync(imgPath);
        fs.unlinkSync(outputPath);
      });
    });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
