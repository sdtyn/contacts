const db = require("../models");
const Contact = db.contacts;
const Op = db.Sequelize.Op;

// Create a new contact
exports.create = (req, res) => {
  // Create a contact object
  const contact = {
    name: (req.body.name),
    surname: (req.body.surname),
    phone: (req.body.phone),
    birthdate: (req.body.birthdate),
    postalCode: (req.body.postalCode),
    city: (req.body.city),
    street: (req.body.street),
    houseNumber: (req.body.houseNumber)
  };
  // Save the contact
  Contact.create(contact)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contact."
      });
    });
};

// get contact count (for pagination)
exports.contactCount = (req, res) => {
  Contact.count({  })
    .then(data => {
      res.send({count: data});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting contact count"
      });
    });
};

// find all contacts by offset and limit (for listing)
exports.findAll = (req, res) => {
  Contact.findAll({ offset: Number(req.params.offset), limit: Number(req.params.limit) })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contacts."
      });
    });    
};

// Find contacts by name or surname (for search)
exports.findByName = (req, res) => {
  const param = req.params.name;
  var condition = param ? { [Op.or]: [{ name: {[Op.like]: `%${param}%`} }, { surname: {[Op.like]: `%${param}%`} }] } : null;

  Contact.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contacts."
      });
    });
};

// Find a single contact by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Contact.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Contact with id=" + id
      });
    });
};

// Update a contact by id
exports.update = (req, res) => {
  const id = req.params.id;

  Contact.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Contact was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Contact with id=${id}. Maybe Contact was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Contact with id=" + id
      });
    });
};

// Delete a contact by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Contact.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Contact was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Contact with id=" + id
      });
    });
};
