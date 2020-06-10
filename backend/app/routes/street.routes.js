module.exports = app => {
  const streets = require("../controllers/street.controller.js");

  var router = require("express").Router();

  // Get all streets by postal code and city
  router.get("/:postalCode/:city", streets.findStreets);

  app.use('/api/streets', router);
};
