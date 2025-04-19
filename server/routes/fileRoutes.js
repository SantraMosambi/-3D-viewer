// server/routes/fileRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { generateToken, verifyToken } = require("../utils/tokenUtils");

const router = express.Router();

// ─── UPLOAD ROUTE ──────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// this will respond at POST http://localhost:5000/api/upload
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const fileId = req.file.filename;
  const token = generateToken({ fileId });
  const shareURL = `${process.env.BASE_URL}/view/${fileId}?token=${token}`;
  res.json({ shareURL });
});

// ─── SECURE VIEW ROUTE ────────────────────────────────────────────────────────
// this will respond at GET http://localhost:5000/api/secure/view/:fileId?token=...
router.get("/secure/view/:fileId", (req, res) => {
  const { fileId } = req.params;
  const { token } = req.query;
  if (!fileId || !token) {
    return res.status(400).json({ error: "Missing fileId or token" });
  }
  const decoded = verifyToken(token);
  if (!decoded || decoded.fileId !== fileId) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
  const filePath = path.join(__dirname, "../uploads", fileId);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }
  res.sendFile(filePath);
});

module.exports = router;
