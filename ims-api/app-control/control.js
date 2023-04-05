
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

const patchData = (req, res, entity, id) => {
  var nonKeyMatchCount = 0;
  const userKeys = ['first_name', 'last_name', 'username', 'password']
  const itemKeys = ['user_id', 'item_name', 'description', 'quantity']
  if (entity === 'user') {
    Object.keys(req.body).forEach(key => {
      if (!userKeys.includes(key)) nonKeyMatchCount++;
    });
  } else {
    Object.keys(req.body).forEach(key => {
      if (!itemKeys.includes(key)) nonKeyMatchCount++;
    });
  }
  if (nonKeyMatchCount === 0) {
    knex(`${entity}_table`)
    .where("id", id)
    .modify((queryBuilder) => queryBuilder.update(req.body))
    .then(() => res.status(202).send(`Updated ${entity} data`))
    .catch((err) => {
        console.log(err)
        res.send(`Error updating ${entity} data`)
    })
  } else {
    res.send(`error updating ${entity}/${id}, object property missmatch in request body`)
  }
}

const deleteData = (req, res, entity, id) => {
  knex(`${entity}_table`)
  .where("id", id)
  .del()
  .then(() => res.status(200).send(`Removed ${entity}/${id}`))
  .catch((err) => {
    console.log(err)
    res.send(`Error removing ${entity}/${id}`)
  })
}

module.exports = { knex, getRoot, getData, postData, patchData, deleteData };