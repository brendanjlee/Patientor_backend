import express from "express";
import diaryServices from "../services/diaryServices";
import utils from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(diaryServices.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const diary = diaryServices.findById(Number(req.params.id));

  if (diary) {
    res.json(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newDiaryEntry = utils.toNewDiaryEntry(req.body);

    const addedEntry = diaryServices.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
