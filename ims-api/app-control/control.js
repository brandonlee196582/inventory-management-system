
const knex = require("knex")(require("../knexfile.js")[process.env.NODE_ENV || "development"]);

const getRoot = (req, res) => {
    res.status(200).send('server up')
}

const getRootNew = (req, res) => {
  res.status(200).send('server up')
}

module.exports = { knex, getRoot };