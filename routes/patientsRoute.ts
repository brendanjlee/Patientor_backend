import express from "express";
import patientServices from "../services/patientServices";
import utils from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientServices.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  try {
    const patient = patientServices.getPatient(req.params.id);
    if (!patient) {
      res.status(404).send(`No patient with id ${id}`);
    }
    res.json(patient);
  } catch (err: unknown) {
    res.status(500).send("There was an error fetching data");
  }
});

router.post("/", (req: express.Request, res: express.Response) => {
  try {
    const newPatientEntry = utils.toNewPatient(req.body);

    const addedPatientEntry = patientServices.addPatient(newPatientEntry);
    res.json(addedPatientEntry);
  } catch (err: unknown) {
    let errorMessage = "Something went wrong";
    if (err instanceof Error) {
      errorMessage += "Error: " + err.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (_req, res) => {
  /*
    1. convert req.body to newEntry Object - utils + types
    2. add the newEntry object into data - service
    3. send the newEntry object back
  */
  res.send("Post entry!");
});

export default router;
