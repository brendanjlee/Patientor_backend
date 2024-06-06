/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from "express";
import diaryServices from "../services/diaryServices";
import toNewDiaryEntry from '../utils';

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
    const newDiaryEntry = toNewDiaryEntry(req.body)

    const addedEntry = diaryServices.addDiary(newDiaryEntry)
  }
});

export default router;
