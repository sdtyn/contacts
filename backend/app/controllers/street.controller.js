const db = require("../models");
const Street = db.streets;

// Find all Streets by city and postal code
exports.findStreets = (req, res) => {
  const city = req.params.city;
  const postalCode = req.params.postalCode;
  var condition = city ? { city: `${city}` , postalCode: `${postalCode}` } : null;

  Street.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving streets."
      });
    });
};