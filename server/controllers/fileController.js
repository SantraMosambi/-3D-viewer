const { generateToken } = require("../utils/tokenUtils");
const path = require("path");

exports.handleUpload = (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const fileId = req.file.filename;
  const token = generateToken({ fileId });
  const shareURL = `${process.env.BASE_URL}/view/${fileId}?token=${token}`;
  res.json({ shareURL });
};
