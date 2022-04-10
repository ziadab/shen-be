import * as sessionValidation from "../validations/session.validation"
import SessionClient from "../clients/sessionClient"
import { Router } from "express"
import { Session } from "../types"

const sessionClient = new SessionClient()
const router = Router()

router.delete("/:id", async (req, res) => {
  const id = req.params.id
  await sessionClient.deleteSession(id)
  return res.status(201).send("deleted")
})
router.patch("/:id", async (req, res) => {
  const id = req.params.id
  const sessionData: Session = req.body

  const { error, value } = sessionValidation.updateSession.validate(sessionData)
  if (error) {
    const message = error.details.map((details) => details.message).join(", ")
    return res.status(400).json({ message, code: 400 })
  }
  await sessionClient.updateSession(id, value)
  const data = await sessionClient.getSessionById(id)
  res.status(200).json(data)
})

export default router
