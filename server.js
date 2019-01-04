// Load Packages
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Connect to MongoDB
const MONGOURL = process.env.MONGODB_URI || "mongodb://localhost:/fxrate-app";
mongoose.connect(
  MONGOURL,
  err => {
    console.log(err || `Connected to MongoDB at ${MONGOURL}`);
  }
);

// DEFINE MODEL
const FxRate = require('./models/fxrate');

// [Configure Server Logger]
app.use(logger('dev'));

// [Configure App to use sender POST]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));

// send the user to index html page inspite of the url
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

// [CONFIGURE ROUTER]
const router = require('./routes')(app, FxRate);

// [Configure Server Port]
const PORT = process.env.PORT || 8080;

app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
