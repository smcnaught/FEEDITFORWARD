const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Requiring our models for syncing
var db = require("./models");

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve up react client
// app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

// Start the API server
// embed in sequelize startup?

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {

    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});
