module.exports = (sequelize, Sequelize) => {
  const Street = sequelize.define("street", {
    name: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    postalCode: {
      type: Sequelize.STRING
    }
  });
  

  Street.sync().then(() => {

    Street.destroy({
      truncate: true
    });

    Street.create({
      name: 'Ahornstr.',
      city: 'Neuss',
      postalCode: "41470"
    });
    Street.create({
      name: 'Ackerweg',
      city: 'Neuss',
      postalCode: "41470"
    });
    Street.create({
      name: 'Im Hawisch',
      city: 'Neuss',
      postalCode: "41470"
    });
    Street.create({
      name: 'Erlenstr.',
      city: 'Neuss',
      postalCode: "41470"
    });
    Street.create({
      name: 'Gutenbergstr.',
      city: 'Köln',
      postalCode: "50823"
    });
    Street.create({
      name: 'Liebigstr.',
      city: 'Köln',
      postalCode: "50823"
    });
    Street.create({
      name: 'Vernloerstr.',
      city: 'Köln',
      postalCode: "50823"
    });
    Street.create({
      name: 'Neusserstr.',
      city: 'Köln',
      postalCode: "50733"
    });
    Street.create({
      name: 'Innerekanalstr.',
      city: 'Köln',
      postalCode: "50733"
    });

  });

  return Street;
};
