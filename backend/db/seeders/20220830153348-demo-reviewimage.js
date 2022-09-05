'use strict';


const reviewimages = [
  {
    reviewId:1,
    url:"www.mypics.com"
  },
  {
    reviewId:2,
    url:"www.mypics.com"
  },
  {
    reviewId:3,
    url:"www.mypics.com"
  },
  {
    reviewId:4,
    url:"www.mypics.com"
  },
  {
    reviewId:5,
    url:"www.mypics.com"
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
   await queryInterface.bulkInsert('ReviewImages',reviewimages)

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ReviewImages',{
      where:{reviewId: reviewimages.map(image => image.reviewId)}
    })
  }
};
