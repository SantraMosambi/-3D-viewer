// server/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const fileRoutes = require("./routes/fileRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// all file‑related routes live under /api
app.use("/api", fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
