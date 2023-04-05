const bcrypt = require('bcryptjs');
const saltRounds = 10;
const seedPassword = 'password';
var passHash = '';
bcrypt.genSalt(saltRounds, (err, salt) => {
  bcrypt.hash(seedPassword, salt, (err, hash) => {
    passHash = hash;
  })
})

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE user CASCADE')
  await knex('user').del()
  await knex('user').insert([
    {first_name: 'userFirst1', last_name: 'userLast1', username: 'username1', password: passHash},
    {first_name: 'userFirst2', last_name: 'userLast1', username: 'username1', password: passHash},
    {first_name: 'userFirst3', last_name: 'userLast1', username: 'username1', password: passHash}
  ]);
};
