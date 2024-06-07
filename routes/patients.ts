import express from "express";
import patientServices from "../services/patientServices";
import utils from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientServices.getNonSensitivePatients());
});

router.post("/", (req: express.Request, res: express.Response) => {
  try {
    const newPatientEntry = utils.toNewPatientEntry(req.body);

    const addedPatientEntry = patientServices.addPatientEntry(newPatientEntry);
    res.json(addedPatientEntry);
  } catch (err: unknown) {
    let errorMessage = "Something went wrong";
    if (err instanceof Error) {
      errorMessage += "Error: " + err.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
