//! DEPENDENCIES
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var secure = require('ssl-express-www');
require("dotenv").config();

const app = express();
app.use(secure);

//! DATABASE CONNECTION
require("./dataBase/mongodbConn");

//! MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//! ROUTES
app.use("/user", require("./routes/user"));
app.use("/post", require("./routes/post"));
app.use("/comment", require("./routes/comment"));
app.use("/admin", require("./routes/admin"));

module.exports = { path: '/', handler: app }
