module.exports = app => {
  const city = require("../controllers/city.controller.js");

  var router = require("express").Router();

  // Retrieve cities by postal code
  router.get("/:postalCode", city.findCities);

  app.use('/api/cities', router);
};
