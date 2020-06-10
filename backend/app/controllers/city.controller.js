const db = require("../models");
const City = db.cities;


// Get all Cities by postal code
exports.findCities = (req, res) => {
  const postalCode = req.params.postalCode;
  var condition = postalCode ? { postalCode: `${postalCode}` } : null;
    City.findAll({  where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cities."
      });
    });
};