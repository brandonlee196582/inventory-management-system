
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

const postData = (req, res, entity) => {
  var missingKeyCount = 0;
  const userKeys = ['first_name', 'last_name', 'username', 'password']
  const itemKeys = ['user_id', 'item_name', 'description', 'quantity']
  if (entity === 'user') {
    userKeys.forEach(key => {
      if (!Object.keys(req.body).includes(key)) missingKeyCount++;
    });
  } else {
    itemKeys.forEach(key => {
      if (!Object.keys(req.body).includes(key)) missingKeyCount++;
    });
  }
  if (missingKeyCount === 0) {
    return knex(`${entity}_table`)
    .insert(req.body)
    .then(() => {
      res.status(201).send(`added new ${entity}`);
    })
    .catch((err) => {
      console.log(err);
      res.send(`error adding new ${entity}`)
    })
  } else {
    res.send(`error adding new ${entity}, missing object properties in request body`)
  }
}

module.exports = { knex, getRoot, getData, postData };