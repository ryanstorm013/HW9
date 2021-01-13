const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./note_taker")));

require("./routes/path.js")(app);

app.listen(PORT, () => console.log(`Taco to http://localhost:${PORT}`));