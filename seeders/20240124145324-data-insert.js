'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let dataProfile = JSON.parse(fs.readFileSync('./data/profiles.json', 'utf-8'))
    dataProfile.forEach(profile => {
      profile.createdAt = new Date(),
      profile.updatedAt = new Date()
    })

    let dataUser = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'))
    dataUser.forEach(user => {
      user.createdAt = new Date(),
      user.updatedAt = new Date()
    })

    let dataAuthor = JSON.parse(fs.readFileSync('./data/authors.json', 'utf-8'))
    dataAuthor.forEach(author => {
      author.createdAt = new Date(),
      author.updatedAt = new Date()
    })

    let dataBook = JSON.parse(fs.readFileSync('./data/books.json', 'utf-8'))
    dataBook.forEach(book => {
      book.createdAt = new Date(),
      book.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Profiles', dataProfile, {})
    await queryInterface.bulkInsert('Users', dataUser, {})
    await queryInterface.bulkInsert('Authors', dataAuthor, {})
    await queryInterface.bulkInsert('Books', dataBook, {})

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Profiles', null, {})
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Authors', null, {})
    await queryInterface.bulkDelete('Books', null, {})

  }
};
