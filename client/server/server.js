//! DEPENDENCIES
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

//! DATABASE CONNECTION
require("./dataBase/mongodbConn");

//! MIDDLEWARES
app.use(cors({
    origin: process.env.BASE_URL || 'http://localhost:3000',
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//! ROUTES
app.use("/user", require("./routes/user"));
app.use("/post", require("./routes/post"));
app.use("/comment", require("./routes/comment"));
app.use("/admin", require("./routes/admin"));

module.exports = { path: '/', handler: app }
