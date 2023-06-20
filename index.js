require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./router");
const mongoose = require("mongoose");

try {
  const db = mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database connected");
} catch (error) {
  console.log(error);
}

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
