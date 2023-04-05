const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const port = 3001;

const { knex, getRoot } = require('./app-control/control')

app.use(express.json());
app.use(cors());

app.get('/', function (req, res) {
  getRoot(req, res);
})

app.get('/users', function (req, res) {
  getUsers(req, res);
})

app.listen(port, () => {console.log(`server listening on port ${port}`)})