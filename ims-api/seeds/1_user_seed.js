const bcrypt = require('bcryptjs');
const saltRounds = 10;
const seedPassword = 'password';
var passHash = [];
for (let i = 0; i < 3; i++) {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(seedPassword, salt, (err, hash) => {
      passHash.push(hash);
    })
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_table').del()
  await knex('user_table').insert([
    {id: 1 ,first_name: 'userFirst1', last_name: 'userLast1', username: 'username1', password: passHash[0]},
    {id: 2 ,first_name: 'userFirst2', last_name: 'userLast2', username: 'username2', password: passHash[1]},
    {id: 3 ,first_name: 'userFirst3', last_name: 'userLast3', username: 'username3', password: passHash[2]}
  ]);
};
