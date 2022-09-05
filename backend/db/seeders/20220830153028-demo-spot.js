'use strict';


const spots = [
  {
    ownerId: 2,
    address: "111 Demo Dome Drive",
    city: "Dimsdale",
    state: "Dimmesota",
    country:"United States",
    lat:101.15,
    lng:105.10,
    name:"Dimsdale-Demo-Dome",
    description:"auditorium",
    price:99.99
  },
  {
  ownerId: 3,
  address: "112 Dave Drive",
  city: "Dimsdale",
  state: "Dimmesota",
  country:"United States",
  lat:101.16,
  lng:105.10,
  name:"Daves place",
  description:"single home",
  price:19.99
},
{
  ownerId: 1,
  address: "1115 Danview Lane",
  city: "Demopolis",
  state: "Dimmesota",
  country:"United States",
  lat:141.16,
  lng:115.10,
  name:"Danview Villa",
  description:"condo",
  price:119.99
},
{
  ownerId: 5,
  address: "112 Demo Blvd",
  city: "Dimsdale",
  state: "Dimmesota",
  country:"United States",
  lat:121.16,
  lng:107.10,
  name:"Danielles warhouse",
  description:"warehouse",
  price:199.99
},
{
  ownerId: 4,
  address: "112 Debras circle",
  city: "Demotopia",
  state: "Dimmesota",
  country:"United States",
  lat:106.16,
  lng:155.10,
  name:"Daves place",
  description:"single home",
  price:19.99
},
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
