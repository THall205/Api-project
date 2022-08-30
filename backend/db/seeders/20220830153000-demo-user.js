'use strict';

const users =[
 {
  username:"Demo1",
  email:"DemoDan@demo.com",
  hashedPassword:"Needs",
  firstName:"Dan",
  lastName:"Demo"

 },
 {
  username:"Demo2",
  email:"DemoDoug@demo.com",
  hashedPassword:"To-Get",
  firstName:"Doug",
  lastName:"Demodome"

 },
 {
  username:"Demo3",
  email:"DemoDave@demo.com",
  hashedPassword:"Hashed",
  firstName:"Dave",
  lastName:"Demo"

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
   await queryInterface.bulkInsert('Users',users)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
   await queryInterface.bulkDelete('Users',{
    where:{username:users.map(user => user.username)}
   })

  }
};
