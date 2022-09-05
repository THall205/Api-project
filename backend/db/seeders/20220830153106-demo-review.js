'use strict';


const reviews = [

  {
    spotId:1,
    userId:3,
    review:"okay",
    stars: 3
  },
  {
    spotId:2,
    userId:4,
    review:"bad",
    stars: 2
  },
  {
    spotId:3,
    userId:5,
    review:"good",
    stars: 4
  },
   {
    spotId:4,
    userId:1,
    review:"great",
    stars: 5
  },
  {
    spotId:5,
    userId:2,
    review:"horrid",
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
