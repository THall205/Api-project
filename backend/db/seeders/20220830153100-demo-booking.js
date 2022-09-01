'use strict';


const bookings = [
  {
    spotId:1,
    userId:3,
    startDate: new Date('2022-08-31'),
    endDate: new Date('2022-09-02')
  },
  {
    spotId:1,
    userId:1,
    startDate: new Date('2022-09-01'),
    endDate: new Date('2022-09-07')
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
     * }], {});    *
    */
await queryInterface.bulkInsert('Bookings',bookings)

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
await queryInterface.bulkDelete('Bookings',{
  where:{userId: bookings.map(booking => booking.userId)}
})

  }
};
