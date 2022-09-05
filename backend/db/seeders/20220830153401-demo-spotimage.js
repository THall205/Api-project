'use strict';


const spotimages = [
  {
    spotId:1,
    url:"www.mypics.com",
    preview:false
  },
  {
    spotId:2,
    url:"www.mypics.com",
    preview:false
  },
  {
    spotId:3,
    url:"www.mypics.com",
    preview:true
  },
  {
    spotId:4,
    url:"www.mypics.com",
    preview:true
  },
  {
    spotId:5,
    url:"www.mypics.com",
    preview:false
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('SpotImages',spotimages)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
   await queryInterface.bulkDelete('SpotImages',{
    where:{spotId:spotimages.map(image => image.spotId)}
  })

  }
};
