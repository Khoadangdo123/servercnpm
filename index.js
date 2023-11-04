const express = require("express");
const bodyParser = require("body-parser")

const app = express();
const port = 3000;
const db = require('./Database.js')

const authRouter = require("./routes/FormDangNhap.js");


// app.use(bodyParser.json());
// app.use(express.json());

app.use("/formdangnhap", bodyParser.json(), authRouter);


// Connect


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});