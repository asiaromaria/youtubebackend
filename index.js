const connectDB = require("./startup/db");
const express = require("express");

const app = express();
const comments = require("./routes/comments");


connectDB();

app.use(express.json());
app.use("/api/comments", comments);

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server Start on Port: ${port}`);
});



//08.18.2021 - meeting ended with the following needing to be worked on tomorrorw. Need to establish connection to the replySchema