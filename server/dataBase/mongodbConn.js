const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_CONN_STRING, {
        useFindAndModify: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("Database connection established");
    })
    .catch((err) => {
        console.log(`Error while connecting to database: ${err}`);
    });

module.exports = { mongoose };
