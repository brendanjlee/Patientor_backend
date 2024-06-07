import express from "express";
import patientServices from "../services/patientServices";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientServices.getNonSensitivePatients());
});

router.post("/:patient", (_req, res) => {
  res.send("add a patient");
});

export default router;
