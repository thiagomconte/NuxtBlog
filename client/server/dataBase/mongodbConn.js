const mongoose = require("mongoose");

mongoose
    .connect("mongodb+srv://guevers:2402conte@cluster0-qalff.mongodb.net/BlogSP?retryWrites=true&w=majority", {
        useFindAndModify: false,
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
