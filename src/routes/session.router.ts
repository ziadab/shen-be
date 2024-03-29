import * as sessionValidation from "../validations/session.validation";
import SessionClient from "../clients/sessionClient";
import { Router } from "express";
import { Session } from "../types";
import { isAuth } from "../middleware/isAuth";

const sessionClient = new SessionClient();
const router = Router();

router.delete("/:id", isAuth, async (req, res) => {
  const id = req.params.id;
  await sessionClient.deleteSession(id);
  return res.status(201).send("deleted");
});

router.patch("/:id", isAuth, async (req, res) => {
  const id = req.params.id;
  const sessionData: Session = req.body;

  const sessionExist = await sessionClient.getSessionById(id);
  if (!sessionExist) return res.json({ message: "Session doesn't exist" });

  const { error, value } =
    sessionValidation.updateSession.validate(sessionData);
  if (error) {
    const message = error.details.map((details) => details.message).join(", ");
    return res.status(400).json({ message, code: 400 });
  }
  const data = await sessionClient.updateSession(id, value);
  res.status(200).json(data);
});

export default router;
