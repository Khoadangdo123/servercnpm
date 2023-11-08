const express = require("express");
const bodyParser = require("body-parser")
const cors = require('cors')

const app = express();
const port = 3000;
const db = require('./Database.js')

const authRouter = require("./routes/FormDangNhap.js");
const qldd = require("./routes/QLDD.js");
const qltk = require('./routes/QLTK.js');
const qlsp = require("./routes/QLSP.js");
const qlpk = require("./routes/QLPK.js");
const qlhdnhap = require('./routes/QLHDNhap.js');
const qlncc = require('./routes/QLNCC.js');
const qlhd = require('./routes/QLHD.js')
app.use(cors())
// app.use(bodyParser.json());
// app.use(express.json());

app.use("/formdangnhap", bodyParser.json(), authRouter);
app.use(
  '/QL', 
  bodyParser.json(),
  qldd, 
  qltk, 
  qlsp, 
  qlpk,
  qlhdnhap,
  qlncc,
  qlhd
);


// Connect

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});