module.exports = app => {
  const contacts = require("../controllers/contact.controller.js");

  var router = require("express").Router();

  // Create a new contact
  router.post("/create", contacts.create);

  // Retrieve all contacts
  router.get("/list/:offset/:limit", contacts.findAll);

   // contact count
  router.get("/count", contacts.contactCount);

  // Retrieve all contacts by name
  router.get("/name/:name", contacts.findByName);
  
  // Retrieve a single contact by id
  router.get("/:id", contacts.findOne);

  // Update a contact by id
  router.post("/update/:id", contacts.update);

  // Delete a contact by id
  router.delete("/:id", contacts.delete);

  app.use('/api/contacts', router);
};
