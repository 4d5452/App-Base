/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");

require("dotenv").config();

/**
 * Variables
 */
const app = express();
const port = process.env.PORT || "8000";

const srcPath = path.join(__dirname, 'src');
const publicPath = path.join(__dirname, 'public');
const distPath = path.join(__dirname, 'dist');

const defaultOptions = {
  root: publicPath,
  dotfiles: 'deny',
  headers: {
    'x-powered-by': 'LEFT_BLANK',
    'x-timestamp': Date.now(),
    'x-sent': true
  }
}

/**
 *  Configuration
 */

/** root public folder & dist*/
app.use('/', express.static(path.join(__dirname, "public")));
app.use('/dist', express.static(path.join(__dirname, "dist")));

/**
 * Routes Definitions
 */

app.get("/", (req, res, next) => {
  res.sendFile("./index.html", defaultOptions, function (err)  {
    if (err) {
      next(err);
    } else {
      // log file sent
    }
  });
});

/** Send all unknown request to 404 */
app.get("/*", (req, res, next) => {
    res.sendFile("./404.html", defaultOptions, function (err)  {
      if (err) {
        next(err);
      } else {
        // log file sent
      }
    });
});

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});