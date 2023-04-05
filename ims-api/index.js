const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const port = 3001;

const { knex, getRoot, getData, postData } = require('./app-control/control')

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  getRoot(req, res);
})

// get all data from a passed in table
app.get('/:entity', (req, res) => {
  var { entity } = req.params;
  entity === 'user' || entity === 'item' ? getData(req, res, `${entity}`) : res.status(204).send(`Unable to locate data for ${entity}.`)
})

// get an entity from a passed table by a passed id
app.get('/:entity/:id', (req, res) => {
  var { entity, id } = req.params;
  entity === 'user' || entity === 'item' ? getData(req, res, `${entity}`, id) : res.status(204).send(`Unable to locate data for ${entity}/${id}.`)
})

// post an entity using body content from a passed in table
// post user test: {"first_name":"newFirst","last_name":"newLast","username":"newAgain","password":"$2a$10$8pCR7KLxSO7Cd4ledsZB7ek9g/g4PZeL6NOKYoO8yLkHNURbB2dMa"}
// post item test: {"user_id": 1,"item_name":"new item","description":"new item description","quantity":"999"}
app.post("/:entity", async (req, res) => {
  var { entity } = req.params;
  await req;
  entity === 'user' || entity === 'item' ? postData(req, res, `${entity}`) : res.status(204).send(`Unable to post data for ${entity}/${id}.`)
})

app.listen(port, () => {console.log(`server listening on port ${port}`)})