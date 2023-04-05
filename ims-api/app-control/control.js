
const knex = require("knex")(require("../knexfile.js")[process.env.NODE_ENV || "development"]);

const getRoot = (req, res) => {
    res.status(200).send('server up')
}

const getData = (req, res, entity, id) => {
  if (id) {
    knex
    .select('*')
    .where({id: id})
    .from(`${entity}_table`)
    .then(data => res.status(200).send(data))
  } else {
    knex
    .select('*')
    .from(`${entity}_table`)
    .then(data => res.status(200).send(data))
  }
}



module.exports = { knex, getRoot, getData };