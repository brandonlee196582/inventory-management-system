const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const port = 3001;

const { knex, getRoot, getData, getDataById } = require('./app-control/control')

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  getRoot(req, res);
})

// get all data from a passed in table
app.get('/:entity', (req, res) => {
  var { entity } = req.params;
  entity === 'user' || entity === 'item' ? getData(req, res, `${entity}`) : res.send(`Unable to locate data for ${entity}.`)
})

// get an entity from a passed table by a passed id
app.get('/:entity/:id', (req, res) => {
  var { entity, id } = req.params;
  entity === 'user' || entity === 'item' ? getData(req, res, `${entity}`, id) : res.send(`Unable to locate data for ${entity}/${id}.`)
})

// 
app.post("/:entity", async (req, res) => {
  var { entity } = req.params;
  await req;
  postUxo(req, res);
})

app.listen(port, () => {console.log(`server listening on port ${port}`)})