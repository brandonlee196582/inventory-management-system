const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const port = 3001;

const { knex, getRoot, getData, postData, patchData, deleteData, postLogin, postUsername } = require('./app-control/control')

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  getRoot(req, res);
})

// get all data from a passed in table
app.get('/:entity', (req, res) => {
  var { entity } = req.params;
  entity === 'user' || entity === 'item' ? getData(req, res, `${entity}`) : res.send(`Unable to locate data for ${entity}, table not found.`)
})

// get an entity from a passed in table by a passed in id
app.get('/:entity/:id', (req, res) => {
  var { entity, id } = req.params;
  entity === 'user' || entity === 'item' ? getData(req, res, `${entity}`, id) : res.send(`Unable to locate data for ${entity}/${id}, table not found.`)
})

// post an entity using body content from a passed in table
// post user test: {"first_name":"newFirst","last_name":"newLast","username":"newAgain","password":"$2a$10$8pCR7KLxSO7Cd4ledsZB7ek9g/g4PZeL6NOKYoO8yLkHNURbB2dMa"}
// post item test: {"user_id": 1,"item_name":"new item","description":"new item description","quantity":"999"}
app.post("/:entity", async (req, res) => {
  var { entity } = req.params;
  await req;
  entity === 'user' || entity === 'item' ? postData(req, res, `${entity}`) :
  entity === 'Login' ? postLogin(req, res) :
  entity === 'Username' ? postUsername(req, res) :
  res.status(204).send(`Unable to post data for ${entity}/${id}, table not found.`)
})

// update an entity's data within a passed in table by a passed in id
// removed user from patch for security
app.patch("/:entity/:id", async (req, res) => {
  var { entity, id } = req.params;
  await req;
  // entity === 'user' || entity === 'item' ? patchData(req, res, `${entity}`, id) : res.status(204).send(`Unable to update data for ${entity}/${id}, table not found.`)
  entity === 'item' ? patchData(req, res, `${entity}`, id) : res.status(204).send(`Unable to update data for ${entity}/${id}, table not found.`)
})

// delete an entity from a passed in table by a passed in id
app.delete("/:entity/:id", async (req, res) => {
  var { entity, id } = req.params;
  await req;
  entity === 'user' || entity === 'item' ? deleteData(req, res, `${entity}`, id) : res.status(204).send(`Unable to remove ${entity}/${id}, table not found.`)
})

app.listen(port, () => {console.log(`server gg listening on port ${port}`)})