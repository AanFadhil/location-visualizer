const express = require("express");
const path = require("path");

const app = express();

// Static
app.use(express.static(path.join(__dirname, "public")));

// Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
