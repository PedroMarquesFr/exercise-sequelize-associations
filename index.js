const bodyParser = require("body-parser");
const { Patient, Plan, Surgerie } = require("./models");
const express = require("express");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/listPatientWithPlan", (req, res) => {
  console.log("entrei");
  Patient.findAll({
    include: [{ model: Plan, as: "plan" }],
  }).then((resp) => res.json(resp));
});
app.get("/findPatient/:id", async (req, res) => {
  const { id } = req.params;
  const resp = await Patient.findByPk(id);
  return res.json(resp);
});
app.get("/listPatientWithSurgerie", (req, res) => {
  console.log("entrei");
  Patient.findAll({
    include: [{ model: Surgerie, as: "surgery" }],
  }).then((resp) => res.json(resp));
});
app.get("/listSurgerieWithPatient", (req, res) => {
  console.log("entrei");
  Surgerie.findAll({
    include: [{ model: Patient, as: "patients" }],
  }).then((resp) => res.json(resp));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Port: ${PORT}`);
});
