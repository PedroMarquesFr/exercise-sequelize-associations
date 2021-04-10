const bodyParser = require("body-parser");
const { Patient, Plan, Surgerie } = require("./models");
const express = require("express");
const router = require("./router");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`- ${req.method} ${req.path}`);
  next();
});

app.use(router);

app.use((err, req, res, next) => {
  res.status(500).send({ error: `${err} ou algum erro interno` });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Port: ${PORT}`);
});
