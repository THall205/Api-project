'use strict';


const reviews = [
  {
    spotId:1,
    userId:1,
    review:"good",
    stars: 4

  },
  {
    spotId:1,
    userId:3,
    review:"bad",
    stars: 1

  }
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
   await queryInterface.bulkInsert('Reviews',reviews)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
   await queryInterface.bulkDelete("Reviews",{
    where:{userId: reviews.map(userId => userId.userId)}
   })

  }
};
