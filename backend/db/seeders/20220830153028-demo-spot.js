'use strict';


const spots = [
  {
    ownerId: 2,
    address: "111 Demo Dome Drive",
    city: "Dimsdale",
    State: "Dimmesota",
    country:"United States",
    lat:101.15,
    lng:105.10,
    name:"Dimsdale-Demo-Dome",
    description:"auditorium",
    price:99.99
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {

await queryInterface.bulkInsert('Spots',spots)

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Spots',{
      where:{name: spots.map(spot => spot.name)}
     })
  }
};
