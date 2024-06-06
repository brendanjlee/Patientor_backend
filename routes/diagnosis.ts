import express from "express";
import diagosesServices from "../services/diagosesServices";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(diagosesServices.getAllDiagnosis());
});

export default router;
