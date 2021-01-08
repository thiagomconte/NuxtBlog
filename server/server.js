//! DEPENDENCIES
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

//! DATABASE CONNECTION
require("./dataBase/mongodbConn");

//! MIDDLEWARES
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//! ROUTES
app.use("/user", require("./routes/user"));
app.use("/post", require("./routes/post"));
app.use("/comment", require("./routes/comment"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`);
});
