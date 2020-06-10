module.exports = (sequelize, Sequelize) => {
  const City = sequelize.define("city", {
    postalCode: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    }
  });


  // Create sample cities
  City.sync().then(() => {

    City.destroy({
      truncate: true
    });

    City.create({
      name: 'Neuss',
      postalCode: '41470'
    });
    City.create({
      name: 'Köln',
      postalCode: '50823'
    });
    City.create({
      name: 'Köln',
      postalCode: '50733'
    });
  });
  return City;
};