const express = require("express");
const { Patient, Plan, Surgerie } = require("./models");
const router = express.Router();

router.get("/listPatientWithPlan", (req, res) => {
  console.log("entrei");
  Patient.findAll({
    include: [{ model: Plan, as: "plan" }],
  }).then((resp) => res.json(resp));
});

router.get("/findPatient/:id", async (req, res) => {
  const { id } = req.params;
  const resp = await Patient.findByPk(id);
  return res.json(resp);
});

router.get("/listPatientWithSurgerie", (req, res) => {
  console.log("entrei");
  Patient.findAll({
    include: [{ model: Surgerie, as: "surgery" }],
  }).then((resp) => res.json(resp));
});

router.get("/listPatientWithSurgeriePrivate", async (req, res) => {
  const resp = await Patient.findAll({
    include: [{ model: Surgerie, as: "surgery" }],
  });
  resp.forEach(({ surgery }, idx1) =>
    surgery.forEach(
      ({ doctor }, idx2) => (resp[idx1].surgery[idx2].doctor = undefined)
    )
  );

  return res.json(resp);
});

router.get("/listSurgerieWithPatient", (req, res) => {
  console.log("entrei");
  Surgerie.findAll({
    include: [{ model: Patient, as: "patients" }],
  }).then((resp) => res.json(resp));
});

router.get("/patientsByPlan/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const patientsWithPlan = await Patient.findAll({ where: { plan_id: id } });
    return res.json(patientsWithPlan);
  } catch (err) {
    res.send("deu ruim");
    return err;
  }
});

router.post("/patient", async (req, res) => {
  const { fullname, plan_id } = req.body;

  try {
    const resp = await Patient.create({ fullname, plan_id });
    return res.json(resp);
  } catch (err) {
    res.send("deu ruim");
    return err;
  }
});

module.exports = router;
