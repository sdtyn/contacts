module.exports = (sequelize, Sequelize) => {
  const Contact = sequelize.define("contact", {
    name: {
      type: Sequelize.STRING
    },
    surname: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    birthdate: {
      type: Sequelize.DATE
    },
    postalCode: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    street: {
      type: Sequelize.STRING
    },
    houseNumber: {
      type: Sequelize.STRING
    }
  });

  return Contact;
};
