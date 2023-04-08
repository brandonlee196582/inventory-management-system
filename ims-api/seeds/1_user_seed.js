const bcrypt = require('bcryptjs');
const saltRounds = 10;
const seedPassword = 'password';
var passHash = [];
for (let i = 0; i < 15; i++) {
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
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "username": "jdoe",
      password: passHash[0]
    },
    {
      "id": 2,
      "first_name": "Jane",
      "last_name": "Smith",
      "username": "jsmith",
      password: passHash[1]
    },
    {
      "id": 3,
      "first_name": "Bob",
      "last_name": "Johnson",
      "username": "bjohnson",
      password: passHash[2]
    },
    {
      "id": 4,
      "first_name": "Sara",
      "last_name": "Williams",
      "username": "swilliams",
      password: passHash[3]
    },
    {
      "id": 5,
      "first_name": "Alex",
      "last_name": "Brown",
      "username": "abrown",
      password: passHash[4]
    },
    {
      "id": 6,
      "first_name": "Emily",
      "last_name": "Davis",
      "username": "edavis",
      password: passHash[5]
    },
    {
      "id": 7,
      "first_name": "Mike",
      "last_name": "Johnson",
      "username": "mjohnson",
      password: passHash[6]
    },
    {
      "id": 8,
      "first_name": "Kim",
      "last_name": "Nguyen",
      "username": "knguyen",
      password: passHash[7]
    },
    {
      "id": 9,
      "first_name": "David",
      "last_name": "Lee",
      "username": "dlee",
      password: passHash[8]
    },
    {
      "id": 10,
      "first_name": "Amy",
      "last_name": "Kim",
      "username": "akim",
      password: passHash[9]
    },
    {
      "id": 11,
      "first_name": "Tom",
      "last_name": "Wilson",
      "username": "twilson",
      password: passHash[10]
    },
    {
      "id": 12,
      "first_name": "Rachel",
      "last_name": "Chen",
      "username": "rchen",
      password: passHash[11]
    },
    {
      "id": 13,
      "first_name": "Mark",
      "last_name": "Garcia",
      "username": "mgarcia",
      password: passHash[12]
    },
    {
      "id": 14,
      "first_name": "Laura",
      "last_name": "Perez",
      "username": "lperez",
      password: passHash[13]
    },
    {
      "id": 15,
      "first_name": "Kevin",
      "last_name": "Chang",
      "username": "kchang",
      password: passHash[14]
    }
  ]);
};
