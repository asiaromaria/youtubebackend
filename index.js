const connectDB = require("./startup/db");
const express = require("express");

const app = express();
const collections = require("./routes/collections");


connectDB();

app.use(express.json());
app.use("/api/collections", collections);

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server Start on Port: ${port}`);
});
